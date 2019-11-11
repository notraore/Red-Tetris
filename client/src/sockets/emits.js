import { socket } from "./index"

export const leaveRoom = () => {
  socket.emit('leave room')
}

export const checkGameInfos = (room, userName) => {
  socket.emit('is in room', room, (isInRoom, name)=>{
    if (!isInRoom){
      alert('Lien invalide, retour au menu')
    }
  })
}

export const joinRoom = (name) => {
  console.log('dans JOIN ROOM: ', name)
  socket.emit('join room', name, (hasJoin, name)=>{
    if (!hasJoin){
      console.log(`ROOM "${name}" FULL OU PAS EXISTANTE!`)
    } else {
      console.log(`ROOM "${name}" BIEN REJOINTE`)
    }
  })
}

export const createRoom = (name) => {
  socket.emit('create room', name, (isCreated, name)=>{
    if (!isCreated){
      console.log(`ROOM "${name}" EXITSE DEJA ! Pas créée`)
    } else {
      console.log(`ROOM "${name}" BIEN CRÉÉE ET REJOINTE`)
    }
  })
}

export const roomExist = (roomName) => {
  socket.emit('room exist', roomName, (exist)=>{
    console.log('room exist', exist)
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