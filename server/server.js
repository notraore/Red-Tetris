import express from 'express'
import http from 'http'
import path from 'path'
import socketIo from 'socket.io'

var app = express()
var server = http.Server(app)
var io = socketIo(server)

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

io.on('connection', (socket)=>{
	console.log('CONNECTE A SOCKET IO ! id User (socket): ', socket.id)
	socket.on('join room', (roomName, res) => {
		var usersInRoom = io.sockets.adapter.rooms[roomName]
		var canJoinRoom = typeof usersInRoom === 'undefined' || usersInRoom.length < 2

		if (typeof usersInRoom !== 'undefined') console.log(`gens dans la room ${roomName}:`, usersInRoom.length)
		if (canJoinRoom){ // si la room est pas full join la room
			console.log(`Room pas full !\nCONNECTION A LA ROOM "${roomName}", id:`, socket.id)
			socket.join(roomName, ()=>{
				console.log("CONNEXION A LA ROOM ETABLIE: mon id:", socket.id)
			})
		} else {
			if (socket.rooms.hasOwnProperty(roomName)){ // si l'user est deja dans la room
				console.log(`Jsuis deja dans cette room "${roomName}" BOULET`)
			} else { // si la room est full
				console.log(`JE PEUX PAS ME CONNECTER LA ROOM "${roomName}" EST FULL: mon id:`, socket.id)
			}
		}
		res(canJoinRoom, roomName) // Envoie au front si l'user a rejoint la room ou non
	})
})

server.listen(3000, () => console.log("Port listening on port :3000\n\n█████████████████\n█░░░░░░░░░░░░░░░█\n█░░░░░░░░░░░░░░░█\n█░░████░░░████░░█\n█░░████░░░████░░█\n█░░░░░░███░░░░░░█\n█░░░░███████░░░░█\n█░░░░███████░░░░█\n█░░░░██░░░██░░░░█\n█░░░░░░░░░░░░░░░█\n█████████████████\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n█████████████████\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█████████████████\n█████████████████"))
