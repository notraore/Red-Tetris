import React, { useEffect, useState } from 'react'
import { historyPush } from '../../history'
import {styles, colorArray} from '../../styles/Menu-styles.js'
import { checkGameInfos, leaveRoom, getPlayerName } from '../../sockets/emits.js'
import { withRouter } from 'react-router'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'
import { socket } from '../../sockets';

const name = getPlayerName();
const Multi = ({classes, history, location, userInfos}) => {
    const [gameName, setGameName] = useState('')
    const [roomInfos, setRoomInfos] = useState([])

    useEffect(()=>{
        socket.on('room infos', (data)=>{
            console.log('room infos', data)
        })
        socket.on('room update', (data)=>{
            setRoomInfos(data)
            console.log('update users in room: ', data)
        })
    }, [])

    useEffect(()=>{
        const tab = location.pathname.split('/')
        console.log(history, location, location.pathname.split('/'))
        if (tab.length !== 3){
            console.log('MAUVAIS LIEN')
        }
        checkGameInfos(tab[2], tab[3])//verifie si la partie existe sinon redirection
        setGameName(tab[2])
        socket.emit('room infos', gameName)
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
        <p>Your name is : {userInfos.username}</p>
        <p>Other players in this room : {
            roomInfos && roomInfos.map((name)=>{
                return <p key={name.id}>{name}</p>
            })
        }</p>
        </div>
        </div>
    )
}

export default withRouter(Multi)