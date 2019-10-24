const blockSize = 40
export const GameStyle = () => ({
    gameInfo: {
        margin: '10px 0px',
        alignItem: 'center',
        // fontWeight: 'bold',
        fontSize: '20px',
        color: 'pink',
        border: '2px solid pink',
        borderRadius: '10px',
        padding: '5px 0px'
		},
		finishGameTitle: {
			fontSize: '30px',
			color: 'white',
			fontWeight: 'bold',
			padding: '5px 0px',
			fontFamily: 'Orbitron, sans-serif',
		},
		finishGameInfo: {
			fontSize: '20px',
			color: 'white',
			padding: '5px 0px',
			fontFamily: 'Orbitron, sans-serif',
		},
    gameOverContainer: {
        height: '600px',
        width: '650px',
        borderRadius: '10px',
        backgroundColor: 'pink'
    },
    restartLabel: {
        fontSize: '50px',
        fontWeight: 'bold',
        color: 'white',
        padding: '10px',
        '&:hover': {
            color: 'salmon'
        }
    },
    restartButton: {
        cursor: 'pointer',
        '& :active': {
            transform: `scale(0.9, 0.9)`,
        }
    },
    blockStyle: {
        backgroundColor: 'pink',
        width: `${blockSize}px`,
        height: `${blockSize}px`,
        border: '1px solid pink'
    },
    button: {
        fontSize: '20px',
        color: 'white',
        backgroundColor: 'pink',
        border: '2px solid pink',
        borderRadius: '10px',
        padding: '10px 0px',
        cursor: 'pointer',
        margin: 5,
        '&:hover': {
            backgroundColor: 'inherit',
            color: 'pink'
        }
    }
})