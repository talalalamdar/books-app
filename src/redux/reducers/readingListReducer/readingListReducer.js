const initialState = {
    books: []
}

export const readingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_READING_LIST":
            return { ...state, books: [...state.books, action.payload] }
        case "REMOVE_FROM_READING_LIST":
            return {...state, books: action.payload}
        default:
            return state
    }
}