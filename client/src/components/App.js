import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch//,
} from 'react-router-dom';
import MyNavbar from "./MyNavbar"

//components
import SearchPage1 from './SearchPage1';
import SearchPage2 from './SearchPage2';
import SearchPage3 from './SearchPage3';
import TrailsPage from './TrailsPage';
import Park from './Park';
import RecsPage from './RecsPage';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MyNavbar />
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <RecsPage />
              )}
            />
            <Route 
              exact
              path="/search1"
              render={() => (
                <SearchPage1 />
              )}
            />
            <Route 
              exact
              path="/search2"
              render={() => (
                <SearchPage2 />
              )}
            />
            <Route 
              exact
              path="/search3"
              render={() => (
                <SearchPage3 />
              )}
            />
            <Route 
              exact
              path="/TrailsPage"
              render={() => (
                <TrailsPage />
              )}
            />

            <Route 
              exact
              path="/RecsPage"
              render={() => (
                <RecsPage />
              )}
            />
            <Route 
              exact
              path="/park/:code"
              component = {Park}
            />
          </Switch>
        </Router>

      </div>
    )
  }
}
