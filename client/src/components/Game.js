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
	const [gameOver, overGame] = useState(false)
	const [score, updateScore] = useState(0)
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

	const canFit = (tetri) => {
		const map = board.tab
		let res = true

		tetri.form.map((line, y)=>{
			line.map((col, x)=>{
				if (col > 0 && ((!map[tetri.y + y] || (map[tetri.y + y][tetri.x + x] > 0) ||
					tetri.x + x > 9 + tetri.rightSpace ||
					 tetri.x + x < 0 - tetri.leftSpace ||
					 typeof map[tetri.y + y][tetri.x + x] === 'undefined'))){
					res = false
				}
			})
		})
		return res
	}

	const initialTetriState = () => {
		const name = pieces.pieces[counter]
		const tetri = {
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
			color: tab[name].color,
		}
		if (canFit(tetri)) return(tetri)
		else return false
	}

	const [curTetri, moveTetri] = useState(initialTetriState())
	const [nextTetri, next] = useState(tab[pieces.pieces[counter + 1]])

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
			addScore('hard drop', 20 - curTetri.y - curTetri.maxHeight)
			clearInterval(refInterval.current)
			refInterval.current = setGameLoop(15)
		}
		if (event.keyCode === 38) {//HAUT (rotation)
			moveTetri((tetri)=>{
				const rot = tetri.rot > 2 ? 0 : tetri.rot + 1
				const tetriRot = {//tetri potentiel apres rotation demandée
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
			addScore('soft drop', 1)
			moveTetri((tetri)=>{
					if (canFit({...tetri, y: tetri.y + 1})) return {...tetri, y: tetri.y + 1}
					else return tetri
				})
			// clearInterval(refInterval.current)
			// refInterval.current = setGameLoop(50)
		}
	}

	const setGameLoop = (speed) => {
		return setInterval(() => {
			moveTetri((tetri)=>{
				if (!canFit({...tetri, y: tetri.y + 1})){
					clearInterval(refInterval.current)
					updateBoard((old)=>{
						tetri.form.map((line, y)=>{
							line.map((col, x)=>{
								if (tetri.form[y][x] > 0){
									old.tab[tetri.y + y][tetri.x + x] = tetri.form[y][x]
								}
							})
						})
						return old
					})
					increment((i)=>{
						next(tab[pieces.pieces[counter + 1]])
						return i+1
					})
					const t = initialTetriState()
					if (t === false || !canFit(t)){
						overGame(true)
						return tetri
					} else return initialTetriState()
				}
				else return {...tetri, y: tetri.y + 1}
			})
		}, speed)
	}

	useEffect(() => {
		refInterval.current = setGameLoop(500)
			if (gameOver) clearInterval(refInterval.current)
			return () => {
				clearInterval(refInterval.current)
			}
		}, [counter, gameOver])

	useEffect(() => {
		document.addEventListener("keydown", keydownFunc)
		if (gameOver) document.removeEventListener("keydown", keydownFunc)
		return () => {
			document.removeEventListener("keydown", keydownFunc)
		}
	}, [counter, gameOver])

	const colorTab = ([
		'red',
		'blue',
		'yellow',
		'purple',
		'salmon',
		'cyan',
		'green'
	])

	const removeLine = (num, tab) => {
		let newTab = tab
		num.map((n)=>{
			newTab.splice(n, 1) 
			newTab.splice(0, 0, [0,0,0,0,0,0,0,0,0,0])
			return num
		})
		updateBoard({tetriList: board.tetriList, tab:newTab})
	}

	const addScore = (type, nb) => {
		let points = 0
		const lineMarks = [40,100,300,1200]
		switch (type) {
			case 'row':
				points = lineMarks[nb + 1]
			case 'hard drop':
				points = nb + 1
			case 'soft drop':
				points = nb
			default:
				break
		}
		updateScore((oldScore)=>oldScore + points)
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
		if (lines.length){
			removeLine(lines, tab)
			addScore('row', lines.length)
		}
	}

	useEffect(() => {
			checkLine()
	})

	const refInterval = useRef(false)
	const tetri = curTetri.form

	return (
		gameOver
		? <div className='flex column center alignCenter' style={{height: '100vh'}}>
				<div className='flex column center alignCenter' style={{height: '500px', width: '500px', backgroundColor: 'pink'}}>
					<div style={{fontSize: '60px', fontWeight: 'bold', color: 'salmon'}}>Sorry, you lose</div>
					<div style={{fontSize: '60px', fontWeight: 'bold', color: 'lightblue'}}>:(</div>
					<div style={{fontSize: '50px', fontWeight: 'bold', color: 'white'}}>SCORE: {score}</div>
				</div>
		</div>
		: <div className='flex'>
				<div className={'absolute'} style={{height: '500px', left: '100px'}}>
					<div style={{fontSize: '40px', fontWeight: 'bold', color: 'pink', marginTop: '20px'}}>SCORE: {score}</div>
				</div>
				<div className={'absolute'} style={{top: '100px', left: '100px'}}>
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
							style={{
								top: `${blockSize * curTetri.y + curTetri.y * 2}px`,
								left: `${blockSize * curTetri.x + curTetri.x * 2}px`
							}}
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
				</div>
				<div className={'absolute flex center alignCenter column'} style={{backgroundColor: 'lightblue', left: '600px', top: '100px'}}>
					<div style={{fontSize: '40px', fontWeight: 'bold', color: 'navy', marginTop: '20px'}}>Next:</div>
					<div className={'relative'} style={{top: '10px', padding: '10px'}}>
						{
							nextTetri.position[0].form.map((line, index)=>{
								return <div style={{display: 'flex'}} key={index}>
									{
										line.map((col, index) => {
											return <div key={index}>
												{col > 0
													? <Block color={nextTetri.color}/>
													: <Block transparent/>
												}
											</div>
										})
									}
								</div>
							})
						}
					</div>
				</div>
		</div>
	)
}