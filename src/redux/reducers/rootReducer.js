import { combineReducers } from "redux"
// importing reducers
import { searchReducer } from "./searchReducer/searchReducer"
import { favoritesReducer } from "./favoriteReducer/favoritesReducer"
import { planReducer } from "./planReducer/planReducer"
import { readingListReducer } from "./readingListReducer/readingListReducer"
import { finishedReadingReducer } from "./finishedReducer/finishedReadingReducer"


export default combineReducers({
    searchReducer,
    favoritesReducer,
    planReducer,
    readingListReducer,
    finishedReadingReducer
})