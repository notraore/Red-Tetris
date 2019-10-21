import React from 'react'
export const blockSize = window.innerHeight / 25
export const shadowBlockSize = 10

export const colorTab = ([
	'red',
	'blue',
	'yellow',
	'purple',
	'salmon',
	'cyan',
	'green'
])

const blockStyle = ({
	backgroundColor: 'pink',
	border: '0.5px solid #3331'
})

export const Block = ({empty, color, transparent, blockSize})=>{
	return (
		<div
			style={!!empty
				? {...blockStyle,  width: `${blockSize}px`, height: `${blockSize}px`}
				: transparent
					? {...blockStyle, width: `${blockSize}px`, height: `${blockSize}px`, border: '0.5px solid transparent', backgroundColor: 'transparent'}
					: {...blockStyle, width: `${blockSize}px`, height: `${blockSize}px`, border: '0.5px solid white', backgroundColor: `${color}`}
			}
		/>
	)
}