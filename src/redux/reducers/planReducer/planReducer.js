const initialState = {
    booksPlan: []
}

export const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_PLAN":
            return { ...state, booksPlan: [...state.booksPlan, action.payload] }
        case "REMOVE_FROM_PLAN":
            return { ...state, booksPlan: action.payload }
        default:
            return state
    }
}