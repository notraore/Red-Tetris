import React, { useState, useEffect, useRef, useCallback } from 'react'
import tab from './pieces.1.json'
import { withStyles }  from '@material-ui/styles'
import {GameStyle} from '../styles/Game-style.js'
import {blockSize, Block, colorTab} from './Block.js'
import {canFit} from './canFit.js'
import {initialBoardState, initialTetriState} from './initialState.js'
import InGameInfos from '../styles/GameInfos.js'
import GameOverInfos from '../styles/GameOverInfos.js'
import { historyPush } from '../history.js';
import { socket } from '../sockets';
import { styles } from '../styles/Menu-styles.js'

import { isEmpty } from 'lodash'
//import leader from '../datas/leaderboard.json';



const Game = (props) => {

	// setData(RandomTetri());
	const {classes} = props
	const [data, setData] = useState([]);
	const [counter, increment] = useState(0)
	const [gameOver, overGame] = useState(false)
	const [board, updateBoard] = useState(initialBoardState())
	const [curTetri, moveTetri] = useState(initialTetriState(0, data));
	const [score, updateScore] = useState(0)
	const [canMove, setCanMove] = useState(true)
	const [nextTetri, setNext] = useState(tab["J"]);

	const [rows, setRows] = useState(0);
	const [level, setLevel] = useState(0);
	const [dropTime, setDropTime] = useState(1000);
	const refInterval = useRef(false)
	const keyDown = useRef(false)

	const RandomTetri = () => {
		socket.emit("RandomTetri");
		socket.on("sendRandTetris", (ret) => {
			setData(ret);
		})
	}

	useEffect(() =>{
		RandomTetri();
		// var leaderTmp = JSON.parse(leader);
		// console.log("var", leaderTmp)
	}, []);

	useEffect(() =>{
		if (!isEmpty(data))
			setNext(tab[data[1]]);
		console.log(data);
	}, [data]);

	useEffect(() => {
		if (JSON.stringify(board) === JSON.stringify(initialBoardState()) && counter > 0){

			increment(0)
			updateScore(0)
			setLevel(0)
			setRows(0)
			setDropTime(1000);
			RandomTetri();
			moveTetri(initialTetriState(0), data);
			setNext(tab[data[1]]);
			overGame(false)
		}
	}, [board, counter, data, nextTetri])

	const resetGame = () => {
		updateBoard(initialBoardState())
	}

	const setGameLoop = useCallback((speed) => {
		return setInterval(() => {
			moveTetri((tetri)=>{
				console.log(tetri);
				if (!canFit(board.tab, {...tetri, y: tetri.y + 1})){
					setCanMove(true)
					keyDown.current = null
					clearInterval(refInterval.current)
					updateBoard((old)=>{
						tetri.form.forEach((line, y)=>{
							line.forEach((col, x)=>{
								if (tetri.form[y][x] > 0){
									old.tab[tetri.y + y][tetri.x + x] = tetri.form[y][x]
								}
							})
						})
						return old
					})
					const t = initialTetriState(counter + 1, data);
					increment((i)=>{
						console.log("tab ", tab[data[i+2]]);
						setNext(tab[data[i+2]])
						return i+1
					})
					if (t === false || !canFit(board.tab, t)){
						overGame(true)
						return tetri
					} else return t
				}
				else return {...tetri, y: tetri.y + 1}
			})
		}, speed)
	}, [board.tab, counter, data])

	const keydownFunc = useCallback(event => {//DROITE
		if ((keyDown.current && (keyDown.current.keyCode === 38 || keyDown.current.keyCode === 32 || keyDown.current.keyCode === 40)) || !canMove) return
		keyDown.current = event
		if (event.keyCode === 39) {
				moveTetri((tetri)=>{
					if (canFit(board.tab, {...tetri, x: tetri.x + 1})) return {...tetri, x: tetri.x + 1}
					else return tetri
				})
		}
		if (event.keyCode === 37) {//GAUCHE
			moveTetri((tetri)=>{
				if (canFit(board.tab, {...tetri, x: tetri.x - 1})) return {...tetri, x: tetri.x - 1}
				else return tetri
			})
		}
		if (event.keyCode === 40) {//BAS
			clearInterval(refInterval.current)
			refInterval.current = setGameLoop(30)
		}
		if (event.keyCode === 32) {//ESPACE
			setCanMove(false)
			clearInterval(refInterval.current)
			refInterval.current = setGameLoop(15)
		}
		if (event.keyCode === 38) {//HAUT (rotation)
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
				if (canFit(board.tab, tetriRot)){//si ya la place de faire une rotation
					return tetriRot
				} else return tetri
			})
		}
	}, [board.tab, canMove, setGameLoop])

	useEffect(() => {
		refInterval.current = setGameLoop(dropTime)
			if (gameOver) clearInterval(refInterval.current)
			return () => {
				clearInterval(refInterval.current)
			}
		}, [counter, gameOver, dropTime, setGameLoop])

	useEffect(() => {
		document.addEventListener("keydown", keydownFunc)
		document.addEventListener("keyup", event => {
			if (event.keyCode === 40 && canMove){
				clearInterval(refInterval.current)
				refInterval.current = setGameLoop(dropTime)
			}
			if (keyDown.current !== 32) keyDown.current = null
		})
		if (gameOver){
			document.removeEventListener("keydown", keydownFunc)
		}
		return () => {
			document.removeEventListener("keydown", keydownFunc)
	}
	}, [counter, gameOver, canMove, curTetri, score, dropTime, keydownFunc, setGameLoop])

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
		<div className="App" style={styles.container}>
			<div className='navigationBar fullWidth flex center alignCenter' style={{height: '30px', backgroundColor: 'red'}}>
				<p onClick={()=>{historyPush('/')}}>RETURN MENU</p>
			</div>
			{gameOver
				? <div className='flex column center alignCenter' style={{height: '100hw'}}>
						<div className={`flex column center alignCenter ${classes.gameOverContainer}`}>
							<GameOverInfos text={`Sorry, you lose`} size={'1.0rem'}/>
							<GameOverInfos text={`Level: ${level}`} size={'1.3rem'}/>
							<GameOverInfos text={`Score: ${score}`} size={'1.3rem'}/>
							<GameOverInfos text={`Rows: ${rows}`} size={'1.3rem'}/>
							<div className={`flex column center alignCenter ${classes.restartButton}`}>
								<div className={classes.restartLabel} onClick={()=>{resetGame()}}>
									RESTART
								</div>
							</div>
						</div>
				</div>
					
				: <div className='flex'>
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
						<div className={'absolute flex center alignCenter column'} style={{left: '600px', top: '100px'}}>
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
							<div className={'relative'} style={{}}>
							<InGameInfos text={`Score: ${score}`}/>
							<InGameInfos text={`Level: ${level}`}/>
							<InGameInfos text={`Rows: ${rows}`}/>
							<InGameInfos text={`Speed: x${1000 - dropTime}`}/>
						</div>
						</div>
				</div>}
		</div>
	)
}

export default withStyles(GameStyle)(Game)