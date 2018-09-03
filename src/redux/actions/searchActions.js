export const onSearchAction = (value) => dispatch => {
    dispatch({
        type: "BOOK_SEARCH_QUERY_CHANGE",
        payload: value
    })
}

export const listSearchedBooks = (value) => dispatch => {
    dispatch({
        type: "GET_ALL_BOOKS",
        payload: value
    })
}

