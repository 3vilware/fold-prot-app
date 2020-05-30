import React from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './views/Login/Login'
import SingleFold from './views/SingleFold/SingleFold'
import HomeView from './views/HomeView/HomeView'
import HistoryView from './views/HistoryView/HistoryView'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
     <Router>

        {/* <Route path="/">
          <HomeView/>
        </Route>
         */}
         
        <Route path="/">
          <HomeView/>
        </Route>


        <Route path="/fold">
          <SingleFold/>
        </Route>

        <Route path="/login">
          <Login init={50}/>
        </Route>

     </Router>
    </div>
  );
}

export default App;
