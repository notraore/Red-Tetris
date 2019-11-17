import React from 'react'
import tetrimino from '../assets/blue-tetrimino.png'
import {styles} from '../styles/Menu-styles.js'
import { withStyles }  from '@material-ui/styles'

export const Title = (props) => {
  const { classes } = props
  return (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <p className={classes.redLabel}>
            Red
          </p>
          <p className={classes.tetrisLabel}>
            Tetris
          </p>
          <img src={tetrimino} style={{width: '100px', paddingLeft: '20px'}} alt="logo" />
        </div>
  )
}

export default withStyles(styles)(Title)