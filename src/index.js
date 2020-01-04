import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";
import "bootstrap/dist/css/bootstrap.min.css";
// pages for this product

import ProfilePage from "views/ProfilePage/ProfilePage.js";
import MahiraPage from "views/MNPage/MahiraPage";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/profile-page" component={ProfilePage} />
      <Route path="/mahira" component={MahiraPage} />
      <Route path="/" component={ProfilePage} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
