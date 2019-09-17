import React from 'react'

export const Multi = ({classes, returnMenu}) => {
    //1) prendre la room name de socket IO
    //2) rediriger vers le bon url avec le nom et la room name (stockée qqpart)

    return (
     <div className='fullWidth' style={{height: '100px', backgroundColor: 'red'}} onClick={()=>returnMenu()}/>
    )
}