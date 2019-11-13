import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import axios from "axios";
import {
  registerArticle,
  getAllArticles,
  updateArticle,
  deleteArticleDB
} from "../Service.js";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overskrift: "",
      innhold: "",
      bilde: "",
      kategori: "Kategori",
      viktighet: 1
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Method for submittiting newscase
  submitForm() {
    console.log("Submitting form");
  }

  render() {
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
        <RegisterForm register={true} />
        <Edit />
        <Footer />
      </div>
    );
  }
}

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      overskrift: "",
      innhold: "",
      bilde: "",
      kategori: "Kategori",
      viktighet: 1
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Method for submittiting news Article
  submitForm() {
    console.log("Submitting form register");

    // Check for form errors
    if (this.state.overskrift == "") {
      alert("Artikkelen må ha en overskrift");
      return;
    } else if (this.state.innhold.length < 50) {
      alert("Artikkelens innhold må være lengre enn 50 tegn");
      return;
    } else if (this.state.bilde == "") {
      alert("Artikkelen må ha et bilde");
      return;
    } else if (this.state.kategori == "Kategori") {
      alert("Artikkelen må ha en kategori");
      return;
    }
    registerArticle(this.state)
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("Din sak ble lagt til");
        window.location.hash = "";
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <form>
        <div class="form-group mx-5">
          <label>Tittel</label>
          <input
            name="overskrift"
            onChange={this.handleChange}
            type="text"
            class="form-control"
            placeholder="Skriv inn tittelen til din sak"
          ></input>
          <small id="emailHelp" class="form-text text-muted">
            Denne vil vises på forsiden.
          </small>
        </div>
        <div class="form-group mx-5">
          <label>Beskrivelse</label>
          <textarea
            name="innhold"
            onChange={this.handleChange}
            type="text"
            class="form-control"
            placeholder="Skriv inn det innholdet du ønsker vist i saken"
            rows="5"
          ></textarea>
        </div>
        <div class="row mx-auto justify-content-center">
          <div class="form-group mx-5">
            <label>Bilde-URL</label>
            <input
              name="bilde"
              onChange={this.handleChange}
              type="text"
              class="form-control"
              placeholder="Lim inn en bilde-url her"
            ></input>
          </div>
          <div class="form-group mx-5">
            <label for="exampleInputEmail1">Kategori</label>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.kategori}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  onClick={() => this.setState({ kategori: "Sport" })}
                >
                  Sport
                </a>
                <a
                  class="dropdown-item"
                  onClick={() => this.setState({ kategori: "Religion" })}
                >
                  Religion
                </a>
                <a
                  class="dropdown-item"
                  onClick={() => this.setState({ kategori: "Kultur" })}
                >
                  Kultur
                </a>
              </div>
            </div>
          </div>
          <div class="form-group mx-5">
            <label for="importancyInput">
              Viktighet:&nbsp;
              {this.state.viktighet +
                " " +
                (this.state.viktighet == 1
                  ? "Forsidememateriale"
                  : "Kategorispesifikk artikkel")}
            </label>
            <br></br>
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <button
                class="btn btn-secondary active"
                style={{ width: "80px" }}
                onClick={() => this.setState({ viktighet: 1 })}
              >
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  autocomplete="off"
                  checked
                ></input>
                1
              </button>
              <button
                class="btn btn-secondary"
                style={{ width: "80px" }}
                onClick={() => this.setState({ viktighet: 2 })}
              >
                <input
                  type="radio"
                  name="options"
                  id="option2"
                  autocomplete="off"
                ></input>{" "}
                2
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={this.submitForm.bind(this)}
          class="btn btn-primary mx-5"
        >
          Submit
        </button>
      </form>
    );
  }
}

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      kategori: "Kategori",
      viktighet: 1
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
              <EditCard element={e} />
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Method for editing newscase
  submitForm = e => {
    console.log("Submitting form");

    // Check for form errors
    if (this.state.overskrift == "") {
      alert("Artikkelen må ha en overskrift");
      return;
    } else if (this.state.innhold.length < 50) {
      alert("Artikkelens innhold må være lengre enn 50 tegn");
      return;
    } else if (this.state.bilde == "") {
      alert("Artikkelen må ha et bilde");
      return;
    } else if (this.state.kategori == "Kategori") {
      alert("Artikkelen må ha en kategori");
      return;
    }

    updateArticle(this.state.sak_id, this.state)
      .then(res => {
        alert("Din sak ble oppdatert");
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

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

  activeButton(button, active) {
    const prefix = "btn btn-secondary";
    if (button == active) {
      return prefix + " active";
    } else {
      return prefix;
    }
  }

  render() {
    return (
      <div class="card">
        <div class="card-header" id={"headingOne"}>
          <div className="row custom-width">
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
            <form>
              <div class="form-group mx-5">
                <label for="exampleInputEmail1">Tittel</label>
                <input
                  name="overskrift"
                  onChange={this.handleChange}
                  type="text"
                  class="form-control"
                  placeholder="Skriv inn tittelen til din sak"
                  defaultValue={this.state.overskrift}
                ></input>
                <small id="emailHelp" class="form-text text-muted">
                  Denne vil vises på forsiden.
                </small>
              </div>
              <div class="form-group mx-5">
                <label>Beskrivelse</label>
                <textarea
                  name="innhold"
                  onChange={this.handleChange}
                  type="text"
                  class="form-control"
                  placeholder="Skriv inn det innholdet du ønsker vist i saken"
                  rows="5"
                  defaultValue={this.state.innhold}
                ></textarea>
              </div>
              <div class="row mx-auto justify-content-center">
                <div class="form-group mx-5">
                  <label for="exampleInputEmail1">Bilde-URL</label>
                  <input
                    name="bilde"
                    onChange={this.handleChange}
                    type="text"
                    class="form-control"
                    placeholder="Lim inn en bilde-url her"
                    defaultValue={this.state.bilde}
                  ></input>
                </div>
                <div class="form-group mx-5">
                  <label for="exampleInputEmail1">Kategori</label>
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {this.state.kategori_id == 1
                        ? "Sport"
                        : this.state.kategori_id == 2
                        ? "Religion"
                        : "Kultur"}
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a
                        class="dropdown-item"
                        onClick={() => this.setState({ kategori_id: 1 })}
                      >
                        Sport
                      </a>
                      <a
                        class="dropdown-item"
                        onClick={() => this.setState({ kategori_id: 2 })}
                      >
                        Religion
                      </a>
                      <a
                        class="dropdown-item"
                        onClick={() => this.setState({ kategori_id: 3 })}
                      >
                        Kultur
                      </a>
                    </div>
                  </div>
                </div>
                <div class="form-group mx-5">
                  <label for="importancyInput">
                    Viktighet:&nbsp;
                    {this.state.viktighet +
                      " " +
                      (this.state.viktighet == 1
                        ? "Forsidememateriale"
                        : "Kategorispesifikk artikkel")}
                  </label>
                  <br></br>
                  <div class="btn-group btn-group-toggle" data-toggle="buttons">
                    <button
                      className={this.activeButton(1, this.state.viktighet)}
                      style={{ width: "80px" }}
                      onClick={() => this.setState({ viktighet: 1 })}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        autocomplete="off"
                        checked
                      ></input>
                      1
                    </button>
                    <button
                      className={this.activeButton(2, this.state.viktighet)}
                      style={{ width: "80px" }}
                      onClick={() => this.setState({ viktighet: 2 })}
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        autocomplete="off"
                      ></input>
                      2
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => this.submitForm()}
                class="btn btn-primary mx-5"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
