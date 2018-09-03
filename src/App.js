import React, { Component } from 'react';
import './App.css';

// importing pages components
import MainPage from "./components/MainPage"
import MyFavorites from "./components/MyFavorites"
import MyPlan from "./components/MyPlan"
import CurrentlyReading from "./components/CurrentlyReading.js"
import FinishedPage from "./components/FinishedPage"

// import icons, and tools for react router, redux adn store 
import Octicon, { Book } from '@githubprimer/octicons-react'
import { Router, Route, NavLink } from 'react-router-dom'
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
            <nav className="nav nav-pills nav-justified">
              <NavLink activeClassName="active-tab" to="/main" className="nav-item nav-link"> Main </NavLink>
              <NavLink activeClassName="active-tab" to="/my-plan" className="nav-item nav-link"> My plan </NavLink>
              <NavLink activeClassName="active-tab" to="/currently-reading" className="nav-item nav-link"> Currently reading </NavLink>
              <NavLink activeClassName="active-tab" to="/finished" className="nav-item nav-link"> Finished </NavLink>
              <NavLink activeClassName="active-tab" to="/my-favorites" className="nav-item nav-link"> My favorites </NavLink>
            </nav>
            <div>
              <Route exact path="/main" component={MainPage}></Route>
              <Route exact path="/my-plan" component={MyPlan}></Route>
              <Route exact path="/currently-reading" component={CurrentlyReading}></Route>
              <Route exact path="/finished" component={FinishedPage}></Route>
              <Route exact path="/my-favorites" component={MyFavorites}></Route>
            </div>
          </div>
        </Router>
      </div >
    );
  }

}

export default connect()(App)
