import React, { Component } from "react"
import { connect } from "react-redux"
import BookItem from "./BookItem"
import EmptyStatePage from "./EmptyStatePage";

class ReadingList extends Component {

    readingList = () => {
        const readingListBooks = this.props.readingListReducer.books

        if (readingListBooks) {
            const books = readingListBooks.map(book => {

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
        const books = this.readingList()
        return (
            <div className="books-list">
                {books && books.length ? books : <EmptyStatePage message="No books in your reading list :(" />}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(ReadingList)