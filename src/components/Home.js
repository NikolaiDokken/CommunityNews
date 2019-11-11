import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/stylesheet.css";
import Navbar from "./Navbar.js";
import LiveFeed from "./LiveFeed";
import Footer from "./Footer.js";
import News from "./News";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container bg-light">
        <Navbar />
        <LiveFeed />
        <News />
        <Footer />
      </div>
    );
  }
}
