import io from "socket.io-client"
import { createContext } from "react"

const SocketContext = createContext({  
  queueLength: 0,  
  positionInLine: 0,
})

export default SocketContext

export const socket = io.connect('http://localhost:3000')