import React, { useState, useReducer, useEffect, useRef } from 'react'
import pieces from './pieces.json'

export const Game = () => {

	let board = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	]

	const blockStyle = ({
		// backgroundColor: 'blue',
		width: '40px',
		height: '40px',
		border: '1px solid grey'
	})

	const Block = ({empty})=>{
		return (
			<div
				style={!!empty ? {...blockStyle} : {...blockStyle, border: '1px solid black', backgroundColor: 'blue'}}
			/>
		)
	}

	const setPiece = (board, t) => {
		let tab = t.form
		tab.map((line, y)=>{
			line.map((col, x)=>{
				if (col === 1 && board[y + t.y]){
					board[y + t.y][x + t.x] = 1
				}
			})
		})
	}

	const initialTetriState = {
		name: 'I',
		x: 3,
		y: 0,
		spaceLeft: 3,
		spaceRight: 3,
		downSpace: 0,
		rot: 0,
		form: pieces['I'][0]
	}


	//si autre rotation, spaceright spaceleft et downspace peuvent changer + ou - 1 ou 2 blocs

	const tetriReducer = (state = initialTetriState, action, payload) => {
		switch (action.type) {
			case 'DOWN':
				return {
					...state,
					y: state.y + 1
				}
			case 'LEFT':
				return {
					...state,
					x: state.spaceLeft > 0 ? state.x -= 1 : state.x,
					spaceLeft: state.spaceLeft > 0 ? state.spaceLeft - 1 : state.spaceLeft,
					spaceRight: state.spaceLeft > 0 ? state.spaceRight + 1 : state.spaceRight
				}
			case 'RIGHT':
				return {
					...state,
					x: state.spaceRight > 0 ? state.x += 1 : state.x,
					spaceLeft: state.spaceRight > 0 ? state.spaceLeft + 1 : state.spaceLeft,
					spaceRight: state.spaceRight > 0 ? state.spaceRight - 1 : state.spaceRight
				}
			case 'ROTATION':
				return {
					...state,
					rot: state.rot > 2 ? 0 : state.rot + 1,
					form: pieces[state.name][state.rot]
					// form: pieces[state.name][state.rot > 3 ? 0 : state.rot + 1]
				}
			default:
				return state
		}
	}

	const [curTetri, moveTetri] = useReducer(tetriReducer, initialTetriState)

	setPiece(board, curTetri)
	
	const refInterval = useRef(false)
	
	useEffect(() => {

		refInterval.current = setInterval(() => {
				moveTetri({type: 'DOWN'})
			}, 500)

		document.addEventListener("keydown", event => {
			if (event.keyCode === 37) {
				moveTetri({type: 'LEFT'})
			}
			if (event.keyCode === 39) {
				moveTetri({type: 'RIGHT'})
			}
			if (event.keyCode === 38) {
				moveTetri({type: 'ROTATION'})
			}
		})

			return () => {
				clearInterval(refInterval.current)
			}
		}, []
	)

	useEffect(() => {
		//checker ici si ya collision au prochain move
		if (curTetri.y > 17 + curTetri.downSpace){
			clearInterval(refInterval.current)
		}
	})

	return (
		<div className='flex center'>
			<div className={''}>
				{
					board.map((line, index)=>{
						return <div style={{display: 'flex'}} key={index}>
							{
								line.map((col, index) => {
									return <div key={index}>
										{col > 0
											? <Block/>
											: <Block empty/>
										}
									</div>
								})
							}
						</div>
					})
				}
			</div>
		</div>
	)
}