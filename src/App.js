import React, { Component } from 'react';
import { Route } from "react-router-dom";
import Header from './components/Header';
import HomePage from './components/HomePage';
import ManageMovies from './components/ManageMovies';
import ManageCategories from './components/ManageCategories'
import ConnectMovCat from './components/ConnectMovCat';
// import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div>
          <Route exact path='/' component={HomePage} />
          <Route path="/managemovies" component={ManageMovies} />
          <Route path="/managecategories" component={ManageCategories} />
          <Route path="/managemovcat" component={ConnectMovCat} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
