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
      // backgroundImage: 'radial-gradient(circle, #920000, #7a0010, #600416, #460a17, #2b0c13, #21090f, #150509, #000000, #000000, #000000, #000000, #000000)',
      // backgroundImage: 'radial-gradient(circle, #720f33, #651a3f, #562346, #462948, #382c45, #32293d, #2c2534, #26222c, #201b21, #191418, #100b0e, #000000)',
      // backgroundImage: 'radial-gradient(circle, #000000, #080305, #0e060b, #110912, #130d17, #18131c, #1d1821, #221d26, #2d262c, #362f32, #3f393a, #474343)',
      // backgroundImage: 'radial-gradient(circle, #000000, #0e0507, #170a0e, #1e0f12, #251216, #39151c, #4e1621, #631625, #8b0f28, #b30125, #da001c, #ff0000)',
      // backgroundImage: 'radial-gradient(circle, #ffffff, #cacaca, #979797, #676767, #3b3b3b, #292929, #181818, #000000, #000000, #000000, #000000, #000000)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white',
      animation: 'gradientBackground 20s infinite',
      backgroundSize: '100% 100%',
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