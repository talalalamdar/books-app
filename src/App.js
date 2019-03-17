import React, { Component } from 'react';
import './App.css';

// importing pages components
import MainPage from "./components/SearchPage"
import MyFavorites from "./components/MyBookmarks"
import MyPlan from "./components/MyPlan"
import ReadingList from "./components/ReadingList.js"
import FinishedPage from "./components/FinishedPage"
import image1 from './assets/library1.png'
import image2 from './assets/library2.png'
import image3 from './assets/library3.png'
import image4 from './assets/library4.png'
import { Carousel } from 'react-bootstrap'


// import icons, and tools for react router, redux adn store 
import Octicon, { ArrowUp } from '@githubprimer/octicons-react'
import { Router, Route, NavLink } from 'react-router-dom'
import { connect } from "react-redux"
import { history } from "./redux/store/store"

class App extends Component {
  imagesArray = [image1, image2, image3, image4]


  render() {

    return (
      <div className="App">
        <Router history={history}>
          <div>
            <div style={{ width: '100%', height: '750px', position: 'relative' }} className="header-img">
              <Carousel controls={false}
                style={{ width: '100%', height: '100%' }}>
                {this.imagesArray.map(image => {
                  return (
                    <Carousel.Item key={image} style={{ width: '100%', height: '100%' }}>
                      <img className="d-block w-100" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, right: 0 }} src={image} alt='carousel-img'/>
                    </Carousel.Item>
                  )
                })
                }
              </Carousel>
              <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, right: 0, backgroundColor: 'rgba(0,0,0, 0.5)' }}>
                <header className="App-header">
                  <h1 className="App-title">Books App </h1>
                </header>
              </div>
            </div>
            <nav className="nav">
              <div style={{ zIndex: 30, display: 'flex', flexWrap: 'wrap' }}>
                <NavLink activeClassName="active-tab" to="/search" className="nav-item nav-link"> Search books </NavLink>
                <NavLink activeClassName="active-tab" to="/plan" className="nav-item nav-link"> Plan </NavLink>
                <NavLink activeClassName="active-tab" to="/reading-list" className="nav-item nav-link"> Reading list </NavLink>
                <NavLink activeClassName="active-tab" to="/finished" className="nav-item nav-link"> Finished </NavLink>
                <NavLink activeClassName="active-tab" to="/bookmarks" className="nav-item nav-link"> Bookmarks </NavLink>
              </div>
              <div style={styles.authorDiv} className='author-div'>
                <span>
                  by <a style={{ color: 'gray' }} href="https://talalalamdar.surge.sh" target="__blank">Talal Alamdar</a>
                </span>
              </div>
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
              <Octicon size={30} icon={ArrowUp} />
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
