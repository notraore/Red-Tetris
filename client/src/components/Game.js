import React, { useState, useEffect, useRef } from 'react'
import pieces from './pieces.json'
import tab from './pieces.1.json'
import { withStyles }  from '@material-ui/styles'
import {GameStyle} from '../styles/Game-style.js'

const blockSize = 40

const blockStyle = ({
	backgroundColor: 'pink',
	width: `${blockSize}px`,
	height: `${blockSize}px`,
	border: '0.5px solid #3331'
})

const initialBoardState = () => ({
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

const Block = ({empty, color, transparent})=>{
	return (
		<div
			style={!!empty
				? {...blockStyle}
				: transparent
					? {...blockStyle, border: '0.5px solid transparent', backgroundColor: 'transparent'}
					: {...blockStyle, border: '0.5px solid white', backgroundColor: `${color}`}
			}
		/>
	)
}

const Game = (props) => {
	const initialTetriState = (count) => {
		const name = pieces.pieces[count]
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

	const {classes} = props
	const [counter, increment] = useState(0)
	const [gameOver, overGame] = useState(false)
	const [board, updateBoard] = useState(initialBoardState())
	const [curTetri, moveTetri] = useState(initialTetriState(0))
	const [score, updateScore] = useState(0)
	const [canMove, setCanMove] = useState(true)
	const [nextTetri, next] = useState(tab[pieces.pieces[1]])
	const [rows, setRows] = useState(0);
	const [level, setLevel] = useState(0);
	const [dropTime, setDropTime] = useState(1000);
	const refInterval = useRef(false)
	let keyDown

	useEffect(() => {
		if (JSON.stringify(board) === JSON.stringify(initialBoardState()) && counter > 0){
			increment(0)
			updateScore(0)
			setLevel(0)
			setRows(0)
			setDropTime(1000)
			const t = initialTetriState(0)
			moveTetri(initialTetriState(0))
			next(tab[pieces.pieces[1]])
			overGame(false)
		}
	}, [board, counter])

	const resetGame = () => {
		updateBoard(initialBoardState())
	}

	const keydownFunc = event => {//DROITE
		if (keyDown && (keyDown.keyCode == 38 || keyDown.keyCode == 32 || keyDown.keyCode == 40)) return
		keyDown = event
		if (event.keyCode === 39 && canMove) {
				moveTetri((tetri)=>{
					if (canFit({...tetri, x: tetri.x + 1})) return {...tetri, x: tetri.x + 1}
					else return tetri
				})
		}
		if (event.keyCode === 37 && canMove) {//GAUCHE
			moveTetri((tetri)=>{
				if (canFit({...tetri, x: tetri.x - 1})) return {...tetri, x: tetri.x - 1}
				else return tetri
			})
		}
		if (event.keyCode === 32 && canMove) {//ESPACE
			setCanMove(false)
			clearInterval(refInterval.current)
			refInterval.current = setGameLoop(15)
		}
		if (event.keyCode === 38 && canMove) {//HAUT (rotation)
			moveTetri(tetri => {
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
			clearInterval(refInterval.current)
			refInterval.current = setGameLoop(30)
		}
	}

	const setGameLoop = (speed) => {
		return setInterval(() => {
			moveTetri((tetri)=>{
				if (!canFit({...tetri, y: tetri.y + 1})){
					setCanMove(true)
					keyDown = null
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
					const t = initialTetriState(counter + 1)
					increment((i)=>{
						next(tab[pieces.pieces[i+2]])
						return i+1
					})
					if (t === false || !canFit(t)){
						overGame(true)
						return tetri
					} else return t
				}
				else return {...tetri, y: tetri.y + 1}
			})
		}, speed)
	}

	useEffect(() => {
		refInterval.current = setGameLoop(dropTime)
			if (gameOver) clearInterval(refInterval.current)
			return () => {
				clearInterval(refInterval.current)
			}
		}, [counter, gameOver, dropTime])

	useEffect(() => {
		document.addEventListener("keydown", keydownFunc)
		document.addEventListener("keyup", event => {
			if (event.keyCode === 40){
				clearInterval(refInterval.current)
				refInterval.current = setGameLoop(dropTime)
			}
			if (keyDown !== 32) keyDown = null
		})
		if (gameOver){
			document.removeEventListener("keydown", keydownFunc)
		}
		return () => {
			document.removeEventListener("keydown", keydownFunc)
	}
	}, [counter, gameOver, canMove, curTetri, score])

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

	const displayUpdate = (rows, len) => {
		const pointTab = [40, 100, 300, 1200];
		updateScore((score) => {return score + (pointTab[len - 1])})
		setRows((rows) =>{
			let total = rows + len
			let calcLvl = Math.trunc(total / 10)
			if (calcLvl > level && calcLvl < 5){
				setLevel(() => {
					setDropTime(200 * (5 - calcLvl))
					return calcLvl
				});
			}
		 return rows + len	
		});
	}

	const checkLine = () => {
		let tab = board.tab
		let lines = []
		tab.map((line, y)=>{
			if (line.every((num) => {return num > 0})){
				lines.push(y)
			}
			return tab
		})
		if (lines.length){
			removeLine(lines, tab)

			displayUpdate(rows, lines.length);
		}
	}

	useEffect(() => {
			checkLine()
	})

	const tetri = curTetri.form

	return (
		gameOver
		? <div className='flex column center alignCenter' style={{height: '100hw'}}>
				<div className={`flex column center alignCenter ${classes.gameOverContainer}`}>
					<div style={{fontSize: '100hv', fontWeight: 'bold', color: 'salmon'}}>Sorry, you lose</div>
					<div style={{fontSize: '200hw', fontWeight: 'bold', color: 'white'}}>SCORE: {score}</div>
					<div style={{fontSize: '200hw', fontWeight: 'bold', color: 'white'}}>Level: {level}</div>
					<div className={`flex column center alignCenter ${classes.restartButton}`}>
						<div className={classes.restartLabel} onClick={()=>{resetGame()}}>
							RESTART
						</div>
					</div>
				</div>
		</div>
		: <div className='flex'>
				<div className={'absolute'} style={{height: '500px', left: '100px'}}>
					<aside>
						<div className={classes.scoreLabel}>SCORE: {score}</div>
						<div className={classes.scoreLabel}>LEVEL: {level}</div>
						<div className={classes.scoreLabel}>ROWS: {rows}</div>
						<div className={classes.scoreLabel}>DropTime: {dropTime}</div>
					</aside>
				</div>
				<div className={'absolute'} style={{top: '270px', left: '100px'}}>
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
								top: `${blockSize * curTetri.y + curTetri.y}px`,
								left: `${blockSize * curTetri.x + curTetri.x}px`
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

export default withStyles(GameStyle)(Game)