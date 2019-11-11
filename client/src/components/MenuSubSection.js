import React, { useState } from 'react'
import {styles} from '../styles/Menu-styles.js'
import { withStyles }  from '@material-ui/styles'
import { joinRoom } from '../sockets/emits.js'
import leader from '../datas/leaderboard.json';

const SoloComponent = ({ classes, selected, dispatch, pieces }) => {
    return (
        <div className={`flex center alignCenter column`} style={selected === 1 ? {display: 'flex'} : {display: 'none'}}>
            <p className={classes.optionLabel} onClick={()=>{dispatch({type: 'START_GAME', nbPlayer: 1, pieces: pieces})}}>
                Start
            </p>
        </div>
    )
}

const CreateComponent = ({ classes, selected, redirect}) => {
    const [roomName, handleChange] = useState('')

    return (
        <div className={`flex center alignCenter column`} style={selected === 3 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Enter a new room name
            </p>
            <input className={`${classes.input}`} onChange={(e)=>{
              handleChange(e.target.value)
            }}/>
            <p className={classes.optionLabel} onClick={()=>{
              if (roomName.length) redirect(roomName)
            }}>
              Create
            </p>
          </div>
    )
}

const SettingsComponent = ({ selected }) => {
    return (
        <div className={`flex center alignCenter column`} style={selected === 4 ? {display: 'flex'} : {display: 'none'}}>
            <p>Leaderboard:</p>
            {leader.map((leaderTab, id) => {
              return (
              <div key={id}>
                <p>Tableau sans TR ici </p>
              </div>)
            })}
        </div>
    )
}

const JoinComponent = ({ classes, selected, redirect }) => {
    const [roomName, handleChange] = useState('')

    return (
        <div className={`flex center alignCenter column`} style={selected === 2 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Enter existing room name
            </p>
            <input className={`${classes.input}`} onChange={(e)=>{
              handleChange(e.target.value)
            }}/>
            <p className={classes.optionLabel} onClick={()=>{
              if (roomName.length) redirect(roomName)
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
