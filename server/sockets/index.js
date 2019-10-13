import _ from 'lodash'
import { users, rooms, rooms2, setDefaultUsername, getUserInfos,
leaveRoom, createRoom, checkRoomAndJoin } from './socket-functions'

export const useSockets = (io) => {
	io.on('connection', (socket)=>{
				
		console.log("\x1b[32m", `${socket.id} connected`)

		if (!users.hasOwnProperty(socket.id)){
			setDefaultUsername(socket)
		}

		socket.on('disconnect', function(){
			// UPDATE SI ON RAFRAICHIT LA PAGE EN PLEIN JEU
			delete users[socket.id]
			console.log("\x1b[31m", `${socket.id} disconnected`)
		})

		socket.on('user connect', ()=>{
			getUserInfos(socket)
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
			socket.emit('room update', {
				type: 'ROOM_UPDATE',
				playerTab: rooms2[Object.keys(socket.rooms)[1]]
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

		socket.on("RandomTetri", () => {
				const tetriminos = ["I", "O", "T", "L", "Z", "S", "J"];
				const randTab = [];
				for (var i = 0; i < 128; i++)
				{
						var rand = tetriminos[Math.floor(Math.random() * tetriminos.length)];
						randTab[i] = rand;
				}
				socket.emit("sendRandTetris", randTab);
		})
		
		socket.on('leave room', () => {
			leaveRoom(socket, io)
		})
	})
}

