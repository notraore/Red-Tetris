import {sendInfo} from '../utils.js'
import _ from 'lodash'

export var users = {}
export var rooms = {}
export var nameTab = [
	'Titi',
	'Bidule',
	'Machin',
	'Truc',
	'Minuche',
	'Wele',
	'Caca'
]

const playerTabs = [];

export const getAllRooms = (io) => {
	return io.sockets.adapter.rooms
}
   
export const getUsersInRoom = (io, room) => {
	var allRooms = getAllRooms(io)
	return allRooms[room]
}

export const setDefaultUsername = (socket) =>{
	var randUser = nameTab[_.random(0, 6)]
	socket.username = randUser
	socket.emit('username set', randUser)
	users[socket.id] = randUser
}
   
export const sendRoomData = (socket) => {
	var usersRooms = socket.rooms
	socket.emit('get user infos', {
		type: 'UPDATE_GAME',
		playerId: socket.id,
		player: users[socket.id],
		isInGame: Object.keys(usersRooms).length > 1,
		playerTab: playerTabs
	})
}
   
export const emitUpdateInRoom = (io, room, action) => {
	io.in(room).emit('room update', action)
}
   
export const joinRoom = (socket, room, action, io) => {
	socket.join(room, ()=>{
		if (typeof rooms[room] === 'undefined'){
			rooms[room] = []
		}

		rooms[room].push(users[socket.id])
		socket.emit('room joined', action)
		playerTabs.push({id: socket.id, username: users[socket.id], gameHost: true})
		emitUpdateInRoom(io, room, {
			type: 'ROOM_UPDATE',
			opponents: rooms[room],
			playerTab: playerTabs
		})
	})
}
   
export const leaveRoom = (socket, io) => {
	var room = Object.keys(socket.rooms)[1]
	if (room) {var index = rooms[room].indexOf(users[socket.id])
	socket.emit('room leaved', {type: 'ROOM_LEAVED'})
	socket.leave(room)
	rooms[room].splice(index, 1)
	io.in(room).emit('room update', {
		type: 'ROOM_UPDATE',
		opponents: rooms[room]

	})
	sendInfo(socket, 'Exit info', 'You leaved the room.')}
}
   
export const createRoom = (socket, room, res, io) => {
	var players = getUsersInRoom(io, room)
	var canCreateRoom = typeof players === 'undefined' ||
	players.length === 0
	playerTabs.push({id: socket.id, username: users[socket.id], gameHost: true})
	console.log(playerTabs);
	if (canCreateRoom){
		joinRoom(socket, room, {
			type: 'ROOM_JOINED',
			room: room,
			player: users[socket.id],
			host: true,
			playerTab: playerTabs
		}, io)
	} else {
		sendInfo(socket, 'Information', `Room "${room}" already exists.`)
	}
	res(canCreateRoom, room)
}
   
export const checkRoomAndJoin = (socket, room, res, io) => {
	var players = getUsersInRoom(io, room)
	var alreadyInRoom = socket.rooms.hasOwnProperty(room)
	var canJoin = !(typeof players === 'undefined') &&
			players.length < 3

	if (canJoin && !alreadyInRoom){
		console.log(`CONNECTION A LA ROOM "${room}", id:`, socket.id)
		playerTabs.push({id: socket.id, username: users[socket.id], gameHost: false})
		joinRoom(socket, room, {
			type: 'ROOM_JOINED',
			room: room,
			player: users[socket.id],
			host: false,
			opponents: rooms[room],
			playerTab: playerTabs
		}, io)
	} else {
		if (alreadyInRoom){
			canJoin = false
		} else {
			sendInfo(socket, 'Information',
			`Room ${room} is not available.`)
		}
	}
	res(canJoin, room)
}