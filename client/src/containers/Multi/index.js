import React, { useEffect } from 'react'
import { styles } from '../../styles/Menu-styles.js'
import { leaveRoom } from '../../sockets/emits.js'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { socket } from '../../sockets'
import { useStateValue } from '../../context/GlobalState.js'
import { UPDATE_GAME } from '../../context/reducer.js'

const Multi = ({classes, history, location, userInfos}) => {
		const [gameState, dispatch] = useStateValue()

    useEffect(()=> {
			socket.on('room update', (data)=>{
				dispatch({type: UPDATE_GAME, payload: {...gameState, opponents: data}})
			})
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
				<div>Players in this room : 
					{
            gameState.opponents && gameState.opponents.map((name, id)=>{
                return <p key={id}>{name}</p>
            })
        	}
				</div>
				{ gameState.isHost
						?	<div
								style={{width: '200px', height: '50px', backgroundColor: 'red', color: 'white'}}
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

export default Multi