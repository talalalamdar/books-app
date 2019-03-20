import React, { Component } from "react"
import { connect } from "react-redux"
import BookItem from "./BookItem"
import EmptyStatePage from "./EmptyStatePage";
import posed, { PoseGroup } from 'react-pose'

const BookContainer = posed.div({
    enter: {
        scale: 1,
        delay: props => props.i * 100,
    },
    exit: { scale: 0 }
});

class MyPlan extends Component {

    planBooksList = () => {
        const planBooks = this.props.planReducer.booksPlan

        if (planBooks) {
            const books = planBooks.map((book, i) => {
                return (
                    <BookContainer pose='enter' i={i} initialPose='exit' key={book.id} className="book-item">
                        <BookItem book={book} />
                    </BookContainer>
                )
            })
            return books
        }
    }

    render() {
        const books = this.planBooksList()

        return (
            <div className="books-list">
                <PoseGroup animateOnMount>
                    {books && books.length ? books : <EmptyStatePage key="empty-page" message="No books currently in your plan" />}
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


export default connect(mapStateToProps, mapDispatchToProps)(MyPlan)