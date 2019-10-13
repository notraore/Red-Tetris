export const GET_USER_INFOS = 'GET_USER_INFOS'
export const SET_USERNAME = 'SET_USERNAME'
export const ROOM_LEAVED = 'ROOM_LEAVED'
export const ROOM_JOINED = 'ROOM_JOINED'
export const ROOM_UPDATE = 'ROOM_UPDATE'

export const initialState = {
	room: null,
	player: null,
	playerId: null,
	isInGame: false,
	isHost: false,
	playTab: []
}

export const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_INFOS:
			return {
				...state,
				player: action.player,
				playerId: action.playerId,
				isInGame: action.isInGame,
			}
		case SET_USERNAME:
			return {
				...state,
				player: action.player.username
			}
		case ROOM_JOINED:
			return {
				...state,
				room: action.room,
				isInGame: true,
				isHost: action.player.isHost,
				playTab: action.playerTab
			}
		case ROOM_LEAVED:
			return {
				...state,
				room: null,
				isInGame: false,
				isHost: false
			}
		case ROOM_UPDATE:
			return {
				...state,
				playTab: action.playerTab
			}
		default:
			return state
	}
}