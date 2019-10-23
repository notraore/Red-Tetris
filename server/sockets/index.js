import _ from 'lodash'
import { users, rooms, setDefaultUsername, getUserInfos,
leaveRoom, createRoom, checkRoomAndJoin, isHost } from './socket-functions'

export const useSockets = (io) => {
	io.on('connection', (socket)=>{
				
		console.log("\x1b[32m", `${socket.id} connected`)

		if (!users.hasOwnProperty(socket.id)){
			setDefaultUsername(socket)
		}

		socket.on('disconnect', function(){
			// UPDATE SI ON RAFRAICHIT LA PAGE EN PLEIN JEU
			leaveRoom(socket, io)
			if (users){
			Object.keys(users).map((user, index)=>{
				if (user.id === socket.id) users.splice(index, 1)
			})}
			console.log("\x1b[31m", `${socket.id} disconnected`)
		})

		socket.on('user connect', ()=>{
			getUserInfos(socket)
		})

		socket.on('user game over', (room)=>{
			console.log("user game over")
			rooms[room].map((player)=>{
				if (player.id === socket.id){
					player.waiting = true
					player.playing = false
					socket.emit('user game over', {type: 'OVER_GAME'})
					io.in(room).emit('player game over', player.username)
				}
			})
		})

		socket.on('start game', (room)=>{
			rooms[room].map((player)=>{
				player.waiting = false
				player.playing = true
			})
			io.in(room).emit('host started game')
			console.log(rooms[room])
		})	

		socket.on('emit board state', (board, room)=>{
			if (rooms[room]){
				rooms[room].map((player)=>{
					if (player.id === socket.id){
						player.shadow = board
					}	
				})
				io.in(room).emit(
					'receive player shadow',
					{type: 'UPDATE_OPPONENTS', playTab: rooms[room]}
				)
			}
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
				playerTab: rooms[room],
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

