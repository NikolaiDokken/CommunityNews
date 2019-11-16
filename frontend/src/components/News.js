import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/News.css";
import { getFrontPageNews, getCategoryArticles } from "../Service.js";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    console.log("kategorien er" + this.props.kategori);
    if (this.props.kategori === undefined) {
      getFrontPageNews().then(items => {
        this.setState({ items });
        this.setState({ isLoaded: true });
      });
      console.log("vanlige nyheter");
    } else {
      getCategoryArticles(this.props.kategori).then(items => {
        this.setState({ items });
        this.setState({ isLoaded: true });
      });
      console.log("kategoribasert");
    }
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="mx-4 my-4">
          <div class="card-columns">{items.map(temp => newsCard(temp))}</div>
        </div>
      );
    }
  }
}

function newsCard(props) {
  return (
    <div class="card rounded-0 border-0 mb-4">
      <NavLink
        className="nav-link newsFont m-0 p-0"
        exact
        to={"/sak/" + props.sak_id}
      >
        <img
          class="card-img-top rounded-0"
          src={props.bilde}
          alt="Alt-text"
        ></img>
        <div class="card-body">
          <h5 class="card-title">{props.overskrift}</h5>
          <p class="card-text">{props.innhold.substring(0, 80) + "..."}</p>
          <p class="card-text">
            <small class="text-muted">
              Sist oppdatert:{" "}
              {props.tidspunkt.substring(0, 10) +
                " Kl. " +
                props.tidspunkt.substring(11, 16)}
            </small>
          </p>
        </div>
      </NavLink>
    </div>
  );
}
