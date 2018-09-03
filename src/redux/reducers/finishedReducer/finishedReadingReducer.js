const initialState = {
    finishedBooks: []
}

export const finishedReadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_FINISHED":
            return { ...state, finishedBooks: [...state.finishedBooks, action.payload] }
        case "REMOVE_FROM_FINISHED":
            return { ...state, finishedBooks: action.payload }
        default:
            return state
    }
}