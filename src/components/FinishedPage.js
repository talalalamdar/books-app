import React, { Component } from "react"
import { connect } from "react-redux"
import BookItem from "./BookItem"
import EmptyStatePage from "./EmptyStatePage";

class FinishedPage extends Component {

    finishedList = () => {
        const { finishedBooks } = this.props.finishedReadingReducer
        if (finishedBooks) {
            const books = finishedBooks.map(book => {
                return (
                    <div key={book.id} className="book-item">
                        <BookItem book={book} />
                    </div>
                )
            })
            return books
        }
    }

    render() {
        const books = this.finishedList()
        return (
            <div className="books-list">
                {books && books.length ? books : <EmptyStatePage message="You haven't read any books!! wtf!?" />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(FinishedPage)