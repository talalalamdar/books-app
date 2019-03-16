import React, { Component } from "react"
import Octicon, { Search, ArrowUp } from '@githubprimer/octicons-react'
import BookItem from "./BookItem"
import { connect } from "react-redux"

import { searchBooks } from "../utils"
import store from "../redux/store/store"
import { onSearchAction, listSearchedBooks } from "../redux/actions/searchActions"
import EmptyStatePage from "./EmptyStatePage";

import { css } from '@emotion/core';
import RingLoader from 'react-spinners/RingLoader';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

class SearchPage extends Component {

    state = {
        fetching: false
    }

    handleInputChange = (val) => {
        this.props.changeSearchQuery(val)
    }

    submitSearch = (e) => {
        e.preventDefault()
        window.location.href = '#top'
        this.setState({ fetching: true }, () => {
            const { searchQuery } = this.props.searchReducer
            searchBooks(searchQuery)
                .then(result => {
                    this.props.fetchBooks(result)
                    this.setState({ fetching: false })
                })
                .catch(err => console.log(err))

        })
    }

    booksList = () => {
        const { booksList } = this.props.searchReducer


        if (booksList.items) {
            const books = booksList.items.map(book => {

                return (
                    <div key={book.id} className="book-item">
                        <BookItem book={book} {...this.props} />
                    </div>

                )
            })
            return books
        }
    }

    render() {
        const { searchQuery } = this.props.searchReducer
        const books = this.booksList()
        const { fetching } = this.state

        return (
            <div className="search-page">
                <form onSubmit={(e) => this.submitSearch(e)}>
                    <div className='form-wrapper'>
                        <input value={searchQuery} className="search-input" placeholder="Search for a book..." onChange={e => this.handleInputChange(e.target.value)}></input>
                        <button type="submit" className="search-btn" onClick={this.submitSearch}>
                            <span style={{ display: 'inline-block' }}>
                                Search <Octicon className="search-icon" icon={Search} />
                            </span>
                        </button>
                    </div>
                </form>
                <div className="books-list">
                    {fetching ?
                        <div style={{ width: '100%', marginTop: 60 }}>
                            <RingLoader
                                css={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#9013FE'}
                                loading={true}
                            />
                        </div> :
                        (books && books.length) ? books : <EmptyStatePage message="No available books" />}
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
})



export default connect(mapStateToProps, mapDispatchToProps)(SearchPage)

