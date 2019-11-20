// @flow

import React, { Component } from "react";
import {
  registerArticle,
  getAllArticles,
  updateArticle,
  deleteArticleDB,
  getCategories
} from "../Service.js";
import "../styles/RegisterForm.css";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sak_id: this.props.sak_id,
      overskrift: this.props.overskrift,
      innhold: this.props.innhold,
      bilde: this.props.bilde,
      kategori_id: this.props.kategori_id,
      viktighet: this.props.viktighet,
      registrer: this.props.registrer,
      kategorier: this.props.kategorier
    };
    this.submitRegister = this.submitRegister.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Method for registering news Article
  submitRegister = e => {
    console.log("Submitting form register");
    console.log(this.state.overskrift);

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
  };

  // Method for editing newscase
  submitUpdate() {
    console.log("Submitting update");

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
      <form>
        <div class="form-group mx-5">
          <label>Tittel</label>
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
            <label>Bilde-URL</label>
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
                {this.state.kategori_id == 0
                  ? "Kategori"
                  : this.state.kategorier.find(
                      kategori => kategori.kategori_id == this.state.kategori_id
                    ).kategori_navn}
              </button>
              <div
                class="dropdown-menu category-box"
                aria-labelledby="dropdownMenuButton"
                style={
                  this.state.registrer ? { height: "80px" } : { height: "50px" }
                }
              >
                {this.state.kategorier.map(kategori => (
                  <a
                    class="dropdown-item"
                    onClick={() => {
                      this.setState({ kategori_id: kategori.kategori_id });
                    }}
                  >
                    {kategori.kategori_navn}
                  </a>
                ))}
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
                ></input>{" "}
                2
              </button>
            </div>
          </div>
          <div className="form-group mx-5">
            <label>Legg til din sak</label>
            <br></br>
            <button
              type="button"
              onClick={
                this.state.registrer ? this.submitRegister : this.submitUpdate
              }
              class="btn btn-primary"
              style={{ height: "40px" }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}
