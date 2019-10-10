import { socket } from "./index"
import { historyPush } from "../history"

export const leaveRoom = () => {
  socket.emit('leave room')
}

export const checkGameInfos = (room, userName) => {
  socket.emit('is in room', room, (isInRoom, name)=>{
    if (!isInRoom){
      alert('Lien invalide, retour au menu')
      historyPush('/') 
    }
  })
}

export const joinRoom = (name) => {
  socket.emit('is in room', name, (isInRoom, name)=>{
    if (!isInRoom){
      socket.emit('join room', name, (hasJoin, name)=>{
        if (!hasJoin){
          console.log(`ROOM "${name}" FULL OU PAS EXISTANTE!`)
        } else {
          console.log(`ROOM "${name}" BIEN REJOINTE`)
        }
      })
    } else {
      console.log('DEJA DANS LA ROOM BOULET')
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