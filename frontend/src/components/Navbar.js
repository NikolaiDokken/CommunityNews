// @flow

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { getCategories, getSearch } from "../Service.js";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kategorier: [],
      currentKategori: 0,
      searchResults: []
    };
  }

  componentDidMount() {
    getCategories().then(kategorier => {
      this.setState({ kategorier });
      if (this.props.kategori !== undefined) {
        this.setState({ currentKategori: this.props.kategori });
      }
    });
  }

  componentWillUnmount() {
    
  }

  onSearch = event => {
    var search = event.target.value;
    if (search.length > 0) {
      getSearch(search).then(searchResults => {
        this.setState({ searchResults });
      });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  clear = event => {
    event.target.value = "";
    this.setState({ searchResults: [] });
  };

  render() {
    return (
      <nav
        class="navbar navbar-expand-xl navbar-dark nav-bg-custom sticky-top py-0"
        role="navigation"
      >
        <a class="navbar-brand my-0">
          <NavLink className="nav-link" exact to="/">
            <div className="row">
              <div className="col pr-0">Ing</div>
              <div
                className="col"
                style={{
                  backgroundColor: "#ffa31a",
                  borderRadius: "5px",
                  padding: "2px",
                  color: "black"
                }}
              >
                Nytt
              </div>
            </div>
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
                {this.state.currentKategori == 0
                  ? "KATEGORI"
                  : this.state.kategorier.find(
                      kategori =>
                        kategori.kategori_id == this.state.currentKategori
                    ).kategori_navn}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.state.kategorier.map(kategori => (
                  <NavLink
                    onClick={() => {
                      window.location.hash =
                        "/kategori/" + kategori.kategori_id;
                      window.location.reload();
                    }}
                    style={{ color: "black" }}
                    exact
                    to={"/kategori/" + kategori.kategori_id}
                  >
                    <a
                      class="dropdown-item"
                      onClick={() => {
                        this.setState({
                          currentKategori: kategori.kategori_id
                        });
                      }}
                    >
                      {kategori.kategori_navn}
                    </a>
                  </NavLink>
                ))}
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Søk..."
              aria-label="Search"
              style={{ height: "30px" }}
              onChange={this.onSearch}
              onBlur={this.clear}
            ></input>
            <div className="searchResults" style={{ display: "block" }}>
              {this.state.searchResults.map((result, i) => (
                <div
                  style={
                    i % 2 == 0
                      ? {
                          backgroundColor: "#808080",
                          fontSize: "15px"
                        }
                      : { backgroundColor: "#d3d3d3" }
                  }
                >
                  <NavLink
                    className="p-1 w-100"
                    exact
                    to={"/sak/" + result.sak_id}
                    style={i % 2 == 0 ? { color: "white" } : { color: "black" }}
                    onMouseDown={() => {
                      window.location.hash = "/sak/" + result.sak_id;
                      window.location.reload();
                    }}
                  >
                    {result.overskrift.substring(0, 30) + "...\n"}
                  </NavLink>
                </div>
              ))}
            </div>
            <button class="btn btn-outline-warning my-2 my-sm-0" type="submit">
              Søk
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
