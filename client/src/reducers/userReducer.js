export const initialUserState = {
    username: '',
    playing: false
}

export const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'CHANGE_USERNAME':
        console.log('dans reducer payload: ', action.payload)
            return {
                ...state,
                username: action.payload
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