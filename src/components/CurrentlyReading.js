import React, { Component } from "react"
import { connect } from "react-redux"
import store from "../redux/store/store"
import { addToFavoritesAction } from "../redux/actions/favoritesActions"
import { removeFromReadingList } from "../redux/actions/readingListActions"
import { addToFinishedList } from "../redux/actions/finishedReadingActions";
import { BookItem } from "./BookItem"

class CurrentlyReading extends Component {

    handleRemoveFromReadingList = (bookId) => {
        const readingListBooks = this.props.readingListReducer.books
        let filteredBooks = readingListBooks.filter(book => book.id !== bookId)
        this.props.onRemoveFromReadingList(filteredBooks)
    }

    handleAddToFinishedList = (book) => {
        this.props.onAddToFinishedList(book)
        this.handleRemoveFromReadingList(book.id)
    }

    handleAddToFavorite = (book) => {
        this.props.onAddToFavorites(book)
    }

    readingList = () => {
        const readingListBooks = this.props.readingListReducer.books
        const { myFavoritesBooks } = this.props.favoritesReducer

        if (readingListBooks) {
            const books = readingListBooks.map(book => {
                const { previewLink } = book.volumeInfo

                return (
                    <div key={book.id} className="book-item">
                        <BookItem book={book} />
                        <div className="buttons-div">
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.handleRemoveFromReadingList(book.id)}> Remove </button><br />
                            <button type="button" className="btn btn-success btn-sm" onClick={() => this.handleAddToFinishedList(book)}> Add to finished </button> <br />
                            {myFavoritesBooks.some(favBook => favBook.id === book.id) ?
                                < button type="button" className="btn btn-outline-warning btn-sm " disabled > One of my favorites </button>
                                : < button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleAddToFavorite(book)}> Add to my favorites</button>
                            }  <br />
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
                {this.readingList()}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
    onAddToFavorites: val => store.dispatch(addToFavoritesAction(val)),
    onRemoveFromReadingList: val => store.dispatch(removeFromReadingList(val)),
    onAddToFinishedList: val => store.dispatch(addToFinishedList(val))
})


export default connect(mapStateToProps, mapDispatchToProps)(CurrentlyReading)