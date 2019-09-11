import React from 'react'
export const blockSize = 40

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
	width: `${blockSize}px`,
	height: `${blockSize}px`,
	border: '0.5px solid #3331'
})

export const Block = ({empty, color, transparent})=>{
	return (
		<div
			style={!!empty
				? {...blockStyle}
				: transparent
					? {...blockStyle, border: '0.5px solid transparent', backgroundColor: 'transparent'}
					: {...blockStyle, border: '0.5px solid white', backgroundColor: `${color}`}
			}
		/>
	)
}