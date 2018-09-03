import React, { Component } from "react"
import { connect } from "react-redux"
import store from "../redux/store/store"
import { removeFromFavoritesAction } from "../redux/actions/favoritesActions"
import { BookItem } from "./BookItem"

class MyFavorites extends Component {

    handleRemoveFromFavorite = (bookId) => {
        const favBooks = this.props.myFavoritesBooks
        let favoriteBooks = favBooks.filter(book => book.id !== bookId)
        this.props.onRemoveFromFavorites(favoriteBooks)
    }

    favoriteBooksList = () => {
        const favBooks = this.props.myFavoritesBooks
        if (favBooks) {
            const books = favBooks.map(book => {
                const { previewLink } = book.volumeInfo
                
                return (
                    <div key={book.id} className="book-item">
                        <BookItem book={book} />
                        <div className="buttons-div">
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.handleRemoveFromFavorite(book.id)}> Remove </button>
                            <a href={previewLink} className="btn btn-primary btn-sm"> Preview book </a>
                        </div>
                    </div>
                )
            })
            return books
        }
    }

    render() {
        return (
            <div className="books-list">
                {this.favoriteBooksList()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.favoritesReducer
})

const mapDispatchToProps = () => ({
    onRemoveFromFavorites: val => store.dispatch(removeFromFavoritesAction(val)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites)