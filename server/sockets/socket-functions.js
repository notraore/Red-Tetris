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

export const getAllRooms = (io) => {
	return io.sockets.adapter.rooms
}

export const isHost = (id, room) => {
	var isHost = false

	rooms[room].forEach((user)=>{
		if (user.id === id){
			isHost = user.gameHost
		}
	})

	return isHost
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
			playerTab: rooms[room],
		})
	})
}
   

export const changeHost = (user, curRoom, id) => {
	const len = Object.keys(rooms[curRoom]).length
	if (user && user.gameHost === true && len > 1)
		{
			rooms[curRoom][id - 1]
				? rooms[curRoom][id - 1].gameHost = true
				: rooms[curRoom][id + 1].gameHost = true
		}
}

export const leaveRoom = (socket, io) => {
	var curRoom = null

	Object.keys(rooms).map((room)=>{
		rooms[room].map((user)=>{
			if (user.id === socket.id){
				curRoom = room
			}
		})
	})
	if (curRoom) {
		rooms[curRoom].map((user, id)=>{
			if (user.id === socket.id){
			rooms[curRoom].splice(id, 1)
			changeHost(user, curRoom, id)
			 socket.leave(curRoom)
			}
		})
		socket.emit('room leaved', {type: 'ROOM_LEAVED'})
		io.in(curRoom).emit('room update', {
			type: 'ROOM_UPDATE',
			playerTab: rooms[curRoom]
		})
		sendInfo(socket, 'Exit info', 'You leaved the room.')
	}
}
   
export const createRoom = (socket, room, res, io) => {
	var players = getUsersInRoom(io, room)
	var canCreateRoom = typeof players === 'undefined' ||
	players.length === 0
	rooms[room] = []
	rooms[room].push({id: socket.id, username: users[socket.id], gameHost: true})
	if (canCreateRoom){
		joinRoom(socket, room, {
			type: 'ROOM_JOINED',
			room: room,
			player: users[socket.id],
			isHost: true,
			playerTab: rooms[room]
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
			players.length < 4
	if (canJoin && !alreadyInRoom){
		console.log(`CONNECTION A LA ROOM "${room}", id:`, socket.id)
		rooms[room].push({id: socket.id, username: users[socket.id], gameHost: false})
		joinRoom(socket, room, {
			type: 'ROOM_JOINED',
			room: room,
			player: users[socket.id],
			isHost: false,
			playerTab: rooms[room]
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