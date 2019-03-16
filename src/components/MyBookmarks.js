import React, { Component } from "react"
import { connect } from "react-redux"
import BookItem from "./BookItem"
import EmptyStatePage from "./EmptyStatePage";


class MyBookmarks extends Component {


    favoriteBooksList = () => {
        const favBooks = this.props.myFavoritesBooks
        if (favBooks && favBooks.length) {
            const books = favBooks.map(book => {

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
        let books =this.favoriteBooksList()
        return (
            <div className="books-list">
                {books && books.length ? books : <EmptyStatePage message="You have no bookmarked books" />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state.favoritesReducer
})

const mapDispatchToProps = () => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(MyBookmarks)