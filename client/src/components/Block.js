import React from 'react'

export const colorTab = ([
	'red',
	'blue',
	'yellow',
	'purple',
	'salmon',
	'cyan',
	'green',
	'#ffe5f6'
])

const blockStyle = ({
	backgroundColor: 'pink',
	border: '0.5px solid #3331'
})

const shadowBlockStyle = ({
	backgroundColor: 'pink',
})

export const Block = ({empty, color, transparent, blockSize, shadow})=>{
	return (
		<div
			style={!!empty
				? shadow
					? {...shadowBlockStyle, width: `${blockSize}px`, height: `${blockSize}px`}
					: {...blockStyle,  width: `${blockSize}px`, height: `${blockSize}px`}
				: transparent
					? {...blockStyle, width: `${blockSize}px`, height: `${blockSize}px`, border: '0.5px solid transparent', backgroundColor: 'transparent'}
					: shadow
						? {...shadowBlockStyle, width: `${blockSize}px`, height: `${blockSize}px`, backgroundColor: 'yellow'}
						: {...blockStyle, width: `${blockSize}px`, height: `${blockSize}px`, border: '0.5px solid white', backgroundColor: `${color}`}
			}
		/>
	)
}