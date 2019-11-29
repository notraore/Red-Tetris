import React from 'react'
import {styles} from '../styles/Menu-styles.js'
import { withStyles }  from '@material-ui/styles'

export const OptionComponent = (props) => {
  const { classes, select, num, shuffle, name, selected } = props
  const isSelected = selected > 0
  return (
      <div
        className={`flex center alignCenter ${classes.option}`}
        onMouseEnter={ (e) => {!isSelected && shuffle(e)}}
        onClick={(e)=>{
            select(num)
        }}
      >
        <p className={classes.optionLabel}>
          {name}
        </p>
      </div>
  )
}

export const Option = withStyles(styles)(OptionComponent)
