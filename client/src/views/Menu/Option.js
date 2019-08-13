import React from 'react'
import {styles} from './styles/Menu-styles.js'
import { withStyles }  from '@material-ui/styles'

const Option = (props) => {
  const { classes, select, num, shuffle, name, selected } = props
  const isSelected = selected > 0
  return (
      <div
        className={`flex center alignCenter ${classes.option}`}
        onMouseEnter={(e)=>{!isSelected && shuffle(e)}}
        // style={hid ? {display: 'none'} : null}
        onClick={(e)=>{
          // if (!isSelected) {
            select(num)
          //   let sel = e.target.className.includes('optionLabel')
          //     ? e.target.parentNode
          //     : e.target
          //   sel.style.position = 'absolute'
          //   sel.style.height = '500px'
          //   sel.style.maxWidth = '600px'
          //   sel.style.flexDirection = 'column'
          // }
        }}
      >
        <p className={classes.optionLabel}>
          {name}
        </p>
      </div>
  )
}

export default withStyles(styles)(Option)