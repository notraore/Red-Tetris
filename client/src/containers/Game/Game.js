import React, { useState, useEffect, useRef, useCallback } from 'react'
import tab from '../../components/pieces.1.json'
import { withStyles }  from '@material-ui/styles'
import {GameStyle} from '../../styles/Game-style.js'
import {canFit} from '../../components/canFit.js'
import {initialBoardState, initialTetriState} from '../../components/initialState.js'
import FinishComponent from './FinishPage.js'
import InGameComponent from './InGamePage.js'
import { socket } from '../../sockets';
import { styles } from '../../styles/Menu-styles.js'
import { leaveRoom } from '../../sockets/emits.js'
import { checkLine, gameLoop, reset } from './checkFunctions.js'
import { checkPlayerInputs } from './playerInputs'
import { isEmpty } from 'lodash'
//import leader from '../datas/leaderboard.json';

const Game = ({classes, gameState, dispatch, solo}) => {

	const [data, setData] = useState([]);
	const [counter, increment] = useState(0)
	const [gameOver, overGame] = useState(false)
	const [board, updateBoard] = useState(initialBoardState())
	const [curTetri, moveTetri] = useState(initialTetriState(0, data));
	const [score, updateScore] = useState(0)
	const [canMove, setCanMove] = useState(true)
	const [screenY, setScreenY] = useState(0)
	const [screenX, setScreenX] = useState(0)
	const [nextTetri, setNext] = useState(null);

	const [rows, setRows] = useState(0)
	const [level, setLevel] = useState(0)
	const [dropTime, setDropTime] = useState(1000)
	const refInterval = useRef(false)
	const keyDown = useRef(false)

	useEffect(() =>{
		socket.emit("RandomTetri")
	}, [gameOver])

	useEffect(() =>{
		console.log("dans GAME: gamestate:", gameState)
		socket.on("sendRandTetris", (ret) => {
			setData(ret);
		})
		if (!solo) socket.on('receive player shadow', dispatch)
		return () => socket.off('sendRandTetris')
	}, []);

	useEffect(() =>{
		if (!isEmpty(data))
			setNext(tab[data[1]])
	}, [data])

	useEffect(() =>{
		console.log('EMIT BOARD STATE')
		if (!solo) socket.emit('emit board state', board.tab, gameState.room)
	}, [counter])

	useEffect(() => {
		if (JSON.stringify(board) === JSON.stringify(initialBoardState()) &&
		 counter > 0){
			reset(increment, updateScore, setLevel, setRows, setDropTime,
				moveTetri, initialTetriState, data, tab, overGame, setNext)
		}
	}, [board, counter, data, nextTetri])

	const resetGame = () => {
		updateBoard(initialBoardState())
	}

	const setGameLoop = useCallback((speed) => {
		return setInterval(() => {
			gameLoop(moveTetri, canFit, setCanMove, keyDown,
				clearInterval, updateBoard, initialTetriState, increment,
				 setNext, overGame, board, refInterval, counter, data, tab)
		}, speed)
	}, [board.tab, counter, data])

	const keydownFunc = useCallback(event => {
		var key = keyDown.current ? keyDown.current.keyCode : key
		if ((key && (key === 38 || key === 32 || key === 40)) || !canMove) return
		keyDown.current = event
		checkPlayerInputs(canFit, board, setCanMove, refInterval,
			 tab, moveTetri, setGameLoop, event)
	}, [board.tab, canMove, setGameLoop])

	const keyUpFunc = event => {
		if (event.keyCode === 40 && canMove){
			clearInterval(refInterval.current)
			refInterval.current = setGameLoop(dropTime)
		}
		if (keyDown.current !== 32) keyDown.current = null
	}

	const removeListener = () => {
		document.removeEventListener("keydown", keydownFunc)
		document.removeEventListener("keyup", keyUpFunc)
	}

	useEffect(() => {
		refInterval.current = setGameLoop(dropTime)
			if (gameOver) clearInterval(refInterval.current)
			return () => {
				clearInterval(refInterval.current)
			}
		}, [counter, gameOver, dropTime, setGameLoop])

	useEffect(() => {
		document.addEventListener("keydown", keydownFunc)
		document.addEventListener("keyup", keyUpFunc)
		if (gameOver) removeListener()
		return () => removeListener()
	}, [counter, gameOver, canMove, curTetri, score,
		 dropTime, keydownFunc, setGameLoop])

	const displayUpdate = (rows, len) => {
		const pointTab = [40, 100, 300, 1200]
		updateScore((score) => {return score + (pointTab[len - 1])})
		setRows((rows) =>{
			let total = rows + len
			let calcLvl = Math.trunc(total / 10)
			if (calcLvl > level && calcLvl < 5){
				setLevel(() => {
					setDropTime(200 * (5 - calcLvl))
					return calcLvl
				})
			}
		 return rows + len	
		});
	}

	useEffect(() => {
			checkLine(board, displayUpdate, rows, updateBoard)
	})


	useEffect(() => {
		console.log(window.innerHeight)
		setScreenY(window.innerHeight)
		setScreenX(window.innerWidth)
	}, [window.innerHeight, window.innerWidth])

	const tetri = curTetri.form

	return (
		<div className="App fullHeight fullWidth flex center alignCenter" style={styles.container}>
			{/* <div
				className='navigationBar fullWidth flex center alignCenter'
				style={{height: '30px', backgroundColor: 'red'}}
			>
				<p style={{zIndex: 10}} onClick={()=>{dispatch({type: 'END_GAME'});leaveRoom()}}>
					RETURN MENU
				</p>
			</div> */}
			{/* <div className=' fullHeight fullWidth'> */}
				{gameOver
					? <FinishComponent
						level={level}
						score={score}
						rows={rows}
						resetGame={resetGame}
					/>
					: <InGameComponent
						winHeight={screenY}
						winWidth={screenX}
						level={level}
						score={score}
						rows={rows}
						board={board}
						gameState={gameState}
						nextTetri={nextTetri}
						curTetri={curTetri}
						tetri={tetri}
						dropTime={dropTime} 
					/>
				}
			{/* </div>/ */}
		</div>
	)
}

export default withStyles(GameStyle)(Game)