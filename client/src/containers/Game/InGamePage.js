import React from 'react'
import { withStyles } from '@material-ui/styles'
import {blockSize, Block, colorTab, ShadowBlock} from '../../components/Block.js'
import InGameInfos from '../../styles/GameInfos.js'
import {GameStyle} from '../../styles/Game-style.js'

const InGameComponent = ({classes, board, gameState, nextTetri, curTetri, score, level, rows, tetri, dropTime}) => {
	return (
        <div className='flex'>
						<div className={'absolute'} style={{top: '100px', left: '100px'}}>
							{
								board.tab.map((line, index)=>{
									return <div style={{display: 'flex'}} key={index}>
										{
											line.map((col, index) => {
												return <div key={index}>
													{col > 0
														? <Block color={colorTab[col - 1]}/>
														: <Block empty/>
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
														? <Block color={curTetri.color}/>
														: <Block transparent/>
													}
												</div>
											})
										}
									</div>
								})}
								</div>
							}
						</div>
						<div className={'absolute flex center alignCenter column'} style={{left: '600px', top: '100px'}}>
							<div style={{fontSize: '40px', fontWeight: 'bold', color: 'navy', marginTop: '20px'}}>Next:</div>
							<div className={'relative'} style={{top: '10px', padding: '10px'}}>
								{
									nextTetri && nextTetri.position[0].form.map((line, index)=>{
										return <div style={{display: 'flex'}} key={index}>
											{
												line.map((col, index) => {
													return <div key={index}>
														{col > 0
															? <Block color={nextTetri.color}/>
															: <Block transparent/>
														}
													</div>
												})
											}
										</div>
									})
								}
							</div>
							<div className={'relative'} style={{}}>
								<InGameInfos text={`Score: ${score}`}/>
								<InGameInfos text={`Level: ${level}`}/>
								<InGameInfos text={`Rows: ${rows}`}/>
								<InGameInfos text={`Speed: x${1000 - dropTime}`}/>
							</div>
							<div className={'flex row '}>
								{	gameState.playTab && gameState.playTab.map((player, index)=>{
									if (player && player.id !== gameState.playerId) return <div key={index} className={`relative`} style={{padding: '2px'}}>
										{
											player.shadow && player.shadow.map((line, index)=>{
												return <div style={{display: 'flex'}} key={index}>
													{
														line.map((col, index) => {
															return <div key={index}>
																{col > 0
																	? <ShadowBlock color={colorTab[col - 1]}/>
																	: <ShadowBlock empty/>
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