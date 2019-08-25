import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

import SignInSide from "./components/pages/sign";
import RegiInSide from "./components/pages/signup";
import Home from "./components/pages/Home";
import DisplayOne from "./components/pages/displaybook";
import Loading from "./components/pages/loading";
import Explore from "./components/pages/explore";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/Home' component={Home}/>
        <Route path='/register' component={RegiInSide}/>
        <Route path='/login' component={SignInSide}/>
        <Route path='/explore' component={Explore} />
        <Route path='/history' component={Loading}/>
        <Route exact path='/:idbooks' component={DisplayOne} />
        <Home />
      </Switch>
    </Router>
  );
}

export default App;
