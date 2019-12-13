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
import { checkLine, gameLoop, reset } from './checkFunctions.js'
import { checkPlayerInputs } from './playerInputs'

export const Game = ({classes, gameState, dispatch, solo, startGame, notify, curUser, chat, chatInput, setChatInput}) => {
	const [counter, increment] = useState(0)
	const [gameOver, overGame] = useState(false)
	const [board, updateBoard] = useState(initialBoardState())
	const [curTetri, moveTetri] = useState(initialTetriState(0, gameState.pieces));
	const [score, updateScore] = useState(0)
	const [canMove, setCanMove] = useState(true)
	const [screenY, setScreenY] = useState(0)
	const [screenX, setScreenX] = useState(0)
	const [canAddLine, setLineAdd] = useState(true)
	const [tmpLineDel, setTmpLineDel] = useState(0)
	const [nextTetri, setNext] = useState(null);
	const [rows, setRows] = useState(0)
	const [level, setLevel] = useState(0)
	const [dropTime, setDropTime] = useState(1000)
	const refInterval = useRef(false)
	const keyDown = useRef(false)

	useEffect(() =>{
		if (gameState.pieces && gameState.pieces[1]) setNext(tab[gameState.pieces[1]])
		socket.on("player win", (action) => {
			notify.success(`${ action.winScore.id === socket.id
				? "You"
				: action.winScore.winner
			} win !`)
			dispatch(action)
		})
		if (!solo) {
			socket.on('return lobby', dispatch)
			socket.on('receive player shadow', dispatch)
			socket.on("user game over", (name, action) => {
				notify.info(`${name} finished !`)
				dispatch(action)
			})
		}
		else socket.on('solo update', dispatch)
		return () => {
			socket.off('opponent line block')
			socket.off('receive player shadow')
			socket.off('solo update')
			socket.off("player win")
			socket.off("user game over")
		}
	}, []);

	useEffect(()=>{
		if (!gameOver && gameState.gameStarted && gameState.playing) socket.emit('emit board state', board, gameState.room)
		if (canAddLine === true && tmpLineDel){
			updateBoard((old)=>{
				for (var n = 0; n < tmpLineDel; n++){
					old.splice(0, 1) 
					old.splice(19, 0, [8,8,8,8,8,8,8,8,8,8])
				}
				return old
			})
			setTmpLineDel(0)
		}
	}, [tmpLineDel, canAddLine])

	useEffect(() =>{
		if (JSON.stringify(board) === JSON.stringify(initialBoardState()) && counter === 0 && curTetri.y === 0){
			socket.on("opponent line block", (num) => {
				setTmpLineDel(tmpLineDel + num - 1)
			})
		}
	}, [counter, board])
	
	useEffect(() =>{
		if (!solo) socket.emit('emit board state', board, gameState.room)
		if (gameState.pieces && counter + 5  > gameState.pieces.length){
			socket.emit('add pieces', gameState.room)
		}
	}, [counter])

	useEffect(() => {
		if (JSON.stringify(board) === JSON.stringify(initialBoardState()) &&
		 (counter > 0 || curTetri.y > 0)){
			reset(increment, updateScore, setLevel, setRows, setDropTime,
				moveTetri, initialTetriState, gameState.pieces, tab, overGame, setNext)
		}
	}, [board, counter, nextTetri])

	const resetGame = () => {
		updateBoard(initialBoardState())
	}

	const setGameOver = () => {
		if (!solo) socket.emit('user game over', gameState.room, score)
		overGame(true)
	}

	const setGameLoop = useCallback((speed) => {
		if (keyDown.current && keyDown.current.keyCode === 32) speed = 15
		return setInterval(() => {
			gameLoop(moveTetri, canFit, setCanMove, keyDown,
				clearInterval, updateBoard, initialTetriState, increment,
				 setNext, setGameOver, board, refInterval, counter, gameState.pieces, tab, setLineAdd)
		}, speed)
	}, [board, counter, gameState.pieces])

	const keydownFunc = event => {
		if ((keyDown.current && (keyDown.current.keyCode === 38 ||
			 keyDown.current.keyCode === 32 ||
				keyDown.current.keyCode === 40)) ||
				 !canMove) return
		keyDown.current = event
		checkPlayerInputs(canFit, board, setCanMove, refInterval,
			 tab, moveTetri, setGameLoop, event)
	}

	const keyUpFunc = event => {
		if (event.keyCode === 40 && canMove){
			clearInterval(refInterval.current)
			refInterval.current = setGameLoop(dropTime)
		}
		if (event.keyCode != 32 && canMove){
			keyDown.current = null
		}
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
	}, [counter, gameOver])

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

	const returnLobby = ()=>{
		socket.emit('return lobby', gameState.room)
	}

	const emitLinesToOpponents = (num) => {
		socket.emit('block opponents line', num, gameState.room)
	}

	useEffect(() => {
			checkLine(board, displayUpdate, rows, updateBoard, emitLinesToOpponents)
	})

	useEffect(() => {
		setScreenY(window.innerHeight)
		setScreenX(window.innerWidth)
	}, [window.innerHeight, window.innerWidth])

	const tetri = curTetri.form

	return (
		<div className="App fullHeight fullWidth flex center alignCenter" style={styles.container}>
				{gameOver || !gameState.gameStarted || !gameState.playing
					? <FinishComponent
						level={level}
						score={score}
						rows={rows}
						resetGame={resetGame}
						gameState={gameState}
						winHeight={screenY}
						solo={solo}
						startGame={startGame}
						dispatch={dispatch}
						returnLobby={returnLobby}
						chat={chat}
						chatInput={chatInput}
						setChatInput={setChatInput}
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
						solo={solo}
						reset={resetGame}
						dispatch={dispatch}
						curUser={curUser}
						chat={chat}
						chatInput={chatInput}
						setChatInput={setChatInput}
					/>
				}
		</div>
	)
}

export default withStyles(GameStyle)(Game)