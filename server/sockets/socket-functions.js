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

export const getRandTetris = () => {
	const tetriminos = ["I", "O", "T", "L", "Z", "S", "J"];
	return tetriminos.sort(()=> Math.random() - 0.5)
}

export const addRandTetri = (room) => {
	const randTab = getRandTetris()
	if (!rooms[room].pieces) {
		rooms[room].pieces = []
	}
	rooms[room].pieces = rooms[room].pieces.concat(randTab)
}

export const refillTetriList = (room, num) => {
	for (var i = 0; i < num; i++){
		addRandTetri(room)
	}
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
		onlineUsers: users
	})
}
   
export const emitUpdateInRoom = (io, room, action) => {
	io.in(room).emit('room update', action)
}
   
export const joinRoom = (socket, room, action, io) => {
	socket.join(room, ()=>{
		socket.emit('room joined', action)
		io.in(room).emit('user joined room', socket.username)
		emitUpdateInRoom(io, room, {
			type: 'ROOM_UPDATE',
			playerTab: rooms[room].playerTab,
			gameStarted: rooms[room].gameStarted
		})
	})
}
   
export const changeHost = (user, curRoom, index) => {
	const len = Object.keys(rooms[curRoom].playerTab).length
	if (user && user.gameHost === true && len > 1)
	{
		if (rooms[curRoom].playerTab[index - 1]){
			rooms[curRoom].playerTab[index - 1].gameHost = true
			return rooms[curRoom].playerTab[index - 1].id
		} else {
			rooms[curRoom].playerTab[index + 1].gameHost = true
			return rooms[curRoom].playerTab[index + 1].id
		}
	}
}

export const leaveRoom = (socket, io, refresh) => {
	var curRoom = null

	Object.keys(rooms).map((room)=>{
		rooms[room].playerTab.map((user)=>{
			if (user.id === socket.id){
				curRoom = room
			}
		})
	})
	if (!curRoom || refresh){Object.keys(users).map((user)=>{
		if (user === socket.id){
			delete users[socket.id]
		}
	})}
	if (curRoom) {
		rooms[curRoom].playerTab.map((user, index)=>{
			if (user.id === socket.id){
				var newHostId = changeHost(user, curRoom, index)
				socket.to(newHostId).emit('become host', {type: 'BECOME_HOST'})
				socket.to(curRoom).emit('new host', users[newHostId])
				rooms[curRoom].playerTab.splice(index, 1)
				socket.leave(curRoom)
			}
		})
		socket.emit('room leaved', {type: 'ROOM_LEAVED'})
		io.in(curRoom).emit('room update', {
			type: 'ROOM_UPDATE',
			playerTab: rooms[curRoom].playerTab,
		})
		io.in(curRoom).emit('user exited room', socket.username)
		sendInfo(socket, 'Exit info', 'You leaved the room.')
	}
	Object.keys(rooms).map((room)=>{
		if (rooms[room] && rooms[room].playerTab && rooms[room].playerTab.length < 1) delete rooms[room]
		if (rooms[room] && rooms[room].playerTab && rooms[room].playerTab.length === 1) io.in(room).emit('return lobby', {type: 'RETURN_MENU'})
	})
}
   
export const createRoom = (socket, room, res, io) => {
	var players = getUsersInRoom(io, room)
	var canCreateRoom = typeof players === 'undefined' ||
	players.length === 0
	rooms[room] = {}
	rooms[room].playerTab = []
	rooms[room].playerTab.push({
		id: socket.id,
		username: users[socket.id],
		gameHost: true,
		waiting: true,
		playing: false,
		win: false
	})
	if (canCreateRoom){
		refillTetriList(room, 2)
		joinRoom(socket, room, {
			type: 'ROOM_JOINED',
			room: room,
			player: users[socket.id],
			isHost: true,
			gameStarted: rooms[room].gameStarted,
			playerTab: rooms[room].playerTab,
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
			players.length < 5
	if (canJoin && !alreadyInRoom && rooms[room] && !rooms[room].gameStarted){
		console.log(`CONNECTION A LA ROOM "${room}", id:`, socket.id)
		rooms[room].playerTab.push({id: socket.id, username: users[socket.id], gameHost: false, waiting: true, playing: false})
		joinRoom(socket, room, {
			type: 'ROOM_JOINED',
			room: room,
			player: users[socket.id],
			isHost: false,
			gameStarted: rooms[room].gameStarted,
			playerTab: rooms[room].playerTab
		}, io)
	} else {
		if (alreadyInRoom){
			canJoin = false
		} else if (rooms[room] && rooms[room].gameStarted) {
			sendInfo(socket, 'Information',
			`Game ${room} has already started !`)
		} else {
			sendInfo(socket, 'Information',
			`Room ${room} is not available.`)
		}
	}
	res(canJoin, room)
}