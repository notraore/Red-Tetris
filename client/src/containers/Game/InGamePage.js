import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/styles'
import {Block, colorTab} from '../../components/Block.js'
import {GameStyle} from '../../styles/Game-style.js'

const InGameComponent = ({classes, winHeight, winWidth, board, gameState, nextTetri, curTetri, score, level, rows, tetri, dropTime}) => {
	// var blockSize = Math.trunc(winHeight / 25)
	var smallSize = winWidth < 650 || winHeight < 800
	var blockSize = smallSize ? 30 : 40
	var shadowBlockSize = Math.trunc(winHeight / 80)

	useEffect(()=>{
		console.log('blockSize: ', blockSize)
	})
	
	return (
        <div className='flex row fullWidth fullHeight center spaceAround' style={{maxWidth: '800px'}}>
					<div className={'relative'} style={{top: '25px'}}>
						<div className={'relative'}>
							{
								board.tab.map((line, index)=>{
									return <div style={{display: 'flex'}} key={index}>
										{
											line.map((col, index) => {
												return <div key={index}>
													{col > 0
														? <Block  blockSize={blockSize} color={colorTab[col - 1]}/>
														: <Block  blockSize={blockSize} empty/>
													}
												</div>
											})
										}
									</div>
								})
							}
							{
								<div
									className={`absolute`}
									style={{
										top: `${blockSize * curTetri.y + curTetri.y}px`,
										left: `${blockSize * curTetri.x + curTetri.x}px`
									}}
								>
								{
									tetri.map((line, index)=>{
									return <div style={{display: 'flex'}} key={index}>
										{
											line.map((col, index) => {
												return <div key={index}>
													{col > 0
														? <Block blockSize={blockSize} color={curTetri.color}/>
														: <Block blockSize={blockSize} transparent/>
													}
												</div>
											})
										}
									</div>
								})}
								</div>
							}
						</div>
					</div>
						<div className={'relative flex column'}>
							<div style={{fontSize: '40px', fontWeight: 'bold', color: 'pink', marginTop: '20px'}}>Next:</div>
							<div className={'relative'} style={{top: '10px', padding: '10px'}}>
								{
									nextTetri && nextTetri.position[0].form.map((line, index)=>{
										return <div style={{display: 'flex'}} key={index}>
											{
												line.map((col, index) => {
													return <div key={index}>
														{col > 0
															? <Block blockSize={blockSize} color={nextTetri.color}/>
															: <Block blockSize={blockSize} transparent/>
														}
													</div>
												})
											}
										</div>
									})
								}
							</div>
							<div className={'relative'} style={{minWidth: '150px'}}>
								<div className={classes.gameInfo}>Score: {score}</div>
								<div className={classes.gameInfo}>Level: {level}</div>
								<div className={classes.gameInfo}>Rows: {rows}</div>
								<div className={classes.gameInfo}>Speed: x{1000 - dropTime}</div>
							</div>
							<div className={'flex row center'} style={{marginTop: '10px'}}>
								{	gameState.playTab && gameState.playTab.map((player, index)=>{
									if (player && player.id !== gameState.playerId) return <div key={index} className={`relative`} style={{padding: '2px'}}>
										{
											player.shadow && player.shadow.map((line, index)=>{
												return <div style={{display: 'flex'}} key={index}>
													{
														line.map((col, index) => {
															return <div key={index}>
																{col > 0
																	? <Block  blockSize={shadowBlockSize} color={colorTab[col - 1]}/>
																	: <Block  blockSize={shadowBlockSize} empty/>
																}
															</div>
														})
													}
												</div>
											})
										}
									</div>
									else return null
								})}
							</div>
						</div>
				</div>
	)
}

export default withStyles(GameStyle)(InGameComponent)