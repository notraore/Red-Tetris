import React, { useState } from 'react'
import {styles} from '../styles/Menu-styles.js'
import { withStyles }  from '@material-ui/styles'
import { joinRoom } from '../sockets/emits.js'

const SoloComponent = ({ classes, selected, startGame }) => {
    return (
        <div className={`flex center alignCenter column`} style={selected === 1 ? {display: 'flex'} : {display: 'none'}}>
            <p className={classes.optionLabel} onClick={()=>{startGame('solo')}}>
                Start
            </p>
        </div>
    )
}

const CreateComponent = ({ classes, selected }) => {
    return (
        <div className={`flex center alignCenter column`} style={selected === 3 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Enter a new room name
            </p>
            <input/>
            <p className={classes.optionLabel}>
              Create
            </p>
          </div>
    )
}

const SettingsComponent = ({ selected }) => {
    return (
        <div className={`flex center alignCenter column`} style={selected === 4 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Leaderboard:
            </p>
            {/* <input/> */}
          </div>
    )
}

const JoinComponent = ({ classes, selected }) => {
    const [roomName, handleChange] = useState('')

    return (
        <div className={`flex center alignCenter column`} style={selected === 2 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Enter existing room name
            </p>
            <input onChange={(e)=>{
              handleChange(e.target.value)
            }}/>
            <p className={classes.optionLabel} onClick={()=>{
              if (roomName.length) joinRoom(roomName)
            }}>
              Join
            </p>
          </div>
    )
}

export const Solo = withStyles(styles)(SoloComponent)
export const Create = withStyles(styles)(CreateComponent)
export const Settings = withStyles(styles)(SettingsComponent)
export const Join = withStyles(styles)(JoinComponent)
