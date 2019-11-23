// @flow

import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import {
  getAllArticles,
  deleteArticleDB,
  getCategories
} from "../Service.js";
import RegisterForm from "./RegisterForm.js";

export default class Register extends Component<
  {},
  {
    kategorier: Array<{ kategori_id: number, kategori_navn: string }>,
    isLoaded: boolean
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      kategorier: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    getCategories().then(kategorier => {
      this.setState({ kategorier });
      this.setState({ isLoaded: true });
    });
  }

  render() {
    var emptyArticle = {
      sak_id: 0,
      overskrift: "",
      innhold: "",
      bilde: "",
      kategori_id: 0,
      viktighet: 1
    };
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Navbar />
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-4">Registrer en sak!</h1>
              <p className="lead">
                Her kan du laste opp en nyhetssak til vår nettside.
              </p>
            </div>
          </div>
          <RegisterForm
            sak={emptyArticle}
            registrer={true}
            kategorier={this.state.kategorier}
          />
          <Edit kategorier={this.state.kategorier} />
          <Footer />
        </div>
      );
    }
  }
}

class Edit extends Component<
  { kategorier: Array<Object> },
  { error: any, isLoaded: boolean, items: Array<Object> }
> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    getAllArticles().then(items => {
      this.setState({ items });
      this.setState({ isLoaded: true });
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="mx-5">
          <h1>Rediger/Slett sak</h1>
          <div className="accordion" id="accordionExample">
            {items.map(sak => (
              <EditCard sak={sak} kategorier={this.props.kategorier} key={sak.sak_id}/>
            ))}
          </div>
        </div>
      );
    }
  }
}

class EditCard extends Component<{ sak: Object, kategorier: Array<Object> }> {
  constructor(props) {
    super(props);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  // Handles onclick for delete button
  deleteArticle = () => {
    if (window.confirm("Er du sikker på at du vil slette denne saken?")) {
      deleteArticleDB(this.props.sak.sak_id).then(res => {
        alert("Saken din er slettet!");
        window.location.reload(true);
      });
    } else {
      // Do nothing
    }
  };

  render() {
    return (
      <div className="card">
        <div className="card-header" id={"headingOne"}>
          <div className="row">
            <h2 className="mb-0">
              <button
                className="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target={"#collapse" + this.props.sak.sak_id}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                {window.innerWidth <= 325
                  ? this.props.sak.overskrift.substring(0, 10) + "..."
                  : window.innerWidth <= 375
                  ? this.props.sak.overskrift.substring(0, 17) + "..."
                  : window.innerWidth <= 414
                  ? this.props.sak.overskrift.substring(0, 23) + "..."
                  : this.props.sak.overskrift}
              </button>
            </h2>
            <div className="ml-auto">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.deleteArticle}
              >
                Slett sak
              </button>
            </div>
          </div>
        </div>

        <div
          id={"collapse" + this.props.sak.sak_id}
          className="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <RegisterForm
              sak={this.props.sak}
              kategorier={this.props.kategorier}
              registrer={false}
            />
          </div>
        </div>
      </div>
    );
  }
}
