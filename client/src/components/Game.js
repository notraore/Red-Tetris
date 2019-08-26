import React, { useState, useEffect, useRef } from 'react'
import pieces from './pieces.json'
import tab from './pieces.1.json'

const blockSize = 40

const blockStyle = ({
	backgroundColor: 'pink',
	width: `${blockSize}px`,
	height: `${blockSize}px`,
	border: '1px solid pink'
})

const Block = ({empty, color, transparent})=>{
	return (
		<div
			style={!!empty
				? {...blockStyle}
				: transparent
					? {...blockStyle, border: '1px solid transparent', backgroundColor: 'transparent'}
					: {...blockStyle, border: '1px solid white', backgroundColor: `${color}`}
			}
		/>
	)
}


export const Game = () => {
	const [counter, increment] = useState(0)

	const canFit = (tetri) => {
		const map = board.tab
		let res = true

		tetri.form.map((line, y)=>{
			line.map((col, x)=>{
				if (col > 0 && map[tetri.y + y][tetri.x + x] > 0 ||
					tetri.x + x > 9 + tetri.rightSpace ||
					 tetri.x + x < 0 - tetri.leftSpace){
					res = false
				}
			})
		})
		return res
	}

	const initialTetriState = () => {
		const name = pieces.pieces[counter]
		return({
			maxWidth: tab[name].position[0].maxWidth,
			maxHeight: tab[name].position[0].maxHeight,
			h: tab[name].position[0].height,
			type: tab[name].type,
			name: name,
			width: tab[name].position[0].width,
			x: 3,
			y: 0,
			leftSpace: tab[name].position[0].leftSpace,
			rightSpace: tab[name].position[0].rightSpace,
			downSpace: tab[name].position[0].downSpace,
			rot: 0,
			form: tab[name].position[0].form,
			color: tab[name].color
	})}

	const [curTetri, moveTetri] = useState(initialTetriState())

	const keydownFunc = event => {//DROITE
		if (event.keyCode === 39) {
				moveTetri((tetri)=>{
					if (canFit({...tetri, x: tetri.x + 1})) return {...tetri, x: tetri.x + 1}
					else return tetri
				})
		}
		if (event.keyCode === 37) {//GAUCHE
			moveTetri((tetri)=>{
				if (canFit({...tetri, x: tetri.x - 1})) return {...tetri, x: tetri.x - 1}
				else return tetri
			})
		}
		if (event.keyCode === 32) {//ESPACE
			clearInterval(refInterval.current)
			refInterval.current = setInterval(() => {
				moveTetri((tetri)=>{
					return {...tetri, y: tetri.y + 1}
				})
			}, 15)
		}
		if (event.keyCode === 38) {//HAUT (rotation)
			moveTetri((tetri)=>{
				const rot = tetri.rot > 2 ? 0 : tetri.rot + 1
				const tetriRot = {
					...tetri,
					form: tab[tetri.name].position[rot].form,
					rot: rot,
					h: tab[tetri.name].position[rot].height,
					leftSpace: tab[tetri.name].position[rot].leftSpace,
					rightSpace: tab[tetri.name].position[rot].rightSpace,
					downSpace: tab[tetri.name].position[rot].downSpace,
					maxHeight: tab[tetri.name].position[rot].maxHeight,
					maxWidth: tab[tetri.name].position[rot].maxWidth,
					width: tab[tetri.name].position[rot].width,
					height: tab[tetri.name].position[rot].height,
				}
				if (canFit(tetriRot)){//si ya la place de faire une rotation
					return tetriRot
				} else return tetri
			})
		}
		if (event.keyCode === 40) {//BAS
			clearInterval(refInterval.current)
			refInterval.current = setInterval(() => {
				moveTetri((tetri)=>{
					return {...tetri, y: tetri.y + 1}
				})
			}, 50)
		}
	}
	const keyupFunc = event => {
			if (event.keyCode === 40) {//BAS
				clearInterval(refInterval.current)
				refInterval.current = setInterval(() => {
					moveTetri((tetri)=>{
						return {...tetri, y: tetri.y + 1}
					})
				}, 500)
		}
	}

	useEffect(() => {
		refInterval.current = setInterval(() => {
			moveTetri((tetri)=>{
				return {...tetri, y: tetri.y + 1}
			})
		}, 500)

			return () => {
				clearInterval(refInterval.current)
			}
		}, [counter])

	useEffect(() => {
		document.addEventListener("keydown", keydownFunc)
		document.addEventListener("keyup", keyupFunc)
	}, [])

	const colorTab = ([
		'red',
		'blue',
		'yellow',
		'purple',
		'salmon',
		'cyan',
		'green'
	])

	const checkColision = (tetri)=>{
		if (tetri.y + tetri.maxHeight > 19 || (!!board.tab[tetri.y + tetri.maxHeight] &&
			 ((board.tab[tetri.y + tetri.h[0]][tetri.x] > 0 && tetri.leftSpace === 0)||
			 (board.tab[tetri.y + tetri.h[1]][tetri.x + 1] > 0 && tetri.h[1] > 0) ||
			 (board.tab[tetri.y + tetri.h[2]][tetri.x + 2] > 0 && tetri.h[2] > 0)||
			 (board.tab[tetri.y + tetri.h[3]][tetri.x + 3] > 0 && tetri.rightSpace === 0)))){
			return true
		}
		return false
	}

	const removeLine = (num, tab) => {
		let newTab = tab
		num.map((n)=>{
			newTab.splice(n, 1) 
			newTab.splice(0, 0, [0,0,0,0,0,0,0,0,0,0])
			return num
		})
		updateBoard({tetriList: board.tetriList, tab:newTab})
	}

	const checkLine = () => {
		let tab = board.tab
		let lines = []
		tab.map((line, y)=>{
			if (line.every((num)=>{return num > 0})){
				lines.push(y)
			}
			return tab
		})
		if (lines.length) removeLine(lines, tab)
	}

	useEffect(() => {
			checkLine()
			if (checkColision(curTetri)){
				clearInterval(refInterval.current)
					updateBoard((old)=>{
						curTetri.form.map((line, y)=>{
							line.map((col, x)=>{
								if (curTetri.form[y][x] > 0){
									old.tab[curTetri.y + y][curTetri.x + x] = curTetri.form[y][x]
								}
							})
						})
						return old
					})
	
					board.tetriList.length >= 1
						? board.tetriList.concat(curTetri)
						: board.tetriList.push(curTetri)
					
					if (canFit(curTetri)){
						increment((i)=>i+1)
						moveTetri(initialTetriState())
					} else {
						document.removeEventListener('keydown', keydownFunc)
					}
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
											? <Block color={colorTab[col - 1]}/>
											: <Block empty/>
										}
									</div>
								})
							}
						</div>
					})
				}
				{
					<div
						className={`absolute`}
						style={{top: `${blockSize * curTetri.y + curTetri.y * 2}px`, left: `${blockSize * curTetri.x + curTetri.x * 2}px`}}
					>
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
				{
					<p>{`x: ${curTetri.x} y: ${curTetri.y} height: ${curTetri.h}`}</p>
				}
			</div>
		</div>
	)
}