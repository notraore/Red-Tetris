import React, { useState } from 'react'

export const Game = () => {

	const [tetrimino, moveTetri] = useState({
		x: 3,
		y: 0,
		spacex: 0,
		spacey: 0,
		form: [
			[0,0,0,0],
			[1,1,1,1],
			[0,0,0,0],
			[0,0,0,0]
		]
	})

	let board = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0]
	]

	const blockStyle = ({
		// backgroundColor: 'blue',
		width: '40px',
		height: '40px',
		border: '1px solid grey'
	})

	const Block = ({empty})=>{
		return (
			<div
				style={!!empty ? {...blockStyle} : {...blockStyle, border: '1px solid black', backgroundColor: 'blue'}}
			/>
		)
	}

	const setPiece = (board, t) => {
		let tab = t.form
		tab.map((line, y)=>{
			line.map((col, x)=>{
				if (col === 1){
					board[y + t.y][x + t.x] = 1
				}
			})
		})
	}

	// setPiece(board, tetrimino)
	// setInterval(()=>{moveTetri((prev)=>{
	// 	return({...prev, y:prev.y++})
	// }), setPiece(board, tetrimino)}, 1000)


	return (
		<div>
			{
				board.map((line, index)=>{
					return <div style={{display: 'flex'}} key={index}>
						{
							line.map((col, index) => {
								return <div key={index}>
									{col > 0
										? <Block/>
										: <Block empty/>
									}
								</div>
							})
						}
					</div>
				})
			}
		</div>
	)
}