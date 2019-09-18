import express from 'express'
import http from 'http'
import path from 'path'
import socketIo from 'socket.io'
import {useSockets} from './sockets'

var app = express()
var server = http.Server(app)
var io = socketIo(server)

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

useSockets(io)

server.listen(3000, () => console.log("Port listening on port :3000\n\n█████████████████\n█░░░░░░░░░░░░░░░█\n█░░░░░░░░░░░░░░░█\n█░░████░░░████░░█\n█░░████░░░████░░█\n█░░░░░░███░░░░░░█\n█░░░░███████░░░░█\n█░░░░███████░░░░█\n█░░░░██░░░██░░░░█\n█░░░░░░░░░░░░░░░█\n█████████████████\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n█████████████████\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█████████████████\n█████████████████"))
