import React, { useState, useEffect } from "react"
import SocketContext from "./index"
import { socketEvents } from "./events"
import { getQueueLength } from "./emits"
import { useCallback } from "react";

export const SocketProvider = (props) => {
  const [value, setValue] = useState({
    queueLength: 0,
    positionInLine: 0,
  })

	const initSockets = useCallback(({ setValue }) => {
		socketEvents({ setValue })
		// setValue    ^ is passed on to be used by socketEvents
		getQueueLength()
	}, [])

	useEffect(() => initSockets({ setValue }), [initSockets])

	return(
			<SocketContext.Provider value={ value }>
			{ props.children }
			</SocketContext.Provider>
	)
}