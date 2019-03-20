import React, { Component } from "react"
import { connect } from "react-redux"
import BookItem from "./BookItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from "react-pose";


const BookContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class MyBookmarks extends Component {


    favoriteBooksList = () => {
        const favBooks = this.props.myFavoritesBooks
        if (favBooks && favBooks.length) {
            const books = favBooks.map((book, i) => {

                return book.id && (
                    <BookContainer key={book.id} i={i} className="book-item">
                        <BookItem book={book} />
                    </BookContainer>
                )
            })
            return books
        }
    }

    render() {
        let books = this.favoriteBooksList()
        return (
            <div className="books-list">
                <PoseGroup animateOnMount>
                    {books && books.length ? books : <EmptyStatePage key="empty-page" message="You have no bookmarked books" />}
                </PoseGroup>
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