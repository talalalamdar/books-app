const initialState = {
    myFavoritesBooks: []
}

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES":
            return { ...state, myFavoritesBooks: [...state.myFavoritesBooks, action.payload]}
        case "REMOVE_FROM_FAVORITES": 
            let filteredFavorites = [...state.myFavoritesBooks].filter(book => book.id !== action.payload.id)
            return {...state, myFavoritesBooks: [...filteredFavorites]}
        default: 
            return state
    }
}