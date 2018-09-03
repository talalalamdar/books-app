import React, { Component } from "react"
import { connect } from "react-redux"
import store from "../redux/store/store"
import { addToFavoritesAction } from "../redux/actions/favoritesActions"
import { removeFromFinishedList } from "../redux/actions/finishedReadingActions"
import { BookItem } from "./BookItem"

class FinishedPage extends Component {

    handleRemoveFromFinishedList = (bookId) => {
        const { finishedBooks } = this.props.finishedReadingReducer
        let filteredBooks = finishedBooks.filter(book => book.id !== bookId)
        this.props.onRemoveFromFinishedList(filteredBooks)
    }

    handleAddToFavorite = (book) => {
        this.props.onAddToFavorites(book)
    }

    finishedList = () => {
        const { finishedBooks } = this.props.finishedReadingReducer
        const { myFavoritesBooks } = this.props.favoritesReducer

        if (finishedBooks) {
            const books = finishedBooks.map(book => {
                const { previewLink } = book.volumeInfo

                return (
                    <div key={book.id} className="book-item">
                        <BookItem book={book} />
                        <div className="buttons-div">
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.handleRemoveFromFinishedList(book.id)}> Remove </button> <br />
                            {myFavoritesBooks.some(favBook => favBook.id === book.id) ?
                                < button type="button" className="btn btn-outline-warning btn-sm " disabled > One of my favorites </button>
                                : < button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleAddToFavorite(book)}> Add to my favorites </button>
                            } <br />
                            <a href={previewLink} className="btn btn-primary btn-sm">Preview book</a>
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
                {this.finishedList()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
    onAddToFavorites: val => store.dispatch(addToFavoritesAction(val)),
    onRemoveFromFinishedList: val => store.dispatch(removeFromFinishedList(val))
})


export default connect(mapStateToProps, mapDispatchToProps)(FinishedPage)