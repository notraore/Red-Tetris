import _ from 'lodash'
import { users, rooms, setDefaultUsername, getUserInfos,
leaveRoom, createRoom, checkRoomAndJoin, refillTetriList } from './socket-functions'

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
			// UPDATE SI ON RAFRAICHIT LA PAGE EN PLEIN JEU
			leaveRoom(socket, io, true)
			console.log("\x1b[31m", `${socket.id} disconnected`)
			io.emit('user disconnected', {type: 'USER_CONNECTED', onlineUsers: users})
		})

		socket.on('user connect', () => {
			getUserInfos(socket)
			io.emit('user connected', {type: 'USER_CONNECTED', onlineUsers: users})
		})

		socket.on('user game over', (room, score)=>{
			console.log('user game over')
			rooms[room].playerTab.map((player)=>{
				if (player.id === socket.id){
					player.waiting = true
					player.playing = false
					socket.emit('user game over', {type: 'END_GAME', playerTab: rooms[room].playerTab})
					io.in(room).emit('player game over', player.username)
					if (!stillPlaying(room)){
						console.log('user win')
						player.win = true
						io.in(room).emit('player win', {type: 'PLAYER_WIN', playerTab: rooms[room].playerTab, winScore: {winner: player.username, id: player.id, score: score}})
						rooms[room].pieces = null
					}
				}
			})
		})

		socket.on('host restart game', (room) => {
			rooms[room].gameStarted = true
			rooms[room].playerTab.map((player)=>{
				player.waiting = false
				player.playing = true
				player.win = false
			})
			refillTetriList(room, 2)
			io.in(room).emit('host restart game',
				{
					type: 'START_GAME',
					nbPlayer: Object.keys(rooms[room].playerTab).length,
					playerTab: rooms[room].playerTab,
					gameStarted: true,
					winScore: null,
					pieces: rooms[room].pieces
				}
			)
		})

		socket.on('start game', (room)=>{
			rooms[room].gameStarted = true
			rooms[room].playerTab.map((player)=>{
				player.waiting = false
				player.playing = true
				player.win = false
			})
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
			if (rooms[room].playerTab){
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
			refillTetriList(room, 1)
			io.in(room).emit('room update', {
				type: 'ROOM_UPDATE',
				playerTab: rooms[room].playerTab,
				gameStarted: rooms[room].gameStarted,
				pieces: rooms[room].pieces
			})
		})

		socket.on('set username', (username) => {
			socket.username = username
			socket.emit('username set', {
				type: 'SET_USERNAME',
				player: socket.username
			})
			users[socket.id] = socket.username
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

		socket.on('join room', (room, res) => {
			checkRoomAndJoin(socket, room, res, io)
		})

		socket.on('is in room', (roomName, res) => {
			res(socket.rooms.hasOwnProperty(roomName), roomName)
		})

		socket.on('create room', (room, res) => {
			createRoom(socket, room, res, io)
		})

		socket.on('leave room', () => {
			leaveRoom(socket, io, false)
		})
	})
}

