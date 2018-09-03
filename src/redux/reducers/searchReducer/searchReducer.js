
const initialState = {
    searchQuery: "",
    booksList: {}
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "BOOK_SEARCH_QUERY_CHANGE":
            return { ...state, searchQuery: action.payload }
        case "GET_ALL_BOOKS":
            return { ...state, booksList: {...action.payload} }
        default:
            return state
    }
}