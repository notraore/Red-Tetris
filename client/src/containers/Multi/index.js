import React, {useEffect} from 'react'
import { styles } from '../../styles/Menu-styles.js'
import { leaveRoom } from '../../sockets/emits.js'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { socket } from '../../sockets'
import { withStyles } from '@material-ui/styles';

const Multi = ({ classes, gameState, dispatch }) => {
	var userId = gameState.playerId
	var curUser = {}

	gameState.playTab.forEach((user)=>{
		if (user && user.id === userId){
			curUser = user
		}
	})

	useEffect(()=> {
		socket.on('room update', dispatch)
		socket.emit('room infos')
		return () => socket.off('room update')
	}, [])

	return (
	 <div className='fullWidth' style={{backgroundColor: 'pink'}}>
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
				Waiting for player(s) to join your room
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
							{user.username}{user.gameHost ? ' ♛' : ''}
						</div>
					</div>
						: <div key={index}/>
					})
			}
			</div>
			{ curUser.gameHost
					?	<div
							className={classes.startButton}
							onClick={()=>{console.log('START GAME')}}
						>
							START
						</div>
					: null
			}
		</div>
	</div>
	)
}

export default withStyles(styles)(Multi)