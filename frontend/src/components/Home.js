// @flow

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/stylesheet.css";
import Navbar from "./Navbar.js";
import LiveFeed from "./LiveFeed";
import Footer from "./Footer.js";
import News from "./News";

export default class Home extends Component<{ match: { params: { id: number } } }> {
  render() {
    console.log();
    return (
      <div className="home-container bg-light">
        <Navbar kategori={this.props.match.params.id} />
        <LiveFeed />
        <News kategori={this.props.match.params.id} />
        <Footer />
      </div>
    );
  }
}
