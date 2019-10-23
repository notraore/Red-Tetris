export const GET_USER_INFOS = 'GET_USER_INFOS'
export const SET_USERNAME = 'SET_USERNAME'
export const ROOM_LEAVED = 'ROOM_LEAVED'
export const ROOM_JOINED = 'ROOM_JOINED'
export const ROOM_UPDATE = 'ROOM_UPDATE'
export const START_GAME = 'START_GAME'
export const END_GAME = 'END_GAME'
export const UPDATE_OPPONENTS = 'UPDATE_OPPONENTS'
export const USER_CONNECTED = 'USER_CONNECTED'

export const initialState = {
	room: null,
	nbPlayer: null,
	player: null,
	playerId: null,
	isInGame: false,
	gameStarted: false,
	isWaiting: false,
	isHost: false,
	playTab: [],
	shadows: null,
	onlineUsers: null,
}

export const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_INFOS:
			return {
				...state,
				player: action.player,
				playerId: action.playerId,
				isInGame: action.isInGame,
				onlineUsers: action.onlineUsers,
			}
		case USER_CONNECTED:
			return {
				...state,
				onlineUsers: action.onlineUsers,
			}
		case UPDATE_OPPONENTS:
			return {
				...state,
				playTab: action.playTab
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
				isInGame: true,
				isHost: action.player.isHost,
				playTab: action.playerTab,
				isWaiting: true
			}
		case ROOM_LEAVED:
			return {
				...state,
				room: null,
				isInGame: false,
				isHost: false
			}
		case ROOM_UPDATE:
		console.log('ROOM UPDATE!!: ', action)
			return {
				...state,
				playTab: action.playerTab,
				isHost: action.isHost
			}
		case START_GAME:
			return {
				...state,
				gameStarted: true,
				nbPlayer: action.nbPlayer
			}
		case END_GAME:
			return {
				...state,
				gameStarted: false,
				isWaiting: false
			}
		default:
			return state
	}
}