export const addToReadingList = (value) => dispatch => {
    dispatch({
        type: "ADD_TO_READING_LIST",
        payload: value
    })
}

export const removeFromReadingList = (value) => dispatch => {
    dispatch({
        type: "REMOVE_FROM_READING_LIST",
        payload: value
    })
}