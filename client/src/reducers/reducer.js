export const UPDATE_GAME = 'UPDATE_GAME'
export const SET_USERNAME = 'SET_USERNAME'
export const ROOM_LEAVED = 'ROOM_LEAVED'
export const ROOM_JOINED = 'ROOM_JOINED'
export const ROOM_UPDATE = 'ROOM_UPDATE'

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
				room: action.room,
				player: action.player,
				opponents: action.opponents,
				playerId: action.playerId,
				isInGame: action.isInGame,
				isHost: action.isHost
			}
		case SET_USERNAME:
			return {
				...state,
				player: action.player
			}
		case ROOM_JOINED:
			return {
				...state,
				room: action.room,
				opponents: action.opponents,
				isInGame: true,
				isHost: action.host
			}
		case ROOM_LEAVED:
			return {
				...state,
				room: null,
				opponents: null,
				isInGame: false,
				isHost: false
			}
		case ROOM_UPDATE:
			return {
				...state,
				opponents: action.opponents,
			}
		default:
			return state
	}
}