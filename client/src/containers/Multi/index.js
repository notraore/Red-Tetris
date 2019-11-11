import React, {useEffect} from 'react'
import { styles } from '../../styles/Menu-styles.js'
import { leaveRoom } from '../../sockets/emits.js'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { socket } from '../../sockets'
import { withStyles } from '@material-ui/styles'
import Game from '../Game/Game.js'

const Multi = ({ classes, gameState, dispatch, notify }) => {
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

	useEffect(()=> {
		socket.on('room update', dispatch)
		socket.on('become host', dispatch)
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
		return () => {
			socket.off('room update')
			socket.off('become host')
			socket.off('new host')
			socket.off('host started game')
			socket.off('user joined room')
			socket.off('user exited room')
		}
	}, [])

	return (
	 <div className='fullWidth fullHeight'>
		{gameState.gameStarted
			? <Game
					gameState={gameState}
					dispatch={dispatch}
					solo={gameState.playTab && Object.keys(gameState.playTab).length === 1}
					startGame={startGame}
					notify={notify}
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
					<p>Room : {gameState.room}</p>
					<div>
						<div className={classes.listUsernameLabel}>
							Players in this room :
						</div> 
					{ 
						gameState.playTab && gameState.playTab.map((user, index) => {
							return user
								? <div className={`flex center alignCenter row`} key={index}>
								<div className={classes.listUsernameLabel}>
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
							? <p>No opponent yet... Invite your friends or play Solo</p>
							: null
					}
				</div>
			</div>
		}
	</div>
	)
}

export default withStyles(styles)(Multi)