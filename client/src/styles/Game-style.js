const blockSize = 40;

export const GameStyle = () => ({
gameInfo: {
    margin: '10px 0px',
    alignItem: 'center',
    // fontWeight: 'bold',
    fontSize: '20px',
    color: 'pink',
    border: '2px solid pink',
    borderRadius: '10px',
    padding: '5px 0px',
    width: '80%'
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
        minHeight: '600px',
        padding: '20px 0px',
        width: '650px',
        borderRadius: '10px',
        backgroundColor: 'pink'
    },
    restartLabel: {
        fontSize: '50px',
        fontWeight: 'bold',
        color: 'white',
        padding: '10px',
        cursor: 'pointer',
        '&:hover': {
            color: 'salmon'
        }
    },
    input:{
        height: '45px',
        width: '250px',
        fontSize: '28px',
        textAlign: 'center',
        backgroundColor: 'rgb(47, 49, 64)',
        border: '3px solid rgb(71, 72, 99)',
        color: 'white',
        fontFamily: 'Orbitron, sans-serif',
        '&:focus': {
          outline: 'none'
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
        width: '100%',
        fontSize: '20px',
        color: 'white',
        backgroundColor: 'pink',
        border: '2px solid pink',
        borderRadius: '10px',
        padding: '10px 0px',
        cursor: 'pointer',
        margin: 5,
        marginLeft: 0,
        '&:hover': {
            backgroundColor: 'inherit',
            color: 'pink'
        }
    }
})