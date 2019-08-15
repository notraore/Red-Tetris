import React from 'react'
import {styles} from '../styles/Menu-styles.js'
import { withStyles }  from '@material-ui/styles'

const SoloComponent = ({ classes, selected }) => {
    return (
        <div className={`flex center alignCenter column`} style={selected === 1 ? {display: 'flex'} : {display: 'none'}}>
            <p className={classes.optionLabel}>
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
              Default name
            </p>
            <input/>
          </div>
    )
}

const JoinComponent = ({ classes, selected }) => {
    return (
        <div className={`flex center alignCenter column`} style={selected === 2 ? {display: 'flex'} : {display: 'none'}}>
            <p>
              Enter existing room name
            </p>
            <input/>
            <p className={classes.optionLabel}>
              Join
            </p>
          </div>
    )
}

export const Solo = withStyles(styles)(SoloComponent)
export const Create = withStyles(styles)(CreateComponent)
export const Settings = withStyles(styles)(SettingsComponent)
export const Join = withStyles(styles)(JoinComponent)
