import React from 'react';
import {Route, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import BHGame from './Containers/BHGame';

function App() {

  return (
    <div className="App">
        <div className="App">
            <Switch>
                 <Route path="/" component={BHGame}/>
             </Switch>
         </div>
    </div>
  );
}

export default App;
//
