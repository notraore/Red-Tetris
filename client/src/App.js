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
	const [userInfos, dispatch] = useReducer(userReducer, initialUserState)
	const [username, change] = useState('')
	const [data, setData] = useState('')

	const setUser = () => {
		dispatch({type:'CHANGE_USERNAME', payload: socket.id})
	}

	useEffect(()=>{
		// connect()
		socket.emit('get data')
		socket.on('receive data', (id)=>{
			setData(id)
		})
		setUser()
	}, [])
	
	useEffect(()=>{
		change(data)
	}, [data])

	return(
		<Fragment>
			<SocketProvider>
				<Router history={history}>
					<Route exact path="/" component={()=> <Menu username={username}/>}/>
					<Route path="/solo" component={()=> <Solo/>}/>
					<Route path={`/multi`} component={()=> <Multi/>}/>
				</Router>
			</SocketProvider>
		</Fragment>
	)
}