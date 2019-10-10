export const UPDATE_GAME = 'UPDATE_GAME'

export const initialState = {
	room: null,
	player: null,
	playerId: null,
	opponents: null,
	isInGame: false,
	isHost: false
}

export const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_GAME:
			return {
				...state,
				room: action.payload.room,
				player: action.payload.player,
				opponents: action.payload.opponents,
				playerId: action.payload.playerId,
				isInGame: action.payload.isInGame,
				isHost: action.payload.isHost
			}
		default:
			return state
	}
}