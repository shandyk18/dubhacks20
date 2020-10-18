import React from 'react';
import logo from './logo.svg';
import './App.css';
import SurveyPage from './surveyPage/SurveyPage';
import Home from "./HomePage/Home";
import ResultsPage from "./ResultsPage/ResultsPage";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


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

              <Route exact path="/results/:resultid">
                  <ResultsPage />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
