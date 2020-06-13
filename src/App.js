import React from 'react';
import logo from './logo.svg';
import './App.css';

import Login from './views/Login/Login'
import SingleFold from './views/SingleFold/SingleFold'
import HomeView from './views/HomeView/HomeView'
import HistoryView from './views/HistoryView/HistoryView'
import Sky from 'react-sky';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <div className="App">
       <Sky
          images={{
            /* FORMAT AS FOLLOWS */
            0: "https://cdn0.iconfinder.com/data/icons/education-283/64/Chemical_structure-molecule-molecule_structure-512.png",  /* You can pass as many images as you want */
            // 1: "https://www.pinclipart.com/picdir/middle/171-1717857_carbon-dioxide-molecule-transparent-clipart.png",

          }}
          how={130} /* Pass the number of images Sky will render chosing randomly */
          time={40} /* time of animation */
          size={'100px'} /* size of the rendered images */
          background={'palettedvioletred'} /* color of background */
        />
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
