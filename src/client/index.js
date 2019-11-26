import React from 'react'
import ReactDOM from 'react-dom'
import './src/index.css'
import './src/styles/fonts.css'
import './src/styles/patterns.css'
import { App } from './src/App.js'
import * as serviceWorker from './src/serviceWorker';
import { equals, length, dropLast, indexOf, drop, isNil} from 'ramda'
import { roomExist, changeUsername } from './src/sockets/emits'

const getRoomName = (hash) => {
	const endOfWord = indexOf('[', hash) >= 0 ? indexOf('[', hash) : length(hash)
	const toCut = length(hash) - endOfWord

	if(indexOf('#', hash) < 0)
			return undefined
	const roomName = drop(1, dropLast(toCut, hash))
	if(equals(length(roomName), 0))
			return undefined
	return roomName
}

const getUser = (hash) => {
	const toCut = indexOf('[', hash) + 1

	if(toCut === 0)
			return undefined
	const user = dropLast(1, drop(toCut, hash))
	if(equals(length(user) ,0))
			return undefined
	return user
}

const url = new URL(window.location.href)
const roomName = getRoomName(url.hash)
const user = getUser(url.hash)

if (!isNil(roomName) && !isNil(user)){
	changeUsername(user)
	roomExist(roomName)
}

ReactDOM.render(<div style={{height: '100vh', backgroundColor: 'rgb(33, 35, 46)'}}><App /></div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
