import React, { useEffect, useState, useReducer } from 'react'
import Menu from './containers/Menu' 
// import Solo from './components/Game'
import Multi from './containers/Multi'
import { socket } from './sockets'
import { historyPush } from "./history"
import { gameReducer, initialState } from './reducers/reducer.js'
import Game from './containers/Game/Game.js'

export const App = props => {
	const [popupInfo, setPopupInfo] = useState(null)
  const [gameState, dispatch] = useReducer(gameReducer, initialState)

	const disablePopup = () => {
		setPopupInfo(null)
	}

	const updateGameState = (action) => {
		dispatch(action)
	}

	const setListenners = () => {
		socket.on('get user infos', dispatch)
		socket.on('room joined', (data)=>{
			historyPush(`${data.room}[${data.player}]`)
			dispatch(data)
		})
		socket.on('room leaved', dispatch)
		socket.on('username set', dispatch)
		socket.on('info popup', setPopupInfo)
	}
	useEffect(()=>{
		if (gameState.isInGame === false) socket.emit('user connect')
	}, [gameState.isInGame])

	useEffect(()=>{
		setListenners()
		socket.emit('user connect')
	}, [])

	return(
		gameState.isInGame
			? <Multi
				gameState={gameState}
				dispatch={updateGameState}
			/>
			: gameState.gameStarted
				? <Game
					gameState={gameState}
					dispatch={updateGameState}
					solo={gameState.nbPlayer === 1}
				/>
				: <Menu
					gameState={gameState}
					dispatch={updateGameState}
					popupInfo={popupInfo}
					disablePopup={disablePopup}
				/>
	)
}