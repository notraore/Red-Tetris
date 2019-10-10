import React, { useEffect, useState } from 'react'
import Menu from './containers/Menu' 
// import Solo from './components/Game'
import Multi from './containers/Multi'
import { socket } from './sockets'
import { historyPush } from "./history"
import { useStateValue } from './context/GlobalState.js'
import { UPDATE_GAME } from './context/reducer.js'

export const App = props => {
	const [popupInfo, setPopupInfo] = useState(null)
  const [gameState, dispatch] = useStateValue()

	const disablePopup = () => {
		setPopupInfo(null)
	}

	const setListenners = () => {
		socket.on('get user infos', (data)=>{
			dispatch({type: UPDATE_GAME, payload: data})
		})
		socket.on('room joined', (data)=>{
			historyPush(`${data.roomName}[${data.username}]`)
			dispatch({
				type: UPDATE_GAME,
				payload: {
					...gameState,
					isInGame: true,
					room: data.roomName,
					isHost: data.host
				}
			})
		})
		socket.on('room leaved', (data)=>{
			historyPush('')
			dispatch({
				type: UPDATE_GAME,
				payload: {
					...gameState,
					room: null,
					opponents: null,
					isInGame: false,
					isHost: false
				}
			})
		})
		socket.on('username set', (username)=>{
			dispatch({
				type: UPDATE_GAME, payload:
				{...gameState, player: username}
			})
		})
		socket.on('info popup', (info)=>{
			setPopupInfo(info)
		})
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
			? <Multi/>
			: <Menu
				popupInfo={popupInfo}
				disablePopup={disablePopup}
			/>
	)
}