import { socket } from "./index"

export const addClientToQueue = () => {
  socket.emit('addClientIdToQueue');
}

export const getQueueLength = () => {
  socket.emit('queueLengthToSocket');
}

export const removeUserFromQueue = () => {
  socket.emit('removeUserFromQueue');
}

export const joinRoom = (name) => {
  socket.emit('join room', name, (hasJoin, name)=>{
    if (!hasJoin){
      console.log(`ROOM "${name}" FULL ! Pas rejointe`)
    } else {
      console.log(`ROOM "${name}" BIEN REJOINTE`)
    }
  })
}