import React, {useEffect, useState} from 'react'
import { styles } from '../../styles/Menu-styles.js'
import { leaveRoom, sendMessage } from '../../sockets/emits.js'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { socket } from '../../sockets'
import { withStyles } from '@material-ui/styles'
import Game from '../Game/Game.js'

export const Multi = ({ classes, gameState, dispatch, notify, solo }) => {
	const [chatInput, setChatInput] = useState('')

	var userId = gameState.playerId
	var curUser = {}

	gameState.playTab && gameState.playTab.forEach((user)=>{
		if (user && user.id === userId){
			curUser = user
		}
	})

	const startGame = () => {
		socket.emit('start game', gameState.room)
	}

	const chat = (message) =>{
		sendMessage(gameState.room, message)
	}

	const setSockets = () => {
		socket.on('room update', dispatch)
		socket.on('become host', dispatch)
		socket.on('new message', (data)=>{
			notify(`${data.sender}: ${data.message}`)
		})
		socket.on('new host', (name)=>{
			notify.info(`${name} is now hosting !`)
		})
		socket.on('user joined room', (name)=>{
			notify.info(`${name} joined room ${gameState.room}!`)
		})
		socket.on('user exited room', (name)=>{
			notify.info(`${name} exited room ${gameState.room}`)
		})
		socket.on('host started game', (action) => {
			notify.info('Game started!')
			dispatch(action)
		})
		socket.emit('room infos')
	}

	const unsetSockets = () => {
		socket.off('room update')
		socket.off('become host')
		socket.off('new host')
		socket.off('host started game')
		socket.off('user joined room')
		socket.off('user exited room')
		socket.off('new message')
	}

	useEffect(()=> {
	if (!solo) setSockets()
		return () => {
			if (!solo) unsetSockets()
		}
	}, [])

	return (
	 <div className='fullWidth fullHeight'>
		{gameState.gameStarted
			? <Game
					gameState={gameState}
					dispatch={dispatch}
					solo={solo}
					startGame={startGame}
					notify={notify}
					chat={chat}
					chatInput={chatInput}
					setChatInput={setChatInput}
				/>
			: <div>
					<div
					className={`${classes.returnMenuButton} navigationBar fullWidth flex center alignCenter`}
					onClick={()=>{
						leaveRoom()
					}}
				>
					<p>RETURN MENU</p>
				</div>
				<div className="App" style={styles.container}>
					<p align="center">
						{ curUser.gameHost
							? "Waiting for players"
							: "Waiting for host to start the game"
						}
					</p>
					<Loader color="white"/>
					<div
						className={`flex center alignCenter ${classes.roomLabel}`}
						style={{fontSize: '30px'}}>Room : 
							<div className={`${classes.roomNameLabel} ${classes.glowText}`}>
								{gameState.room}
							</div>
						</div>
					<div style={{border: '1px solid white', minWidth: '500px', borderRadius: '10px'}}>
						<div className={classes.listUsernameLabel}>
							Players in this room :
						</div> 
					{ 
						gameState.playTab && gameState.playTab.map((user, index) => {
							return user
								? <div className={`flex center alignCenter row`} key={index}>
								<div className={`${classes.listUsernameLabel} ${classes.rainbowText}`}>
									{user.username}{user.gameHost ? ' ♛' : ''}{user.id === gameState.playerId ? ' (you)' : ''}
								</div>
							</div>
								: <div key={index}/>
							})
					}
					</div>
					{ curUser.gameHost && gameState.playTab && gameState.playTab.length > 1
						?	<div
								className={`flex center alignCenter ${classes.startButton}`}
								onClick={()=>{startGame()}}
							>
								START
							</div>
						: curUser.gameHost
							? <div>
									<p>No opponent yet... </p>
									<p>Invite your friends or play Solo</p>
								</div>
							: null
					}
					{gameState.playTab && gameState.playTab.length > 1
						?	<div className={``} style={{width: '80%', maxWidth: '400px', marginTop: '10px'}}>
							<p className={classes.chatLabel}>
								Say Something ↴
							</p>
							<input
								id='chatInput'
								className={`fullWidth ${classes.input}`}
								style={{width: '100%'}}
                value={chatInput}
                autoFocus
                onKeyDown={(e)=>{
                  if (e.keyCode === 13){
                    if (chatInput.length > 0){
											chat(chatInput)
											setChatInput('')
                    }
                  }
                }}
                onChange={(e)=>{setChatInput(e.target.value)}}
              />
						</div>
						: null
					}
				</div>
			</div>
		}
	</div>
	)
}

export default withStyles(styles)(Multi)