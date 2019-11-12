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
export const RETURN_MENU = 'RETURN_MENU'
export const SOLO_UPDATE = 'SOLO_UPDATE'
export const BECOME_HOST = 'BECOME_HOST'

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
	playing: false,
	pieces: null
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
		case BECOME_HOST:
			return {
				...state,
				isHost: true
			}
		case ROOM_JOINED:
			return {
				...state,
				room: action.room,
				playing: action.playing,
				isInGame: true,
				isHost: action.isHost,
				playTab: action.playerTab,
				playing: action.gameStarted ? false : true,
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
			return {
				...state,
				playTab: action.playerTab,
				endOfGame: true,
				winScore: action.winScore
			}
		case ROOM_UPDATE:
			return {
				...state,
				playTab: action.playerTab,
				gameStarted: typeof action.isHost === 'boolean' ? action.gameStarted : state.gameStarted,
				isHost: typeof action.isHost === 'boolean' ? action.isHost : state.isHost,
				pieces: action.pieces ? action.pieces : state.pieces,
			}
		case START_GAME:
		console.log('start game')
			return {
				...state,
				endOfGame: false,
				gameStarted: true,
				playing: true,
				isInGame: true,
				pieces: action.pieces,
				winScore: action.winScore,
				playTab: action.playerTab,
				nbPlayer: action.nbPlayer
			}
		case SOLO_UPDATE:
			return {
				...state,
				pieces: state.pieces.concat(action.newPieces)
			}
		case RETURN_MENU:
			return {
				...state,
				isInGame: false,
				isWaiting: false,
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