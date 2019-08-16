import React, { useState, useReducer, useEffect, useRef } from 'react'
import pieces from './pieces.json'
import {tetriReducer, initialTetriState} from '../reducers/tetriReducer'

const blockSize = 40

const blockStyle = ({
	backgroundColor: 'lightgrey',
	width: `${blockSize}px`,
	height: `${blockSize}px`,
	border: '1px solid grey'
})

const Block = ({empty, color, transparent})=>{
	return (
		<div
			style={
				!!empty
					? {...blockStyle}
					: transparent
						? {...blockStyle, border: '1px solid transparent', backgroundColor: 'transparent'}
						: {...blockStyle, border: '1px solid black', backgroundColor: `${color}`}}
		/>
	)
}


export const Game = () => {

	const [curTetri, moveTetri] = useReducer(tetriReducer, initialTetriState)

	useEffect((props) => {
		moveTetri({type: 'SET_TETRI', payload: curTetri.name})

		refInterval.current = setInterval(() => {
				moveTetri({type: 'DOWN'})
			}, 200)

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
		}, [curTetri.name]
	)

	useEffect(() => {
		//checker ici si ya colision au prochain move
		if (curTetri.y > 15 + curTetri.downSpace){
			clearInterval(refInterval.current)
			board.tetriList.length >= 1 ? board.tetriList.concat(curTetri) : board.tetriList.push(curTetri)
			moveTetri({type: 'SET_TETRI', payload: pieces.pieces[curTetri.listIndex]})
		}
	})

	const [board, updateBoard] = useState({
		tab: [
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
		],
		tetriList: []
	})

	// const draw = (board, t) => {
	// 	let tab = t.form
	// 	tab.map((line, y)=>{
	// 		line.map((col, x)=>{
	// 			if (col === 1 && board[y + t.y]){
	// 				// board[y + t.y][x + t.x] = 1
	// 			}
	// 		})
	// 	})
	// }

	// draw(board.tab, curTetri)
	const refInterval = useRef(false)
	const tetri = curTetri.form
	return (
		<div className='flex center'>
			<div className={'absolute'}>
				{
					board.tab.map((line, index)=>{
						return <div style={{display: 'flex'}} key={index}>
							{
								line.map((col, index) => {
									return <div key={index}>
										{col > 0
											? <Block color={curTetri.color}/>
											: <Block empty/>
										}
									</div>
								})
							}
						</div>
					})
				}
				{
					<div className={`absolute`} style={{top: `${blockSize * curTetri.y + curTetri.y * 2}px`, left: `${blockSize * curTetri.x + curTetri.x * 2}px`}}>
					{
						tetri.map((line, index)=>{
						return <div style={{display: 'flex'}} key={index}>
							{
								line.map((col, index) => {
									return <div key={index}>
										{col > 0
											? <Block color={curTetri.color}/>
											: <Block transparent/>
										}
									</div>
								})
							}
						</div>
					})}
					</div>
				}
			</div>
		</div>
	)
}