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
    const [roomInfos, setRoomInfos] = useState(null)

    useEffect(()=>{
        socket.on('room update', (data)=>{
            // setRoomInfos(data)
            console.dir('update users in room: ', data)
        })
    }, [])

    useEffect(()=>{
        const tab = location.pathname.split('/')
        //verifier que la salle est bien existante et le joueur aussi
        //sinon popup + redirection vers le menu
        console.log(history, location, location.pathname.split('/'))
        if (tab.length !== 3){
            console.log('MAUVAIS LIEN')
        }
        checkGameInfos(tab[2], tab[3])//verifie si la partie existe sinon redirection
        setGameName(tab[2])
    }, [location, history])

    return (
     <div className='fullWidth' style={{backgroundColor: 'pink'}}>
        <div className='fullWidth' style={{height: '100px', backgroundColor: 'red'}} onClick={()=>{
            leaveRoom()
            console.log('ROOM LEAVED')
            historyPush('/')}}>
            <p>Revenir au menu</p>
        </div>
        <div className="App" style={styles.container}>
        <p align="center">Waiting for player(s) to join your room</p><Loader color="navy"/>
        <p>Room : {gameName}</p>
        <p>Your name is : {userInfos.username}</p>
        {/* <p>Other players in this room : {roomInfos.players}</p> */}
        </div>
        </div>
    )
}

export default withRouter(Multi)