import { socket } from "./index"

export const leaveRoom = () => {
  socket.emit('leave room')
}

export const joinRoom = (name) => {
  socket.emit('join room', name)
}

export const createRoom = (name) => {
  socket.emit('create room', name)
}

export const roomExist = (roomName) => {
  socket.emit('room exist', roomName, (exist)=>{
    if (exist === true) joinRoom(roomName)
    else createRoom(roomName)
  })
}

export const changeUsername = (newUsername) => {
  socket.emit('set username', newUsername)
}

export const sendMessage = (room, message) => {
  socket.emit('send message', room, message)
}