import React from 'react'
import { withStyles } from '@material-ui/styles'
import {GameStyle} from '../../styles/Game-style.js'
import GameOverInfos from '../../styles/GameOverInfos.js'

const FinishComponent = ({classes, level, score, rows, resetGame}) => {
	return (
		<div className='flex column center alignCenter' style={{height: '100hw'}}>
			<div className={`flex column center alignCenter ${classes.gameOverContainer}`}>
				<GameOverInfos text={`Sorry, you lose`} size={'1.0rem'}/>
				<GameOverInfos text={`Level: ${level}`} size={'1.3rem'}/>
				<GameOverInfos text={`Score: ${score}`} size={'1.3rem'}/>
				<GameOverInfos text={`Rows: ${rows}`} size={'1.3rem'}/>
				<div className={`flex column center alignCenter ${classes.restartButton}`}>
					<div className={classes.restartLabel} onClick={()=>{resetGame()}}>
						RESTART
					</div>
				</div>
			</div>
		</div>
	)
}

export default withStyles(GameStyle)(FinishComponent)