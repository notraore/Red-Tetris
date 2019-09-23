import { socket } from "./index"
import { historyPush } from "../history";

export const addClientToQueue = () => {
  socket.emit('addClientIdToQueue');
}

export const getQueueLength = () => {
  socket.emit('queueLengthToSocket');
}

export const removeUserFromQueue = () => {
  socket.emit('removeUserFromQueue');
}

export const isInGame = () => {
  socket.emit('is in game', (isInGame)=>{
    if (isInGame !== null){
      console.log('JEU DEJA EN COURS: ', isInGame, socket.id)
      historyPush(`/multi/${isInGame}/${socket.id}`)
    } else {
      console.log('pas de jeu en cours')
    }
  })
}

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

export const getPlayerName = (playerName) => {
  socket.emit('getPlayer', playerName, (playerName) => {
    console.log(`Welcome "${playerName}" cfer`);
  })
}

export const getAllRooms = (rooms) => {
  socket.emit('getAllRooms');
  socket.on('allRooms')
  // console.log(f_room);
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