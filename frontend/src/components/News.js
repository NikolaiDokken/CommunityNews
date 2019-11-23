// @flow

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../styles/News.css";
import { getFrontPageNews, getCategoryArticles } from "../Service.js";

export default class News extends Component<
  { kategori: number },
  {
    error: any,
    isLoaded: boolean,
    items: Array<Object>
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    if (this.props.kategori === undefined) {
      getFrontPageNews()
        .then(items => {
          this.setState({ items });
          this.setState({ isLoaded: true });
        })
        .catch(error => {
          this.setState({ error });
        });
    } else {
      getCategoryArticles(this.props.kategori)
        .then(items => {
          this.setState({ items });
          this.setState({ isLoaded: true });
        })
        .catch(error => {
          this.setState({ error });
        });
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
          <div className="card-columns">{items.map(temp => newsCard(temp))}</div>
        </div>
      );
    }
  }
}

function newsCard(props:{sak_id: number, bilde: string, overskrift: string, innhold: string, tidspunkt: string}) {
  return (
    <div className="card rounded-0 border-0 mb-4" key={props.sak_id}>
      <NavLink
        className="nav-link newsFont m-0 p-0"
        exact
        to={"/sak/" + props.sak_id}
      >
        <img
          className="card-img-top rounded-0"
          src={props.bilde}
          alt="Alt-text"
        ></img>
        <div className="card-body">
          <h5 className="card-title">{props.overskrift}</h5>
          <p className="card-text">{props.innhold.substring(0, 80) + "..."}</p>
          <p className="card-text">
            <small className="text-muted">
              Sist oppdatert:
              {" " +
                props.tidspunkt.substring(8, 10) +
                "." +
                props.tidspunkt.substring(5, 7) +
                "." +
                props.tidspunkt.substring(0, 4) +
                " Kl. " +
                props.tidspunkt.substring(11, 16)}
            </small>
          </p>
        </div>
      </NavLink>
    </div>
  );
}
