import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav
        class="navbar navbar-expand-xl navbar-dark nav-bg-custom sticky-top"
        role="navigation"
      >
        <a class="navbar-brand">
          <NavLink className="nav-link" exact to="/">
            ING NYTT
          </NavLink>
        </a>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav mx-auto">
            <li class="nav-item custom-nav-text mr-5 my-auto">
              <NavLink className="nav-link" exact to="/">
                FORSIDE
              </NavLink>
            </li>
            <li class="nav-item custom-nav-text mr-5 my-auto">
              <NavLink className="nav-link" exact to="/register">
                REGISTRER
              </NavLink>
            </li>
            <li class="nav-item dropdown my-auto custom-nav-text">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
              >
                KATEGORIER
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Nyheter
                </a>
                <a class="dropdown-item" href="#">
                  Sport
                </a>
                <a class="dropdown-item" href="#">
                  Kultur
                </a>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Søk..."
              aria-label="Search"
            ></input>
            <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">
              Søk
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
