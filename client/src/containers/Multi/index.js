import React, { useEffect } from 'react'
import { historyPush } from '../../history'
import {styles, colorArray} from '../../styles/Menu-styles.js'
import { checkGameInfos, leaveRoom, getPlayerName } from '../../sockets/emits.js'
import { withRouter } from 'react-router'
import Loader from 'react-dots-loader'
import 'react-dots-loader/index.css'

const name = getPlayerName();
const Multi = ({classes, history, location}) => {
    //1) prendre la room name de socket IO
    //2) rediriger vers le bon url avec le nom et la room name (stockée qqpart)

    useEffect(()=>{
        const tab = location.pathname.split('/')
        //verifier que la salle est bien existante et le joueur aussi
        //sinon popup + redirection vers le menu
        console.log(history, location, location.pathname.split('/'))
        if (tab.length !== 3){
            console.log('MAUVAIS LIEN')
        }
        checkGameInfos(tab[2], tab[3])//verifie si la partie existe sinon redirection
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
        <p>Your name is : {console.log(getPlayerName())}</p>


        </div>
        </div>
    )
}

export default withRouter(Multi)