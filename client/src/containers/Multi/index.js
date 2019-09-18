import React, { useEffect } from 'react'
import { historyPush } from '../../history'
import { checkGameInfos, leaveRoom } from '../../sockets/emits'
import { withRouter } from 'react-router'

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
            historyPush('/')
        }}>
            <p>Revenir au menu</p>
        </div>
        <p>INFO PARTIE</p>
        <p>User courant:</p>
        <p>Autres USER:</p>
        <p>Nom partie:</p>
     </div>
    )
}

export default withRouter(Multi)