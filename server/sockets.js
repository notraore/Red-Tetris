export const useSockets = (io) => {
    io.on('connection', (socket)=>{
        
        socket.on('get data', ()=>{
					var usersRooms = socket.rooms
					var userData = {
						id: socket.id,
						username: `PLAYER`,
						playing: Object.keys(usersRooms).length > 1
					}
					socket.emit('receive data', userData)
        })

        socket.on('getAllRooms', () => {
            var allRooms = io.sockets.adapter.rooms;
            if (allRooms)
            {
                console.log(allRooms);
            }
            socket.emit('allRooms', io.sockets.adapter.rooms);
        })

        console.log('\x1b[36m%s\x1b[0m', 'CONNECTE A SOCKET IO !\n id User (socket): ', "\x1b[31m", socket.id)
        socket.on('join room', (roomName, res) => {
            var usersInRoom = io.sockets.adapter.rooms[roomName]
            var canJoinRoom = !(typeof usersInRoom === 'undefined') && usersInRoom.length < 2
    
            if (typeof usersInRoom !== 'undefined') console.log(`gens dans la room ${roomName}:`, usersInRoom.length)
            
            if (canJoinRoom && !socket.rooms.hasOwnProperty(roomName)){ // si la room est pas full join la room
                console.log(`Room pas full !\nCONNECTION A LA ROOM "${roomName}", id:`, socket.id)
                socket.join(roomName, ()=>{
                    console.log("CONNEXION A LA ROOM ETABLIE: mon id:", socket.id)
                })
            } else {
                if (socket.rooms.hasOwnProperty(roomName)){ // si l'user est deja dans la room
                    console.log(`Jsuis deja dans cette room "${roomName}" BOULET`)
                    canJoinRoom = false
                } else { // si la room est full
                    console.log(`JE PEUX PAS ME CONNECTER LA ROOM "${roomName}" EST FULL OU N'EXISTE PAS: mon id:`, socket.id)
                }
            }
            res(canJoinRoom, roomName) // Envoie au front si l'user a rejoint la room ou non
        })
    
        socket.on('create room', (roomName, res) => {
            var usersInRoom = io.sockets.adapter.rooms[roomName]
            var canCreateRoom = typeof usersInRoom === 'undefined' || usersInRoom.length === 0
    
            if (canCreateRoom){
                console.log(canCreateRoom)
                console.log(`Room pas existante !\nCREATION DE LA ROOM "${roomName}", id:`, socket.id)
                socket.join(roomName, ()=>{
                    console.log("CONNEXION A LA ROOM ETABLIE: mon id:", socket.id)
                    console.log("Waiting for someone to join");
                })
            } else {
                console.log(`ROOM "${roomName}" DEJA EXISTANTE: mon id:`, socket.id)
            }
            res(canCreateRoom, roomName) // Envoie au front si l'user a créé et rejoint la room ou non
        })
    
        socket.on('is in room', (roomName, res) => {
            res(socket.rooms.hasOwnProperty(roomName), roomName) // Envoie au front si l'user est deja dans la room
        })
    
        socket.on('leave room', () => {
            var usersRooms = socket.rooms
            var curRoom = Object.keys(usersRooms)[1] 
            socket.leave(curRoom)
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

