import {sendInfo} from '../utils.js'
import _ from 'lodash'

export var users = {}
export var rooms = {}
export var rooms2 = {}
export var nameTab = [
	'Titi',
	'Bidule',
	'Machin',
	'Truc',
	'Minuche',
	'Wele',
	'Caca'
]

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
   
export const getUserInfos = (socket) => {
	var usersRooms = socket.rooms
	socket.emit('get user infos', {
		type: 'GET_USER_INFOS',
		playerId: socket.id,
		player: users[socket.id],
		isInGame: Object.keys(usersRooms).length > 1,
	})
}
   
export const emitUpdateInRoom = (io, room, action) => {
	io.in(room).emit('room update', action)
}
   
export const joinRoom = (socket, room, action, io) => {
	socket.join(room, ()=>{
		socket.emit('room joined', action)
		emitUpdateInRoom(io, room, {
			type: 'ROOM_UPDATE',
			playerTab: rooms2[room]
		})
	})
}
   
export const leaveRoom = (socket, io) => {
	var room = Object.keys(socket.rooms)[1]
	var index = 0
	if (room) {
			rooms2[room].map((user, id)=>{
			if (user.id === socket.id){
				index = id
				if (user.gameHost === true &&
					rooms2[room].length > 1){
				 id >= 1
				 	? rooms2[room][id - 1].gameHost = true
				 	: rooms2[room][id + 1].gameHost = true
			 }
			}
		})
		socket.emit('room leaved', {type: 'ROOM_LEAVED'})
		socket.leave(room)
		rooms2[room].splice(index, 1)
		io.in(room).emit('room update', {
			type: 'ROOM_UPDATE',
			playerTab: rooms2[room]
		})
		sendInfo(socket, 'Exit info', 'You leaved the room.')
	}
}
   
export const createRoom = (socket, room, res, io) => {
	var players = getUsersInRoom(io, room)
	var canCreateRoom = typeof players === 'undefined' ||
	players.length === 0
	rooms2[room] = []
	rooms2[room].push({id: socket.id, username: users[socket.id], gameHost: true})
	if (canCreateRoom){
		joinRoom(socket, room, {
			type: 'ROOM_JOINED',
			room: room,
			player: users[socket.id],
			host: true,
			playerTab: rooms2[room]
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
		rooms2[room].push({id: socket.id, username: users[socket.id], gameHost: false})
		joinRoom(socket, room, {
			type: 'ROOM_JOINED',
			room: room,
			player: users[socket.id],
			host: false,
			playerTab: rooms2[room]
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