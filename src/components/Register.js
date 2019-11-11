import React, { Component } from "react";
import Navbar from "./Navbar.js";
import Footer from "./Footer.js";
import axios from "axios";

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

  // Method for submittiting newscase
  submitForm() {
    console.log("Submitting form");

    axios
      .post("http://localhost:8080/sak", this.state)
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
          <label for="exampleInputEmail1">Tittel</label>
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
        <div class="row mx-5">
          <div class="form-group">
            <label for="exampleInputEmail1">Bilde-URL</label>
            <input
              name="bilde"
              onChange={this.handleChange}
              type="text"
              class="form-control"
              placeholder="Lim inn en bilde-url her"
            ></input>
          </div>
          <div class="form-group mx-auto">
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
          <div class="form-group mx-auto">
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
    axios.get("http://localhost:8080/sak").then(res => {
      const items = res.data;
      console.log(items);
      this.setState({ items });
      this.setState({ isLoaded: true });
    });
  }

  submitForm(props) {
    console.log("Submitting form");

    axios
      .put("http://localhost:8080/sak/" + props.sak_id, props)
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("Din sak ble oppdatert");
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editCard(props) {}

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
    console.log("Editing article form");
    axios
      .put("http://localhost:8080/sak/" + this.state.sak_id, this.state)
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("Din sak ble oppdatert");
        window.location.reload();
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  deleteArticle() {
    const sleep = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };

    if (window.confirm("Er du sikker på at du vil slette denne saken?")) {
      axios
        .delete("http://localhost:8080/sak/" + this.state.sak_id)
        .then(res => {
          console.log(res);
        });
      alert("Saken din er slettet!");
      sleep(500).then(() => {
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
                {this.state.overskrift}
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
              <div class="row mx-5">
                <div class="form-group">
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
                      class="btn btn-secondary active"
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
