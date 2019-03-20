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

class FinishedPage extends Component {

    finishedList = () => {
        const { finishedBooks } = this.props.finishedReadingReducer
        if (finishedBooks) {
            const books = finishedBooks.map((book, i) => {
                return (
                    <BookContainer key={book.id} i={i} className="book-item">
                        <BookItem book={book} />
                    </BookContainer>
                )
            })
            return books
        }
    }

    render() {
        const books = this.finishedList()
        return (
            <div className="books-list">
                <PoseGroup animateOnMount>
                    {books && books.length ? books : <EmptyStatePage key="empty-page" message="You haven't read any books!! wtf!?" />}
                </PoseGroup>
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