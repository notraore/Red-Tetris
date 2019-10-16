import React from 'react'
export const blockSize = 40
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
	width: `${blockSize}px`,
	height: `${blockSize}px`,
	border: '0.5px solid #3331'
})

const shadowBlockStyle = ({
	backgroundColor: 'pink',
	width: `${shadowBlockSize}px`,
	height: `${shadowBlockSize}px`,
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

export const ShadowBlock = ({empty, color, transparent})=>{
	return (
		<div
			style={!!empty
				? {...shadowBlockStyle}
				: transparent
					? {...shadowBlockStyle, border: '0.5px solid transparent', backgroundColor: 'transparent'}
					: {...shadowBlockStyle, border: '0.5px solid white', backgroundColor: `${color}`}
			}
		/>
	)
}