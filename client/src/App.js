import React, { Fragment, useReducer, useEffect, useState } from 'react'
import Menu from './containers/Menu' 
import Solo from './components/Game'
import Multi from './containers/Multi'
import { Router, Route } from 'react-router'
import history from './history'
import { userReducer, initialUserState } from './reducers/userReducer'
import { socket } from './sockets'
import { historyPush } from "./history"

export const App = () => {
	const [userInfos, setUserInfos] = useReducer(userReducer, initialUserState)
	const [popupInfo, setPopupInfo] = useState(null)

	const updateUser = (data) => {
		setUserInfos({type:'UPDATE_INFOS', payload: data})
	}

	const updateUsername = (username) => {
		socket.emit('set username', username)
	}

	const disablePopup = () => {
		setPopupInfo(null)
	}

	useEffect(()=>{
		socket.emit('get data')
		socket.on('receive data', (data)=>{
			updateUser(data)
		})
		socket.on('room joined', (data)=>{
			historyPush(`${data.roomName}[${data.username}]`)
		})
		socket.on('username set', (username)=>{
			setUserInfos({type:'UPDATE_INFOS', payload: {...userInfos, username: username}})
		})
		socket.on('info popup', (info)=>{
			setPopupInfo(info)
		})
	}, [])

	return(
		<Fragment>
				<Router history={history}>
					<Route path="/" component={()=> <Menu
						userInfos={userInfos}
						updateUsername={updateUsername}
						popupInfo={popupInfo}
						disablePopup={disablePopup}/>}
					/>
					<Route path="/solo" component={()=> <Solo/>}/>
					{/* <Multi path="/multi" userInfos={userInfos}/> */}
				</Router>
		</Fragment>
	)
	// return(
	// 	<Multi userInfos={userInfos}/>
	// )
}