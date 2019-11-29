import React from 'react'
import ReactDOM from 'react-dom'
import './src/index.css'
import './src/styles/fonts.css'
import './src/styles/patterns.css'
import { App } from './src/App.js'
import * as serviceWorker from './src/serviceWorker';
import { isNil} from 'ramda'
import { roomExist, changeUsername } from './src/sockets/emits'
import { getRoomName, getUser } from './utils.js'


const url = new URL(window.location.href)
const roomName = getRoomName(url.hash)
const user = getUser(url.hash)

if (!isNil(roomName) && !isNil(user)){
	changeUsername(user)
	roomExist(roomName)
}

ReactDOM.render(<div style={{height: '100vh', backgroundColor: 'rgb(33, 35, 46)'}}><App /></div>, document.getElementById('root') || document.createElement('div'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
