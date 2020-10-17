import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./Home";

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route exact path="/:surveyid">
                  <SurveyPage />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
