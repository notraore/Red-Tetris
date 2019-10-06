import {sendInfo} from './utils.js'
import _ from 'lodash'

export const useSockets = (io) => {
		var users = {}
		var nameTab = [
			'Titi',
			'Bidule',
			'Machin',
			'Truc',
			'Minuche',
			'Wele',
			'Caca'
		]
    io.on('connection', (socket)=>{
        
		console.log("\x1b[32m", `${socket.id} connected`)
		if (!users.hasOwnProperty(socket.id)){
						var randUser = nameTab[_.random(0, 6)]
						socket.username = randUser
						socket.emit('username set', randUser)
            users[socket.id] = randUser
        }		
        socket.on('disconnect', function(){
					delete users[socket.id]
          console.log("\x1b[31m", `${socket.id} disconnected`)
        })
        socket.on('get data', ()=>{
            var usersRooms = socket.rooms
            var userData = {
                id: socket.id,
                username: socket.username,
                playing: Object.keys(usersRooms).length > 1
            }
            socket.emit('receive data', userData)
        })
        socket.on('set username', (username) => {
            socket.username = username
						socket.emit('username set', socket.username)
						users[socket.id] = socket.username
						// sendInfo(socket, 'Information', `Your username is now ${socket.username}`)
            // console.log("\x1b[36m", `${socket.id} username is now ${socket.username}`)
				})
				socket.on('room infos', (roomName) => {
					var allRooms = io.sockets.adapter.rooms
          var usersInRoom = allRooms[roomName]
					var usernamesInRoom = []

					if (usersInRoom && usersInRoom.sockets){
						usersInRoom.map((id)=>{
							usernamesInRoom.push(users[id])
						})
					}

					console.log('usernames in room: ', usernamesInRoom)
					socket.emit('room infos', usersInRoom)
				})
        socket.on('join room', (roomName, res) => {
            var allRooms = io.sockets.adapter.rooms
            var usersInRoom = allRooms[roomName]
						var canJoinRoom = !(typeof usersInRoom === 'undefined') && usersInRoom.length < 3
						var usernamesInRoom = []

						if (usersInRoom && usersInRoom.sockets){
							Object.keys(usersInRoom.sockets).map((id)=>{
								usernamesInRoom.push(users[id])
							})
						}
    
            if (typeof usersInRoom !== 'undefined') console.log(`gens dans la room ${roomName}:`, usersInRoom.length)
            
            if (canJoinRoom && !socket.rooms.hasOwnProperty(roomName)){ // si la room est pas full join la room
                console.log(`Room pas full !\nCONNECTION A LA ROOM "${roomName}", id:`, socket.id)
                socket.join(roomName, ()=>{
                    socket.emit('room joined', {roomName: roomName, username: users[socket.id]})
                    io.in(roomName).emit('room update', usernamesInRoom)
                })
							} else {
                if (socket.rooms.hasOwnProperty(roomName)){ // si l'user est deja dans la room
                    console.log(`Jsuis deja dans cette room "${roomName}" BOULET`)
                    canJoinRoom = false
                } else { // si la room est full
                    sendInfo(socket, 'Information', `Room ${roomName} is not available.`)
                }
            }
            res(canJoinRoom, roomName) // Envoie au front si l'user a rejoint la room ou non
        })
    
        socket.on('create room', (roomName, res) => {
            var allRooms = io.sockets.adapter.rooms
            var usersInRoom = allRooms[roomName]
            var canCreateRoom = typeof usersInRoom === 'undefined' || usersInRoom.length === 0
						var usernamesInRoom = []

						if (usersInRoom && usersInRoom.sockets){
							Object.keys(usersInRoom.sockets).map((id)=>{
								usernamesInRoom.push(users[id])
							})
						}

            if (canCreateRoom){
                socket.join(roomName, ()=>{
                    socket.emit('room joined', {roomName: roomName, username: users[socket.id]})
                    io.in(roomName).emit('room update', usernamesInRoom)
                })
            } else {
                    sendInfo(socket, 'Information', `Room "${roomName}" already exists.`)
            }
            res(canCreateRoom, roomName) // Envoie au front si l'user a créé et rejoint la room ou non
        })
    
        socket.on('is in room', (roomName, res) => {
            res(socket.rooms.hasOwnProperty(roomName), roomName) // Envoie au front si l'user est deja dans la room
        })

        socket.on("RandomTetri", () => {
            const tetriminos = ["I", "O", "T", "L", "Z", "S", "J"];
            const randTab = [];
            for (var i = 0; i < 128; i++) //Creer une liste de 128 caractere de maniere aléatoire
            {
                var rand = tetriminos[Math.floor(Math.random() * tetriminos.length)];
                randTab[i] = rand;
            }
            socket.emit("sendRandTetris", randTab);
        })
    
        socket.on('leave room', () => {
            var usersRooms = socket.rooms
            var curRoom = Object.keys(usersRooms)[1] 
            socket.leave(curRoom)
            sendInfo(socket, 'Exit info', 'You leaved the room.')
            console.log("\x1b[31m", `EXIT ROOM ${curRoom}`)
        })
    
        socket.on('is in game', (res) => {
            var usersRooms = socket.rooms
            res(Object.keys(usersRooms).length > 1 ? Object.keys(usersRooms)[1] : null) // Envoie au front si l'user a créé et rejoint la room ou non
        })

        socket.on('getPlayer', (playerName) => {
            playerName = socket.room;
        })
    })
}

