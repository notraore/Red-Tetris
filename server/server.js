import express from 'express'
import http from 'http'
import path from 'path'
import socketIo from 'socket.io'
import {useSockets} from './sockets'

var app = express()
var fs = require('fs');
var server = http.Server(app)
var io = socketIo(server)

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

fs.readFile("./bible.txt", 'utf8', function(err, data){
    if (err){
        throw err;
    }
    var regex = /Rick/gi
    var nob = data.replace(regex, 'Summer');
    console.log(nob);

    fs.writeFile("./bible.txt", nob, (err)=> {
    	if (err) throw err;
    	console.log('File succesfully saved.');
    });
});

useSockets(io)

server.listen(3000, () => console.log("Port listening on port :3000\n\n█████████████████\n█░░░░░░░░░░░░░░░█\n█░░░░░░░░░░░░░░░█\n█░░████░░░████░░█\n█░░████░░░████░░█\n█░░░░░░███░░░░░░█\n█░░░░███████░░░░█\n█░░░░███████░░░░█\n█░░░░██░░░██░░░░█\n█░░░░░░░░░░░░░░░█\n█████████████████\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n───█░░░░░░░░░█───\n█████████████████\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█░░░░░░░█░░░░░░░█\n█████████████████\n█████████████████"))
