import _ from 'lodash'
import { users, rooms, setDefaultUsername, getUserInfos,
leaveRoom, createRoom, checkRoomAndJoin, refillTetriList, getRandTetris } from './socket-functions'

const stillPlaying = (room) =>{
	for (var id in rooms[room].playerTab){
		if (rooms[room].playerTab[id].playing === true) return true
	}
	return false
}

export const useSockets = (io) => {
	io.on('connection', (socket)=>{
				
		console.log("\x1b[32m", `${socket.id} connected`)

		if (!users.hasOwnProperty(socket.id)){
			setDefaultUsername(socket)
		}

		socket.on('disconnect', function(){
			leaveRoom(socket, io, true)
			console.log("\x1b[31m", `${socket.id} disconnected`)
			io.emit('user disconnected', {type: 'USER_CONNECTED', onlineUsers: users})
		})

		socket.on('user connect', () => {
			getUserInfos(socket)
			io.emit('user connected', {type: 'USER_CONNECTED', onlineUsers: users})
		})

		socket.on('user game over', (room, score)=>{
			rooms[room].playerTab.map((player)=>{
				if (player.id === socket.id){
					player.waiting = true
					player.playing = false
					socket.to(room).emit('user game over', player.username, {type: 'END_GAME', playerTab: rooms[room].playerTab})
					io.in(room).emit('player game over', {type: 'ROOM_UPDATE', playerTab: rooms[room].playerTab})
					if (!stillPlaying(room)){
						player.win = true
						io.in(room).emit('player win', {type: 'PLAYER_WIN', playerTab: rooms[room].playerTab, winScore: {winner: player.username, id: player.id, score: score}})
						rooms[room].pieces = null
					}
				}
			})
		})

		socket.on('start game', (room)=>{
			rooms[room].gameStarted = true
			rooms[room].playerTab.map((player)=>{
				player.waiting = false
				player.playing = true
				player.win = false
			})
			refillTetriList(room, 2)
			io.in(room).emit('host started game',
				{
					type: 'START_GAME',
					nbPlayer: Object.keys(rooms[room].playerTab).length,
					playerTab: rooms[room].playerTab,
					gameStarted: rooms[room].gameStarted,
					winScore: null,
					pieces: rooms[room].pieces
				}
			)
		})	

		socket.on('emit board state', (board, room)=>{
			if (room && rooms[room] && rooms[room].playerTab){
				rooms[room].playerTab.map((player)=>{
					if (player.id === socket.id){
						player.shadow = board
					}	
				})
				io.in(room).emit(
					'receive player shadow',
					{type: 'UPDATE_OPPONENTS', playTab: rooms[room].playerTab}
				)
			}
		})	

		socket.on('add pieces', (room) => {
			if (room) {
				refillTetriList(room, 1)
				io.in(room).emit('room update', {
					type: 'ROOM_UPDATE',
					playerTab: rooms[room].playerTab,
					gameStarted: rooms[room].gameStarted,
					pieces: rooms[room].pieces
				})
			} else {
				var newPieces = getRandTetris()
				socket.emit('solo update', {type: 'SOLO_UPDATE', newPieces: newPieces})
			}
		})

		socket.on('get rand pieces', () => {
			socket.emit('get rand pieces', getRandTetris())
		})

		socket.on('block opponents line', (num, room) => {
			socket.to(room).emit('opponent line block', num)
		})

		socket.on('set username', (username) => {
			socket.username = username
			socket.emit('username set', {
				type: 'SET_USERNAME',
				player: socket.username
			})
			users[socket.id] = socket.username
			io.emit('user connected', {type: 'USER_CONNECTED', onlineUsers: users})
		})

		socket.on('room infos', () => {
			var room = Object.keys(socket.rooms)[1]
			socket.emit('room update', {
				type: 'ROOM_UPDATE',
				playerTab: rooms[room].playerTab,
				gameStarted: rooms[room].gameStarted,
				pieces: rooms[room].pieces
			})
		})

		socket.on('join room', (room) => {
			checkRoomAndJoin(socket, room, io)
		})

		socket.on('create room', (room) => {
			createRoom(socket, room, io)
		})

		socket.on('return lobby', (room) => {
			rooms[room].gameStarted = false
			io.in(room).emit('return lobby', {type: 'RETURN_MENU'})
		})

		socket.on('send message', (room, message) => {
			io.in(room).emit('new message', {sender: socket.username, message: message})
		})

		socket.on('room exist', (name, func) => {
			func(rooms.hasOwnProperty(name))
		})

		socket.on('leave room', () => {
			leaveRoom(socket, io, false)
		})
	})
}

