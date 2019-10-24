import React, {useEffect} from 'react'
import { styles } from '../../styles/Menu-styles.js'
import { leaveRoom } from '../../sockets/emits.js'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { socket } from '../../sockets'
import { withStyles } from '@material-ui/styles'
import Game from '../Game/Game.js'

const Multi = ({ classes, gameState, dispatch }) => {
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
		socket.on('host started game', dispatch)
		socket.emit('room infos')
		return () => socket.off('room update')
	}, [])

	return (
	 <div className='fullWidth fullHeight'>
		{gameState.gameStarted
			? <Game
					gameState={gameState}
					dispatch={dispatch}
					solo={gameState.playTab && Object.keys(gameState.playTab).length === 1}
				/>
			: <div>
					<div
					className='navigationBar fullWidth flex center alignCenter'
					style={{height: '30px', backgroundColor: 'red'}}
					onClick={()=>{
						leaveRoom()
					}}
				>
					<p>RETURN MENU</p>
				</div>
				<div className="App" style={styles.container}>
					<p align="center">
						Waiting for host to start the game
					</p>
					<Loader color="navy"/>
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
					{ curUser.gameHost
						?	<div
								className={classes.startButton}
								onClick={()=>{startGame()}}
							>
								START
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