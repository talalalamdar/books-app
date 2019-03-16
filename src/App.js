import React, { Component } from 'react';
import './App.css';

// importing pages components
import MainPage from "./components/SearchPage"
import MyFavorites from "./components/MyBookmarks"
import MyPlan from "./components/MyPlan"
import ReadingList from "./components/ReadingList.js"
import FinishedPage from "./components/FinishedPage"


// import icons, and tools for react router, redux adn store 
import Octicon, { Book, ArrowUp } from '@githubprimer/octicons-react'
import { Router, Route, NavLink, IndexRoute } from 'react-router-dom'
import { connect } from "react-redux"
import { history } from "./redux/store/store"

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <header className="App-header">
              <h1 className="App-title">Books App <Octicon className="header-icon" icon={Book} /></h1>
            </header>
            <nav className="nav">
              <div style={{ zIndex: 30, display: 'flex', flexWrap: 'wrap' }}>
                <NavLink activeClassName="active-tab" to="/search" className="nav-item nav-link"> Search books </NavLink>
                <NavLink activeClassName="active-tab" to="/plan" className="nav-item nav-link"> Plan </NavLink>
                <NavLink activeClassName="active-tab" to="/reading-list" className="nav-item nav-link"> Reading list </NavLink>
                <NavLink activeClassName="active-tab" to="/finished" className="nav-item nav-link"> Finished </NavLink>
                <NavLink activeClassName="active-tab" to="/bookmarks" className="nav-item nav-link"> Bookmarks </NavLink>
              </div>
              <diV style={styles.authorDiv} className='author-div'>
                <span>
                  by <a style={{color: 'gray'}} href="https://talalalamdar.surge.sh" target="_blank">Talal Alamdar</a>
                </span>
              </diV>
            </nav>
            <div>
              <Route exact path="/" component={MainPage}></Route>
              <Route exact path="/search" component={MainPage}></Route>
              <Route exact path="/plan" component={MyPlan}></Route>
              <Route exact path="/reading-list" component={ReadingList}></Route>
              <Route exact path="/finished" component={FinishedPage}></Route>
              <Route exact path="/bookmarks" component={MyFavorites}></Route>
            </div>
            <div className="scroll-top-div" style={styles.scrollTopDiv} onClick={() => window.location.href = '#top'}>
              <Octicon size='30px' icon={ArrowUp} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const styles = {
  scrollTopDiv: {
    width: '50px',
    height: '50px',
    position: 'fixed',
    bottom: '50px',
    right: '60px',
    border: '2px solid  #9013FE',
    color: '#9013FE',
    padding: '5px',
    cursor: 'pointer',
    borderRadius: '50%'
  },
  authorDiv: {
    position: 'absolute',
    right: 15,
    bottom: 5,
    color: 'gray',
    fontSize: '14px',
  }
}

export default connect()(App)
