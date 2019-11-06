export const GET_USER_INFOS = 'GET_USER_INFOS'
export const SET_USERNAME = 'SET_USERNAME'
export const ROOM_LEAVED = 'ROOM_LEAVED'
export const ROOM_JOINED = 'ROOM_JOINED'
export const ROOM_UPDATE = 'ROOM_UPDATE'
export const START_GAME = 'START_GAME'
export const END_GAME = 'END_GAME'
export const UPDATE_OPPONENTS = 'UPDATE_OPPONENTS'
export const USER_CONNECTED = 'USER_CONNECTED'
export const PLAYER_WIN = 'PLAYER_WIN'
export const RETURN_LOBBY = 'RETURN_LOBBY'

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
	endOfGame: false,
	winScore: null,

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
				isHost: action.isHost,
				playTab: action.playerTab,
				gameStarted: typeof action.isHost === 'boolean' ? action.gameStarted : state.gameStarted,
				isWaiting: true
			}
		case ROOM_LEAVED:
			return {
				...state,
				room: null,
				isInGame: false,
				isHost: false
			}
		case PLAYER_WIN:
		console.log('reducer player win', action)
			return {
				...state,
				playTab: action.playerTab,
				endOfGame: true,
				winScore: action.winScore
			}
		case ROOM_UPDATE:
		console.log('ROOM UPDATE!!: ', action, 'isHost: ', state.isHost)
			return {
				...state,
				playTab: action.playerTab,
				gameStarted: typeof action.isHost === 'boolean' ? action.gameStarted : state.gameStarted,
				isHost: typeof action.isHost === 'boolean' ? action.isHost : state.isHost 
			}
		case START_GAME:
			console.log('reducer Start game')
			return {
				...state,
				endOfGame: false,
				gameStarted: true,
				winScore: action.winScore,
				playTab: action.playerTab,
				nbPlayer: action.nbPlayer
			}
		case RETURN_LOBBY:
			return {
				...state,
				isInGame: true,
				isWaiting: true,
				gameStarted: false
			}
		case END_GAME:
			return {
				...state,
				gameStarted: true,
				playTab: action.playerTab,
				isWaiting: true
			}
		default:
			return state
	}
}