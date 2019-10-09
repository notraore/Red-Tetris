import React, { useEffect, useState } from 'react'
import { historyPush } from '../../history'
import { styles } from '../../styles/Menu-styles.js'
import { checkGameInfos, leaveRoom } from '../../sockets/emits.js'
import { withRouter } from 'react-router'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { socket } from '../../sockets'

const Multi = ({classes, history, location, userInfos}) => {
    const [gameName, setGameName] = useState('')
    const [roomInfos, setRoomInfos] = useState([])

    useEffect(()=> {
			socket.on('room update', (data)=>{
            setRoomInfos(data)
            console.log('update users in room: ', data)
				})
    }, [])

		useEffect(()=>{
			if (gameName.length) {
				socket.emit('room infos')
			}
		}, [gameName])

    useEffect(()=>{
				const tab = location.pathname.split('/')
				if (location.pathname === '/' || tab.length < 2){
					historyPush('/menu')
				}else {
					console.log(location.pathname)
					var room = tab[2].split('[')[0]
					var username = tab[2].split('[')[1].slice(0, -1)

					console.log('room: ', room, 'username: ', username)
					checkGameInfos(room, username)
					setGameName(room)
				}
        return () => {
        }
    }, [location, history])

    return (
     <div className='fullWidth' style={{backgroundColor: 'pink'}}>
        <div className='navigationBar fullWidth flex center alignCenter' style={{height: '30px', backgroundColor: 'red'}} onClick={()=>{
            leaveRoom()
            console.log('ROOM LEAVED')
            historyPush('/')}}>
            <p>RETURN MENU</p>
        </div>
        <div className="App" style={styles.container}>
        <p align="center">Waiting for player(s) to join your room</p><Loader color="navy"/>
        <p>Room : {gameName}</p>
        <div>Players in this room : {
            roomInfos && roomInfos.map((name, id)=>{
                return <p key={id}>{name}</p>
            })
        }</div>
        </div>
        </div>
    )
}

export default withRouter(Multi)