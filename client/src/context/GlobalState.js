import React, {createContext, useContext, useReducer} from 'react'
import { gameReducer, initialState } from './reducer.js'

export const StateContext = createContext()
export const StateProvider = ({children}) =>(
  <StateContext.Provider value={useReducer(gameReducer, initialState)}>
    {children}
  </StateContext.Provider>
)
export const useStateValue = () => useContext(StateContext)