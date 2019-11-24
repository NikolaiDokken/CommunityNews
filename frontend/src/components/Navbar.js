// @flow

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import { getCategories, getSearch } from "../Service.js";

export default class Navbar extends Component<
  { kategori?: number },
  {
    kategorier: Array<{ kategori_id: number, kategori_navn: string }>,
    currentKategori: number,
    searchResults: Array<{ sak_id: number, overskrift: string }>
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      kategorier: [],
      currentKategori: 0,
      searchResults: []
    };
  }

  componentDidMount() {
    // console.log(this.props.kategori);
    getCategories()
      .then(res => {
        this.setState({ kategorier: res.data });
        if (this.props.kategori !== undefined) {
          this.setState({ currentKategori: this.props.kategori });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSearch = (event: any) => {
    var search = event.target.value;
    if (search.length > 0) {
      getSearch(search)
        .then(res => {
          this.setState({ searchResults: res.data });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ searchResults: [] });
    }
  };

  clear = (event: any) => {
    event.target.value = "";
    this.setState({ searchResults: [] });
  };

  render() {
    return (
      <nav
        className="navbar navbar-expand-xl navbar-dark nav-bg-custom sticky-top py-0"
        role="navigation"
      >
        <NavLink className="navbar-brand my-0 nav-link" exact to="/">
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
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="nav navbar-nav mx-auto">
            <li className="nav-item custom-nav-text mr-5 my-auto">
              <NavLink className="nav-link" exact to="/">
                FORSIDE
              </NavLink>
            </li>
            <li className="nav-item custom-nav-text mr-5 my-auto">
              <NavLink className="nav-link" exact to="/register">
                REGISTRER
              </NavLink>
            </li>
            <li className="nav-item dropdown my-auto custom-nav-text">
              <button
                className="btn btn-secondary dropdown-toggle"
                href="#"
                id="navbarDropdown"
                data-toggle="dropdown"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  border: "none",
                  fontSize: "20px"
                }}
              >
                {this.state.currentKategori === 0
                  ? "KATEGORI"
                  : this.state.kategorier.map(kategori =>
                      kategori.kategori_id ===
                      parseInt(this.state.currentKategori)
                        ? kategori.kategori_navn.toUpperCase()
                        : ""
                    )}
              </button>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.state.kategorier.map(kategori => (
                  <NavLink
                    className="dropdown-item"
                    onClick={() => {
                      this.setState({
                        currentKategori: kategori.kategori_id
                      });
                      window.location.hash =
                        "/kategori/" + kategori.kategori_id;
                      window.location.reload();
                    }}
                    style={{ color: "black" }}
                    exact
                    to={"/kategori/" + kategori.kategori_id}
                    key={kategori.kategori_id}
                  >
                    {kategori.kategori_navn.toUpperCase()}
                  </NavLink>
                ))}
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
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
                  key={i}
                  style={
                    i % 2 === 0
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
                    style={
                      i % 2 === 0 ? { color: "white" } : { color: "black" }
                    }
                    onMouseDown={() => {
                      window.location.hash = "/sak/" + result.sak_id;
                      window.location.reload();
                    }}
                  >
                    {result.overskrift.substring(0, 28) + "...\n"}
                  </NavLink>
                </div>
              ))}
            </div>
            <button
              className="btn btn-outline-warning my-2 my-sm-0"
              type="submit"
            >
              Søk
            </button>
          </form>
        </div>
      </nav>
    );
  }
}
