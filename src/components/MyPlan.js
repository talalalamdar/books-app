import React, { Component } from "react"
import { connect } from "react-redux"
import BookItem from "./BookItem"
import EmptyStatePage from "./EmptyStatePage";

class MyPlan extends Component {

    planBooksList = () => {
        const planBooks = this.props.planReducer.booksPlan
        
        if (planBooks) {
            const books = planBooks.map(book => {
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
        const books = this.planBooksList()

        return (
            <div className="books-list">
                {books && books.length ? books : <EmptyStatePage message="No books currently in your plan"/>}
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