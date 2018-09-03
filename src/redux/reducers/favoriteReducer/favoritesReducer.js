const initialState = {
    myFavoritesBooks: []
}

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_FAVORITES":
            return { ...state, myFavoritesBooks: [...state.myFavoritesBooks, action.payload]}
        case "REMOVE_FROM_FAVORITES": 
            return {...state, myFavoritesBooks: action.payload}
        default: 
            return state
    }
}