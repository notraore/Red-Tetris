import React, { useEffect, useState, useReducer, Fragment } from 'react'
import Menu from './containers/Menu' 
import Multi from './containers/Multi'
import { socket } from './sockets'
import { gameReducer, initialState } from './reducers/reducer.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
		socket.on('user connected', dispatch)
		socket.on('user disconnected', dispatch)
		socket.on('get online users', dispatch)
		socket.on('room joined', (data)=>{
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
		<Fragment>
		<ToastContainer
			position="top-right"
			autoClose={4000}
			hideProgressBar={true}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnVisibilityChange
			draggable={false}
			pauseOnHover={true}
		/>
		{gameState.isInGame
			? <Multi
				solo={gameState.nbPlayer === 1}
				gameState={gameState}
				notify={toast}
				dispatch={updateGameState}
			/>
			: <Menu
					gameState={gameState}
					dispatch={updateGameState}
					notify={toast}
					popupInfo={popupInfo}
					disablePopup={disablePopup}
				/>
		}
		</Fragment>
	)
}