import React from 'react'
import cat from './cat.png'
import tetrimino from './blue-tetrimino.png'
import { withStyles }  from '@material-ui/styles'
import _ from 'lodash'
import './App.css'
import './styles/animation/text-animations.css'
import './styles/fonts.css'

let colorArray = [
  '#eb281a',
  '#eb781a',
  '#ebdd1a',
  '#75eb1a',
  '#1adaeb',
  '#1a44eb',
  '#861aeb',
  '#eb1ab7'
]


const styles = ({
  container: {
    backgroundColor: 'rgb(33, 35, 46)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
  centerSubContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '50px'
  },
  optionsContainer: {
    display: 'flex',
  },
  option: {
    padding: '10px 0px',
    cursor: 'pointer',
    border: '10px solid rgb(47, 49, 64)',
    background: colorArray[_.random(0, 7)],
    '&:hover': {
      color: 'white',
      border: '10px solid white',
      textShadow: '0 0 10px #FFFFFF',
      boxShadow: `inset 0 0 30px white, 0 0 15px white`,
      transitionDuration: '0.5s'
    },
    textTransform: 'uppercase',
    transitionDuration: '1s',
    width: '180px',
    height: '120px'
  },
  optionLabel: {
    color: 'white',
    fontSize: '27px',
    fontWeight: 'bold'
  },
  redLabel: {
    cursor: 'default',
    textTransform: 'uppercase',
    fontSize: '45px',
    WebkitTextFillColor: 'transparent',
    background: `-webkit-linear-gradient(#eee, red)`,
    WebkitBackgroundClip: 'text',
  },
  tetrisLabel: {
    textTransform: 'uppercase',
    cursor: 'default',
    paddingLeft: '5px',
    fontSize: '80px',
    WebkitTextFillColor: 'transparent',
    background: `-webkit-linear-gradient(#eee, grey)`,
    WebkitBackgroundClip: 'text',
    textShadow: '0 0 10px #FFFFFF',
    '&:hover': {
      textShadow: '0 0 20px #FFFFFF',
      transitionDuration: '0.5s'
    },
    transitionDuration: '0.5s',
    animation: 'animate 3s infinite',
  },
  test: {
    animation: 'animate 3s linear infinite',
    backgroundClip: 'text',
    textFillColor: 'rgba(255, 255, 255, 0)',
    position: 'relative',
    fontFamily: 'sans-serif',
    textTransform: 'uppercase',
    fontSize: '2em',
    letterSpacing: '4px',
    overflow: 'hidden',
    background: 'linear-gradient(90deg, #000, #fff, #000)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '80%',
    color: 'black'
  }
})

function shuffleColor(e) {
  e.target.style.background = colorArray[_.random(0, 7)]
}

function App(props) {
  const { classes } = props
  return (
    <div className="App" style={styles.container}>
      <div className={classes.centerSubContainer}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <p className={classes.redLabel}>
            Red
          </p>
          <p className={classes.tetrisLabel}>
            Tetris
          </p>
          <img src={tetrimino} style={{width: '100px', paddingLeft: '20px'}} alt="logo" />
        </div>
        <div className={'flex column center alignCenter'}>
          <div className={`${classes.optionsContainer}`}>
            <div
              className={`flex center alignCenter ${classes.option}`}
              onMouseEnter={(e)=>{shuffleColor(e)}}
            >
              <p className={classes.optionLabel}>
                Solo
              </p>
            </div>
            <div
              className={`flex center alignCenter ${classes.option}`}
              onMouseEnter={(e)=>{shuffleColor(e)}}
            >
              <p className={classes.optionLabel}>
                Join
              </p>
            </div>
            <div
              className={`flex center alignCenter ${classes.option}`}
              onMouseEnter={(e)=>{shuffleColor(e)}}
            >
              <p className={classes.optionLabel}>
                Create
              </p>
            </div>
          </div>
          <div className={`${classes.optionsContainer}`}>
            <div
              className={`flex center alignCenter ${classes.option}`}
              onMouseEnter={(e)=>{shuffleColor(e)}}
            >
              <p className={classes.optionLabel}>
                Opt
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(App)
