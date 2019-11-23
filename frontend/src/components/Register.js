// @flow

import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import {
  registerArticle,
  getAllArticles,
  updateArticle,
  deleteArticleDB,
  getCategories
} from "../Service.js";
import RegisterForm from "./RegisterForm.js";

export default class Register extends Component {
  constructor(props) {
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
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Navbar />
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1 class="display-4">Registrer en sak!</h1>
              <p class="lead">
                Her kan du laste opp en nyhetssak til vår nettside.
              </p>
            </div>
          </div>
          <RegisterForm
            overskrift=""
            innhold=""
            bilde=""
            kategori_id={0}
            viktighet={1}
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

class Edit extends Component {
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
          <div class="accordion" id="accordionExample">
            {items.map(e => (
              <EditCard element={e} kategorier={this.props.kategorier} />
            ))}
          </div>
        </div>
      );
    }
  }
}

class EditCard extends Component<element> {
  constructor(props) {
    super(props);
    this.state = {
      overskrift: this.props.element.overskrift,
      innhold: this.props.element.innhold,
      bilde: this.props.element.bilde,
      kategori_id: this.props.element.kategori_id,
      viktighet: this.props.element.viktighet,
      sak_id: this.props.element.sak_id
    };
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  // Handles onclick for delete button
  deleteArticle() {
    if (window.confirm("Er du sikker på at du vil slette denne saken?")) {
      deleteArticleDB(this.state.sak_id).then(res => {
        alert("Saken din er slettet!");
        window.location.reload(true);
      });
    } else {
      // Do nothing
    }
  }

  render() {
    return (
      <div class="card">
        <div class="card-header" id={"headingOne"}>
          <div className="row">
            <h2 class="mb-0">
              <button
                class="btn btn-link"
                type="button"
                data-toggle="collapse"
                data-target={"#collapse" + this.state.sak_id}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                {window.innerWidth <= 325
                  ? this.state.overskrift.substring(0, 10) + "..."
                  : window.innerWidth <= 375
                  ? this.state.overskrift.substring(0, 17) + "..."
                  : window.innerWidth <= 414
                  ? this.state.overskrift.substring(0, 23) + "..."
                  : this.state.overskrift}
              </button>
            </h2>
            <div class="ml-auto">
              <button
                type="button"
                class="btn btn-danger"
                onClick={this.deleteArticle}
              >
                Slett sak
              </button>
            </div>
          </div>
        </div>

        <div
          id={"collapse" + this.state.sak_id}
          class="collapse"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <RegisterForm
              overskrift={this.state.overskrift}
              innhold={this.state.innhold}
              bilde={this.state.bilde}
              kategori_id={this.state.kategori_id}
              viktighet={this.state.viktighet}
              registrer={false}
              sak_id={this.state.sak_id}
              kategorier={this.props.kategorier}
            />
          </div>
        </div>
      </div>
    );
  }
}
