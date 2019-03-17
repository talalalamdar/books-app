import React, { Component } from "react"

// importing actions
import { listSearchedBooks } from "../redux/actions/searchActions"
import { addToFavoritesAction, removeFromFavoritesAction } from "../redux/actions/favoritesActions"
import { addToPlan, removeFromPlan } from "../redux/actions/planActions"
import { addToReadingList, removeFromReadingList } from "../redux/actions/readingListActions"
import { addToFinishedList, removeFromFinishedList } from "../redux/actions/finishedReadingActions"

import store from "../redux/store/store"
import { connect } from "react-redux"
import { Modal, Button } from 'react-bootstrap'
import posed from 'react-pose'

const unknownThumbNailLink = "https://vignette.wikia.nocookie.net/burningsuns/images/4/40/BurningSuns_unknown_book_render_1.png/revision/latest?cb=20151227170239"

const Item = posed.div({
    open: { y: 0, opacity: 1 },
});
class BookItem extends Component {

    state = {
        bookHoverStatus: false,
        showModal: false,

    }

    handleAddToFavorite = (book) => {
        this.props.onAddToFavorites(book)
    }

    handleRemoveFromFavorites = (book) => {
        this.props.onRemoveFromFavorites(book)
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

    handleRemoveFromFinishedList = (bookId) => {
        const { finishedBooks } = this.props.finishedReadingReducer
        let filteredBooks = finishedBooks.filter(book => book.id !== bookId)
        this.props.onRemoveFromFinishedList(filteredBooks)
    }

    handleMouseHover = (val) => {
        this.setState({
            bookHoverStatus: val
        })
    }

    setStyle = (condition) => {
        if (condition) {
            return { backgroundColor: 'white', color: 'gray', ...styles.button }
        } else {
            return { color: 'white', ...styles.button }
        }
    }

    handleRemove = (pathname, book) => {
        if (pathname === '/reading-list') {
            this.handleRemoveFromReadingList(book.id)
        } else if (pathname === '/plan') {
            this.handleRemoveFromPlan(book.id)
        } else if (pathname === '/finished') {
            this.handleRemoveFromFinishedList(book.id)
        } else if (pathname === '/bookmarks') {
            this.handleRemoveFromFavorites(book)
        }
    }

    displayRemoveModal = () => {
        this.setState({
            showModal: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        const { title,
            imageLinks,
            authors,
            pageCount,
            publishedDate,
            infoLink,
            previewLink
        } = this.props.book.volumeInfo


        const { myFavoritesBooks } = this.props.favoritesReducer
        const { booksPlan } = this.props.planReducer
        const readingListBooks = this.props.readingListReducer.books
        const { finishedBooks } = this.props.finishedReadingReducer
        const isBookmarked = myFavoritesBooks && myFavoritesBooks.length && myFavoritesBooks.some(favBook => favBook.id === this.props.book.id)
        const inMyPlan = booksPlan.some(planBook => planBook.id === this.props.book.id)
        const onMyList = readingListBooks.some(item => item.id === this.props.book.id)
        const finishedReading = finishedBooks.some(item => item.id === this.props.book.id)
        const { bookHoverStatus } = this.state
        const isFinishedReadingPage = window.location.pathname === '/finished'
        const isMainPage = window.location.pathname === '/search' || window.location.pathname === '/'
        const isReadingListPage = window.location.pathname === '/reading-list'
        const isBookmarksPage = window.location.pathname === '/bookmarks'
        const isPlanPage = window.location.pathname === '/plan'

        return (
            <Item pose='open' style={{ position: 'relative', height: '400px', width: '300px' }} onMouseEnter={() => this.handleMouseHover(true)} onMouseLeave={() => this.handleMouseHover(false)}>
                <img style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', zIndex: -10 }} className={imageLinks ? "img-thumbnail" : "unknown-thumbnail"} src={imageLinks ? imageLinks.thumbnail : unknownThumbNailLink} alt={`${title}-book`} />


                {bookHoverStatus &&
                    <div className="book-info">
                        <a href={infoLink}>
                            <h6>{title.length > 35 ? title.substr(0, 35) + "..." : title}</h6>
                        </a>
                        <div className="details-div">
                            - Authors: {authors ? authors : "unavailable"}. <br />
                            - Pages: {pageCount ? pageCount : "unavailable"} <br />
                            - Published date: {publishedDate ? publishedDate : "unavailable"} <br />
                            - Country: {this.props.book.accessInfo.country ? this.props.book.accessInfo.country : "unavailable"}
                        </div>
                        <div className="buttons-div">
                            {!isBookmarksPage && (
                                <div style={{ ...this.setStyle(isBookmarked), width: isReadingListPage ? '100%' : '50%' }} onClick={() => this.handleAddToFavorite(this.props.book)} > {isBookmarked ? 'Bookmarked' : 'Bookmark'} </div>
                            )}
                            {!isFinishedReadingPage && !isReadingListPage && !isBookmarksPage && !isPlanPage && !finishedReading && !onMyList && (
                                <div style={this.setStyle((inMyPlan || finishedReading || onMyList))} onClick={() => (!inMyPlan || !finishedReading || !onMyList) && this.handleAddToPlan(this.props.book)}> {(inMyPlan || finishedReading || onMyList) ? 'In my plan' : 'Add to plan'} </div>
                            )}
                            {!isFinishedReadingPage && !isReadingListPage && !isBookmarksPage && !finishedReading && (
                                <div style={this.setStyle((onMyList || finishedReading))} onClick={() => (!onMyList || !finishedReading) && this.handleAddToReadingList(this.props.book)}> {(onMyList || finishedReading) ? 'Currently reading' : 'Add to reading list'} </div>
                            )}
                            {!isFinishedReadingPage && !isBookmarksPage && (
                                <div style={{ ...this.setStyle(finishedReading), width: (isMainPage && onMyList) ? '100%' : '50%' }} onClick={() => !finishedReading && this.handleAddToFinishedList(this.props.book)}> {finishedReading ? 'Finished' : 'Add to finished list'} </div>
                            )}
                            {!isMainPage && (
                                <div className="remove-btn" style={{ width: isBookmarksPage ? '100%' : '50%' }} onClick={this.displayRemoveModal}> Remove </div>
                            )}
                            <a style={styles.button} target='_blank' href={previewLink} >Preview Book</a>
                        </div>
                    </div>
                }
                <Modal style={{ fontSize: '20px' }} show={this.state.showModal} onHide={this.handleCloseModal} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Remove dialog</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to remove <strong> {title}</strong> ?</Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-sm" variant="secondary" onClick={this.handleCloseModal}>
                            Close
                  </Button>
                        <Button style={{ backgroundColor: 'rgb(144, 19, 254)' }} className="btn btn-sm" onClick={() => this.handleRemove(window.location.pathname, this.props.book)}>
                            Remove
                  </Button>
                    </Modal.Footer>
                </Modal>
            </Item>
        )
    }

}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = () => ({
    getSearchedBooks: val => store.dispatch(listSearchedBooks(val)),
    onAddToFavorites: val => store.dispatch(addToFavoritesAction(val)),
    onAddToPlan: val => store.dispatch(addToPlan(val)),
    onRemoveFromPlan: val => store.dispatch(removeFromPlan(val)),
    onAddToReadingList: val => store.dispatch(addToReadingList(val)),
    onRemoveFromReadingList: val => store.dispatch(removeFromReadingList(val)),
    onAddToFinishedList: val => store.dispatch(addToFinishedList(val)),
    onRemoveFromFavorites: val => store.dispatch(removeFromFavoritesAction(val)),
    onRemoveFromFinishedList: val => store.dispatch(removeFromFinishedList(val))
})

const styles = {
    button: {
        width: '50%',
        height: '50px',
        border: '1px solid white',
        fontSize: '16px',
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookItem)