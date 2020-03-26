import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import ProteinPlot from '../src/components/ProteinPlot/ProteinPlot'
import Login from './views/Login/Login'

function App() {
  return (
    <div className="App">
     <Router>

        <Route path="/fold">
          <ProteinPlot/>
        </Route>

        <Route path="/login">
          <Login init={50}/>
        </Route>

     </Router>
    </div>
  );
}

export default App;
