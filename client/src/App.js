import React, { useState, Fragment } from 'react'
import Menu from './containers/Menu' 
import Game from './components/Game';

export const App = () => {
    const [optionSelected, setOption] = useState('menu')

    const onOptionChange = (value) => {
        setOption(value)
    }
    
    const returnMenu = () =>{
        setOption('menu')
    }

    const renderOption = (option) => {
        switch (option) {
            case 'game':
                return <Game returnMenu={returnMenu}/>
            case 'menu':
                return <Menu onOptionChange={onOptionChange}/>
            default:
                return null
        }
    }
    
    return(
        <Fragment>
            {renderOption(optionSelected)}
        </Fragment>
    )
}