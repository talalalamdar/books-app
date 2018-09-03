import React, { Component } from "react"
import { connect } from "react-redux"
import store from "../redux/store/store"
import { removeFromPlan } from "../redux/actions/planActions"
import { addToReadingList } from "../redux/actions/readingListActions"
import { BookItem } from "./BookItem"

class MyPlan extends Component {

    handleRemoveFromPlan = (bookId) => {
        const planBooks = this.props.planReducer.booksPlan
        let filteredBooks = planBooks.filter(book => book.id !== bookId)
        this.props.onRemoveFromPlan(filteredBooks)
    }

    handleAddToReadingList = (book) => {
        this.props.onAddToReadingList(book)
        this.handleRemoveFromPlan(book.id)
    }

    planBooksList = () => {
        const planBooks = this.props.planReducer.booksPlan
        const readingListBooks = this.props.readingListReducer.books

        if (planBooks) {
            const books = planBooks.map(book => {
                const { previewLink } = book.volumeInfo
                return (
                    <div key={book.id} className="book-item">
                        <BookItem book={book} />
                        <div className="buttons-div">
                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => this.handleRemoveFromPlan(book.id)}> Remove </button>
                            {readingListBooks.some(item => item.id === book.id) ?
                                < button type="button" className="btn btn-outline-info btn-sm " disabled > Add to currently reading list</button>
                                : < button type="button" className="btn btn-info btn-sm " onClick={() => this.handleAddToReadingList(book)}> Add to currently reading list</button>
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
                {this.planBooksList()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
    onRemoveFromPlan: val => store.dispatch(removeFromPlan(val)),
    onAddToReadingList: val => store.dispatch(addToReadingList(val)),
})


export default connect(mapStateToProps, mapDispatchToProps)(MyPlan)