import React, { useState, Fragment } from 'react'
import Menu from './containers/Menu' 
import Solo from './components/Game'
import {Multi} from './containers/Multi'
import {SocketProvider} from './sockets/socketProvider'
import {connect} from './sockets/events'

connect()

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
			case 'solo':
				return <Solo returnMenu={returnMenu}/>
			case 'menu':
				return <Menu onOptionChange={onOptionChange}/>
			case 'create':
				return <Multi returnMenu={returnMenu}/>
			// case 'join':
			//  return <Menu onOptionChange={onOptionChange}/>
			default:
				return null
		}
	}
	
	return(
		<Fragment>
			<SocketProvider>
				{renderOption(optionSelected)}
			</SocketProvider>
		</Fragment>
	)
}