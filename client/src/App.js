import React, { Fragment, useReducer, useEffect, useState } from 'react'
import Menu from './containers/Menu' 
import Solo from './components/Game'
import Multi from './containers/Multi'
import {SocketProvider} from './sockets/socketProvider'
import {connect} from './sockets/events'
import { Router, Route } from 'react-router'
import history from './history'
import { userReducer, initialUserState } from './reducers/userReducer'
import { socket } from './sockets'

export const App = () => {
	const [userInfos, updateUserInfos] = useReducer(userReducer, initialUserState)
	const [data, setData] = useState('')

	const updateUser = (data) => {
		updateUserInfos({type:'UPDATE_INFOS', payload: data})
	}

	const updateUsername = (username) => {
		updateUserInfos({type:'UPDATE_INFOS', payload: {...userInfos, username: username}})
	}

	useEffect(()=>{
		socket.emit('get data')
		socket.on('receive data', (data)=>{
			updateUser(data)
		})
	}, [])

	return(
		<Fragment>
			<SocketProvider>
				<Router history={history}>
					<Route exact path="/" component={()=> <Menu userInfos={userInfos} updateUsername={updateUsername}/>}/>
					<Route path="/solo" component={()=> <Solo/>}/>
					<Route path={`/multi`} component={()=> <Multi/>}/>
				</Router>
			</SocketProvider>
		</Fragment>
	)
}