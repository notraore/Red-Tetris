import _ from 'lodash'

export let colorArray = [
    'rgb(235, 40, 26)',
    'rgb(235, 120, 26)',
    'rgb(235, 221, 26)',
    'rgb(117, 235, 26)',
    'rgb(26, 218, 235)',
    'rgb(26, 68, 235)',
    'rgb(134, 26, 235)',
    'rgb(235, 26, 183)',
  ]

export const styles = ({
    container: {
      backgroundColor: 'rgb(33, 35, 46)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      animation: 'gradientBackground 20s infinite',
      backgroundSize: '100% 100%',
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
    centerSubContainer: {
      margin: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '50px'
    },
    optionsContainer: {
      display: 'flex',
      width: '600px'
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
      width: '100%',
      maxWidth: '180px',
      height: '120px'
    },
    optionLabel: {
      color: 'white',
      fontSize: '27px',
      fontWeight: 'bold',
      cursor: 'pointer',
      '&:hover': {
        textShadow: '0 0 10px #FFFFFF',
      }
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
      textShadow: '0 0 5px #FFFFFF',
      animation: 'animate 3s infinite',
      fontWeight: 'bold'
    },
    selectedContainer: {
      // background: colorArray[_.random(0, 7)],
      // border: '10px solid rgb(47, 49, 64)',
      // height: '500px',
      // width: '100%',
      position: 'relative',
      animation: 'selectOption 1s ease'
    },
    chosen: {
      width: '100%',
      height: '300px',
      border: '10px solid rgb(47, 49, 64)',
      backgroundColor: 'rgb(30, 32, 43)',
      position: 'relative',
      animation: 'secondMenu 0.5s ease'
    }
  })