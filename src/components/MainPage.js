import React, { Component } from "react"
import { searchBooks } from "../utils"
import Octicon, { Search } from '@githubprimer/octicons-react'
import store from "../redux/store/store"
import { BookItem } from "./BookItem"

// importing actions
import { onSearchAction, listSearchedBooks } from "../redux/actions/searchActions"
import { addToFavoritesAction } from "../redux/actions/favoritesActions"
import { addToPlan, removeFromPlan } from "../redux/actions/planActions"
import { addToReadingList, removeFromReadingList } from "../redux/actions/readingListActions"
import { addToFinishedList } from "../redux/actions/finishedReadingActions"

import { connect } from "react-redux"

class MainPage extends Component {

    submitSearch = () => {
        const { searchQuery } = this.props.searchReducer
        searchBooks(searchQuery)
            .then(result => {
                this.props.fetchBooks(result)
            })
            .catch(err => console.log(err))
    }

    handleInputChange = (val) => {
        this.props.changeSearchQuery(val)
    }

    handleAddToFavorite = (book) => {
        this.props.onAddToFavorites(book)
    }

    handleAddToPlan = (book) => {
        this.props.onAddToPlan(book)
    }

    handleRemoveFromPlan = (bookId) => {
        const planBooks = this.props.planReducer.booksPlan
        let filteredBooks = planBooks.filter(book => book.id !== bookId)
        this.props.onRemoveFromPlan(filteredBooks)
    }

    handleAddToReadingList = (book) => {
        this.props.onAddToPlan(book)
        this.handleRemoveFromPlan(book.id)
        this.props.onAddToReadingList(book)
    }

    handleRemoveFromReadingList = (bookId) => {
        const readingListBooks = this.props.readingListReducer.books
        let filteredBooks = readingListBooks.filter(book => book.id !== bookId)
        this.props.onRemoveFromReadingList(filteredBooks)
    }

    handleAddToFinishedList = (book) => {
        this.handleAddToReadingList(book)
        this.handleRemoveFromReadingList(book.id)
        this.props.onAddToFinishedList(book)
    }

    booksList = () => {
        const { booksList } = this.props.searchReducer
        const { myFavoritesBooks } = this.props.favoritesReducer
        const { booksPlan } = this.props.planReducer
        const readingListBooks = this.props.readingListReducer.books
        const { finishedBooks } = this.props.finishedReadingReducer

        if (booksList.items) {
            const books = booksList.items.map(book => {
                const { previewLink } = book.volumeInfo

                return (
                    <div key={book.id} className="book-item">
                        <BookItem book={book} />
                        <div className="buttons-div">
                            {myFavoritesBooks.some(favBook => favBook.id === book.id) ?
                                < button type="button" className="btn btn-outline-warning btn-sm " disabled > One of my favorites </button>
                                : < button type="button" className="btn btn-warning btn-sm" onClick={() => this.handleAddToFavorite(book)}> Add to my favorites </button>
                            } <br />
                            {booksPlan.some(planBook => planBook.id === book.id) ||
                                finishedBooks.some(item => item.id === book.id) ||
                                readingListBooks.some(item => item.id === book.id)
                                ?
                                < button type="button" className="btn btn-outline-info btn-sm " disabled > In my plan</button>
                                : < button type="button" className="btn btn-info btn-sm " onClick={() => this.handleAddToPlan(book)}> Planning to read </button>
                            } <br />
                            {readingListBooks.some(item => item.id === book.id) || finishedBooks.some(item => item.id === book.id) ?
                                < button type="button" className="btn btn-outline-info btn-sm " disabled > Currently reading </button>
                                : < button type="button" className="btn btn-info btn-sm " onClick={() => this.handleAddToReadingList(book)}> Add to currently reading list </button>
                            } <br />
                            {finishedBooks.some(item => item.id === book.id) ?
                                < button type="button" className="btn btn--outline-success btn-sm " disabled > Finished </button>
                                : < button type="button" className="btn btn-success btn-sm " onClick={() => this.handleAddToFinishedList(book)}> Add to finished </button>
                            } <br />
                            <a href={previewLink} className="btn btn-primary btn-sm">Preview book</a>
                        </div>
                    </div >

                )
            })
            return books
        }
    }

    render() {
        const { searchQuery } = this.props.searchReducer

        return (
            <div className="search-page">
                <button className="btn btn-success" onClick={this.submitSearch}> <Octicon className="search-icon" icon={Search} />
                </button>
                <input value={searchQuery} className="search-input" placeholder="Search for a book..." onChange={e => this.handleInputChange(e.target.value)}></input>
                <div className="books-list">
                    {this.booksList()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
    changeSearchQuery: (val) => store.dispatch(onSearchAction(val)),
    fetchBooks: val => store.dispatch(listSearchedBooks(val)),
    getSearchedBooks: val => store.dispatch(listSearchedBooks(val)),
    onAddToFavorites: val => store.dispatch(addToFavoritesAction(val)),
    onAddToPlan: val => store.dispatch(addToPlan(val)),
    onRemoveFromPlan: val => store.dispatch(removeFromPlan(val)),
    onAddToReadingList: val => store.dispatch(addToReadingList(val)),
    onRemoveFromReadingList: val => store.dispatch(removeFromReadingList(val)),
    onAddToFinishedList: val => store.dispatch(addToFinishedList(val)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MainPage)



