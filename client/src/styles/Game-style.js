const blockSize = 40
export const GameStyle = () => ({
    gameOverContainer: {
        height: '500px',
        width: '500px',
        backgroundColor: 'pink'
    },
    scoreLabel: {
        fontSize: '40px',
        fontWeight: 'bold',
        color: 'pink',
        marginTop: '20px'
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
    }
})