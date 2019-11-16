import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Article from "./components/Article";
import "./styles/stylesheet.css";

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/sak/:id" component={Article} />
        <Route exact path="/kategori/:id" component={Home} />
      </HashRouter>
    );
  }
}
