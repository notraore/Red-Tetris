import pieces from '../components/pieces.1.json'

export const initialTetriState = {
    listIndex: 0,
    name: 'I',
    x: 0,
    y: 0,
    leftSpace: 0,
    rightSpace: 0,
    downSpace: 0,
    rot: 0,
    form: [],
    color: ''
}

export const tetriReducer = (state = initialTetriState, action) => {
    switch (action.type) {
        case 'SET_TETRI':
            const tetri = action.payload
            console.log("dans reducer: ", tetri)
            return {
                name: tetri,
                x: 3,
                y: 0,
                leftSpace: pieces[tetri].position[0].leftSpace,
                rightSpace: pieces[tetri].position[0].rightSpace,
                downSpace: pieces[tetri].position[0].downSpace,
                rot: 0,
                form: pieces[tetri].position[0].form,
                color: pieces[tetri].color,
                listIndex: state.listIndex + 1,
            }
        case 'DOWN':
            return {
                ...state,
                y: state.y + 1
            }
        case 'LEFT':
            return {
                ...state,
                x: state.x -= 1,
                // leftSpace: state.leftSpace - 1,
                // rightSpace: state.rightSpace + 1
            }
        case 'RIGHT':
            return {
                ...state,
                x: state.x += 1,
                // leftSpace: state.leftSpace + 1,
                // rightSpace: state.rightSpace - 1
            }
        case 'ROTATION':
            return {
                ...state,
                rot: state.rot > 2 ? 0 : state.rot + 1,
                form: pieces[state.name][state.rot].form
                // form: pieces[state.name][state.rot > 3 ? 0 : state.rot + 1]
            }
        default:
            return state
    }
}

export const initialBoardState = {
    tab: [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ],
    tetriList: []
}

export const boardReducer = (state = initialBoardState, action) => {
    switch (action.type) {
        case 'UPDATE':
            console.log(list)
            const list = state.tetriList
            const tetri = action.payload.tetri
            return {
                ...state,
                tab: action.payload.tab,
                tetriList: list.length >= 1 ? list.concat(tetri) : list.push(tetri)
            }
        default:
            return state
    }
}