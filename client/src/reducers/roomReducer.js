export const initialRoomState = {
    name: null,
    players: null,
    hoster: null,
    full: false
}

export const roomReducer = (state = initialRoomState, action) => {
    switch (action.type) {
        case 'UPDATE_ROOM_INFOS':
            return {
                ...state,
                name: action.payload.name,
                players: action.payload.players,
                hoster: action.payload.players,
                full: action.payload.full
            }
        default:
            return state
    }
}