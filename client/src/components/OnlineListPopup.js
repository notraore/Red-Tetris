import React from 'react'
import { withStyles }  from '@material-ui/styles'

const styles = () => ({
    back:{
        backgroundColor: 'rgba(33,35,46,0.8)'
    },
    container: {
        width: '300px',
        minHeight: '200px',
        borderRadius: '20px',
        boxShadow: '4px 2px 19px 10px rgba(112,106,112,0.29)',
        backgroundColor: 'rgba(33,35,46,1)',
    },
    title: {
        fontSize: '30px',
        color: 'white',
        padding: 5
    },
    description: {
        fontSize: '18px',
        color: 'white',
        padding: 5
    },
    button: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(83,85,96,1)',
            color: 'rgba(43,45,56,1)'
        },
        width: '150px',
        height: '30px',
        borderRadius: '5px',
        backgroundColor: 'rgba(43,45,56,1)',
        color: 'white',
        marginTop: 10
    }
})

const Popup = ({classes, users, close}) => {
		console.log(users)
    return (
        <div style={{zIndex: 100}} className={`${classes.back} fullHeight absolute fullWidth flex center alignCenter`}>
            <div style={{padding: '10px'}} className={`flex center column  alignCenter ${classes.container}`}>
                {/* <div className={classes.title}>
                  Users Online
                </div> */}
                <div style={{minHeight: '100px', width: '200px'}} className={classes.description}>
									{users
										? Object.values(users).map((user, id)=>{
											return <div style={{position: 'relative', left: '20px'}} key={id} className='flex row alignCenter'>
													<div style={{color: 'green', padding: '0px 5px'}}>•</div>
													<div >{user}</div>
												</div>
										})
										: null
									}
                </div>
                <button className={`flex center alignCenter ${classes.button}`} onClick={()=>{close(false)}}>
                  OK
                </button>
            </div>
        </div>
    )
}

export default withStyles(styles)(Popup)