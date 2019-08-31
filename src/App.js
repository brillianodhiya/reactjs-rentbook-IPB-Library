import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import store from "./public/Store";

import SignInSide from "./components/pages/sign";
import RegiInSide from "./components/pages/signup";
import Home from "./components/pages/Home";
import DisplayOne from "./components/pages/displaybook";
import HistoryBook from "./components/pages/history";
import Explore from "./components/pages/explore";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route path="/Home" component={Home} />
          <Route path="/register" component={RegiInSide} />
          <Route path="/login" component={SignInSide} />
          <Route path="/explore" component={Explore} />
          <Route path="/history" component={HistoryBook} />
          <Route exact path="/:idbooks" component={DisplayOne} />
          <Home />
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
