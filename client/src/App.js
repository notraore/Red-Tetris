import React, { Fragment, useReducer, useEffect, useState } from 'react'
import Menu from './containers/Menu' 
import Solo from './components/Game'
import Multi from './containers/Multi'
import {SocketProvider} from './sockets/socketProvider'
import {connect} from './sockets/events'
import { Router, Route } from 'react-router'
import history from './history'
import { userReducer, initialUserState } from './reducers/userReducer'
import { roomReducer, initialRoomState } from './reducers/roomReducer'
import { socket } from './sockets'

export const App = () => {
	const [userInfos, setUserInfos] = useReducer(userReducer, initialUserState)
	// const [roomInfos, setRoomInfos] = useReducer(roomReducer, initialRoomState)

	const updateUser = (data) => {
		setUserInfos({type:'UPDATE_INFOS', payload: data})
	}

	const updateUsername = (username) => {
		socket.emit('set username', username)
	}

	useEffect(()=>{
		socket.emit('get data')
		socket.on('receive data', (data)=>{
			updateUser(data)
		})
		socket.on('username set', (username)=>{
			setUserInfos({type:'UPDATE_INFOS', payload: {...userInfos, username: username}})
		})
	}, [])

	return(
		<Fragment>
			<SocketProvider>
				<Router history={history}>
					<Route exact path="/" component={()=> <Menu userInfos={userInfos} updateUsername={updateUsername}/>}/>
					<Route path="/solo" component={()=> <Solo/>}/>
					<Route path={`/multi`} component={()=> <Multi userInfos={userInfos}/>}/>
				</Router>
			</SocketProvider>
		</Fragment>
	)
}