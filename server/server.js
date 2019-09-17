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
	console.log('Je suis bien connectée !', socket.id, 'id des personnes connectées (dont moi)', Object.keys(io.sockets.sockets))
	// socket.on('test', (name, word, fn) => {
	// 	fn(name + ' says ' + word);
	// });
})

server.listen(3000, () => console.log("Port listening on port :3000\n\n█████████████████\n█░░░░░░░░░░░░░░░█\n█░░░░░░░░░░░░░░░█\n█░░████░░░████░░█\n█░░████░░░████░░█\n█░░░░░░███░░░░░░█\n█░░░░███████░░░░█\n█░░░░███████░░░░█\n█░░░░██░░░██░░░░█\n█░░░░░░░░░░░░░░░█\n█████████████████\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n█████████████████\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█████████████████\n█████████████████"))
// app.listen(3000, () => console.log("Port listening on port :3000\n\n█████████████████\n█░░░░░░░░░░░░░░░█\n█░░░░░░░░░░░░░░░█\n█░░████░░░████░░█\n█░░████░░░████░░█\n█░░░░░░███░░░░░░█\n█░░░░███████░░░░█\n█░░░░███████░░░░█\n█░░░░██░░░██░░░░█\n█░░░░░░░░░░░░░░░█\n█████████████████\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n█████████████████\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█████████████████\n█████████████████"));
// celui la ^ fonctionne pas avec socket io :(
