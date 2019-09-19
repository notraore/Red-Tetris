export const initialUserState = {
    username: '',
    id: null,
    playing: false
}

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'UPDATE_INFOS':
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                playing: action.payload.playing,
            }
        case 'CHANGE_GAME_STATUS':
            return {
                ...state,
                playing: state.playing ? false : true
            }
        default:
            return state
    }
}