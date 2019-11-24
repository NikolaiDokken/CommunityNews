// @flow

import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import { getAllArticles, deleteArticleDB, getCategories } from "../Service.js";
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
    getCategories().then(res => {
      this.setState({ kategorier: res.data });
      this.setState({ isLoaded: true });
    });
  }

  render() {
    var emptyArticle = {
      sak_id: 0,
      overskrift: "",
      brukernavn: "",
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
      items: [],
      offset: 0
    };
  }

  getArticles(offset) {
    getAllArticles(offset)
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getArticles(0);
    this.setState({ isLoaded: true });
  }

  getNextPage(nextPage) {
    if (
      nextPage &&
      (this.state.items.length === 0 || this.state.items.length < 10)
    ) {
      this.getArticles(0);
      this.setState({ offset: 0 });
    } else if (!nextPage && this.state.offset === 0) {
      return;
    } else if (nextPage) {
      this.getArticles((this.state.offset + 1) * 10);
      this.setState({ offset: this.state.offset + 1 });
    } else {
      this.getArticles((this.state.offset - 1) * 10);
      this.setState({ offset: this.state.offset - 1 });
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
        <div className="mx-5">
          <h1>Rediger/Slett sak</h1>
          <div className="accordion" id="accordionExample">
            {items.map(sak => (
              <EditCard
                sak={sak}
                kategorier={this.props.kategorier}
                key={sak.sak_id}
              />
            ))}
            {Array(10 - items.length)
              .fill()
              .map((card, index) => (
                <div className="card" key={index}>
                  <div className="card-header" id={"headingOne"}>
                    <div className="row">
                      <h2 className="mb-0" style={{ height: "38px" }}>
                        {null}
                      </h2>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="row mt-2 justify-content-center">
            <button
              type="button"
              className="btn btn-primary btn-arrow-left mx-3"
              onClick={() => this.getNextPage(false)}
            >
              Forrige side
            </button>
            <div>Side: {this.state.offset + 1}</div>
            <button
              type="button"
              className="btn btn-primary btn-arrow-right mx-3"
              onClick={() => this.getNextPage(true)}
            >
              Neste Side
            </button>
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
      deleteArticleDB(this.props.sak.sak_id)
        .then(res => {
          alert("Saken din er slettet!");
          window.location.reload(true);
        })
        .catch(error => {
          console.log(error);
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
