
const BASE_URL = "https://www.googleapis.com/books/v1/volumes"

export const searchBooks = async (query) => {
    let books = await fetch(`${BASE_URL}?q=${query}&maxResults=40`)
        .then(res => res.json())
        .catch(err => console.log(err))

    return await books
}

export const saveState= (state) => {
    try {
        const stringifiedState = JSON.stringify(state)
        localStorage.setItem("booksState", stringifiedState)
    } catch  (err) {
        return undefined
    }
}

export const loadState= () => {
    try {
        const state = localStorage.getItem("booksState")
        if (state === null) {
            return {}
        }
        return JSON.parse(state)
    } catch (err) {
        return undefined
    }
}