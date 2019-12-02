import express from 'express'
import http from 'http'
import path from 'path'
import socketIo from 'socket.io'
import {useSockets} from './sockets'

export const SOCKET_TIMEOUT = 60000
export var app = express()
var fs = require('fs');
export var server = http.Server(app)
var io = socketIo(server, {
    pingTimeout: SOCKET_TIMEOUT
})

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../../build', 'index.html'));
})

useSockets(io)

server.listen(3000, () => console.log("Port listening on port :3000\n\n█████████████████\n█░░░░░░░░░░░░░░░█\n█░░░░░░░░░░░░░░░█\n█░░████░░░████░░█\n█░░████░░░████░░█\n█░░░░░░███░░░░░░█\n█░░░░███████░░░░█\n█░░░░███████░░░░█\n█░░░░██░░░██░░░░█\n█░░░░░░░░░░░░░░░█\n█████████████████\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n█████████████████\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█████████████████\n█████████████████"))
