// @flow

import React, { Component } from "react";
import {
  registerArticle,
  updateArticle,
} from "../Service.js";
import "../styles/RegisterForm.css";

type Sak = {
  sak_id: number,
  overskrift: string,
  innhold: string,
  bilde: string,
  kategori_id: number,
  viktighet: number
};

type Kategori = { kategori_id: number, kategori_navn: string };

export default class RegisterForm extends Component<
  {
    kategorier: Array<Kategori>,
    sak: Sak,
    registrer: boolean
  },
  {
    sak_id: number,
    overskrift: string,
    innhold: string,
    bilde: string,
    kategori_id: number,
    viktighet: number,
    registrer: boolean,
    kategorier: Array<Kategori>
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      sak_id: this.props.sak.sak_id,
      overskrift: this.props.sak.overskrift,
      innhold: this.props.sak.innhold,
      bilde: this.props.sak.bilde,
      kategori_id: this.props.sak.kategori_id,
      viktighet: this.props.sak.viktighet,
      registrer: this.props.registrer,
      kategorier: this.props.kategorier
    };
    this.submitRegister = this.submitRegister.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Method for registering news Article
  submitRegister = () => {
    // Check for form errors
    if (this.state.overskrift === "") {
      alert("Artikkelen må ha en overskrift");
      return;
    } else if (this.state.innhold.length < 50) {
      alert("Artikkelens innhold må være lengre enn 50 tegn");
      return;
    } else if (this.state.bilde === "") {
      alert("Artikkelen må ha et bilde");
      return;
    } else if (this.state.kategori_id === 0) {
      alert("Artikkelen må ha en kategori");
      return;
    }
    registerArticle(this.state)
      .then(res => {
        alert("Din sak ble lagt til");
        window.location.hash = "";
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  // Method for editing newscase
  submitUpdate = () => {
    console.log("Submitting update");

    // Check for form errors
    if (this.state.overskrift === "") {
      alert("Artikkelen må ha en overskrift");
      return;
    } else if (this.state.innhold.length < 50) {
      alert("Artikkelens innhold må være lengre enn 50 tegn");
      return;
    } else if (this.state.bilde === "") {
      alert("Artikkelen må ha et bilde");
      return;
    } else if (this.state.kategori_id === 0) {
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

  activeButton(button: number, active: number) {
    const prefix = "btn btn-secondary";
    if (button === active) {
      return prefix + " active";
    } else {
      return prefix;
    }
  }

  render() {
    return (
      <form>
        <div className="form-group mx-5">
          <label>Tittel</label>
          <input
            name="overskrift"
            onChange={this.handleChange}
            type="text"
            className="form-control"
            placeholder="Skriv inn tittelen til din sak"
            defaultValue={this.state.overskrift}
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            Denne vil vises på forsiden.
          </small>
        </div>
        <div className="form-group mx-5">
          <label>Beskrivelse</label>
          <textarea
            name="innhold"
            onChange={this.handleChange}
            type="text"
            className="form-control"
            placeholder="Skriv inn det innholdet du ønsker vist i saken"
            rows="5"
            defaultValue={this.state.innhold}
          ></textarea>
        </div>
        <div className="row mx-auto justify-content-center">
          <div className="form-group mx-5">
            <label>Bilde-URL</label>
            <input
              name="bilde"
              onChange={this.handleChange}
              type="text"
              className="form-control"
              placeholder="Lim inn en bilde-url her"
              defaultValue={this.state.bilde}
            ></input>
          </div>
          <div className="form-group mx-5">
            <label>Kategori</label>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.kategori_id === 0
                  ? "Kategori"
                  : this.state.kategorier.find(
                      kategori => kategori.kategori_id === this.state.kategori_id
                    ).kategori_navn}
              </button>
              <div
                className="dropdown-menu category-box"
                aria-labelledby="dropdownMenuButton"
                style={
                  this.state.registrer ? { height: "80px" } : { height: "50px" }
                }
              >
                {this.state.kategorier.map(kategori => (
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      this.setState({ kategori_id: kategori.kategori_id });
                    }}
                    key={kategori.kategori_id}
                  >
                    {kategori.kategori_navn}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="form-group mx-5">
            <label>
              Viktighet:&nbsp;
              {this.state.viktighet +
                " " +
                (this.state.viktighet === 1
                  ? "Forsidememateriale"
                  : "Kategorispesifikk artikkel")}
            </label>
            <br></br>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <button
                className={this.activeButton(1, this.state.viktighet)}
                style={{ width: "80px" }}
                onClick={() => this.setState({ viktighet: 1 })}
              >
                <input
                  type="radio"
                  name="options"
                  id="option1"
                  autoComplete="off"
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
                  autoComplete="off"
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
              className="btn btn-primary"
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
