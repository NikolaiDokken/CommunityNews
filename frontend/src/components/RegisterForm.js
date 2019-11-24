// @flow

import React, { Component } from "react";
import { registerArticle, updateArticle } from "../Service.js";
import Alert from "./Alert";
import "../styles/RegisterForm.css";

type Sak = {
  sak_id: number,
  overskrift: string,
  forfatter: string,
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
    brukernavn: string,
    innhold: string,
    bilde: string,
    kategori_id: number,
    viktighet: number,
    tidspunkt: string,
    registrer: boolean,
    kategorier: Array<Kategori>
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      sak_id: this.props.sak.sak_id,
      overskrift: this.props.sak.overskrift,
      brukernavn: this.props.sak.forfatter,
      innhold: this.props.sak.innhold,
      bilde: this.props.sak.bilde,
      kategori_id: this.props.sak.kategori_id,
      viktighet: this.props.sak.viktighet,
      tidspunkt: "",
      registrer: this.props.registrer,
      kategorier: this.props.kategorier,
      inputError: 0
    };
    this.submitRegister = this.submitRegister.bind(this);
    this.submitUpdate = this.submitUpdate.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  componentDidMount() {
    if (!this.props.registrer) {
      var date = new Date();
      this.setState({
        tidspunkt:
          "" +
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds()
      });
    }
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  inputValidation() {
    // Check for form errors
    if (this.state.overskrift === "") {
      this.setState({ inputError: 1 });
      return false;
    } else if (this.state.innhold.length < 50) {
      this.setState({ inputError: 2 });
      return false;
    } else if (this.state.bilde === "") {
      this.setState({ inputError: 3 });
      return false;
    } else if (this.state.kategori_id === 0) {
      this.setState({ inputError: 4 });
      return false;
    } else {
      return true;
    }
  }

  // Method for registering news Article
  submitRegister = () => {
    if (!this.inputValidation()) {
      return;
    }
    registerArticle(this.state)
      .then(res => {
        alert("Din sak ble lagt til");
        window.location.hash = "";
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Method for editing newscase
  submitUpdate = () => {
    if (!this.inputValidation()) {
      return;
    }

    updateArticle(this.state.sak_id, this.state)
      .then(res => {
        alert("Din sak ble oppdatert");
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
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

  resetError() {
    this.setState({ inputError: 0 });
  }

  render() {
    return (
      <form>
        <div className="form-group mx-5">
          {this.state.inputError === 1 ? (
            <Alert
              errorName="Overskrift er tom!"
              description="En artikkel må ha en overskrift"
              onClose={this.resetError}
            />
          ) : null}
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
            Denne vil vises på forsiden, gitt at artikkelen har viktighet 1.
          </small>
        </div>
        <div className="form-group mx-5">
          <label>Brukernavn</label>
          <input
            name="brukernavn"
            onChange={this.handleChange}
            type="text"
            className="form-control"
            placeholder="Skriv inn navnet du vil skal vises på artikkelen"
            defaultValue={this.state.brukernavn}
          ></input>
          <small id="emailHelp" className="form-text text-muted">
            Denne kan også være blank dersom du ønsker å være anonym.
          </small>
        </div>
        <div className="form-group mx-5">
          {this.state.inputError === 2 ? (
            <Alert
              errorName="Tomt innhold!"
              description="En artikkel må ha innhold lengre enn 50 tegn."
              onClose={this.resetError}
            />
          ) : null}
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
            {this.state.inputError === 3 ? (
              <Alert
                errorName="Mangler bilde!"
                description="En artikkel trenger blikkfang"
                onClose={this.resetError}
              />
            ) : null}
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
            {this.state.inputError === 4 ? (
              <Alert
                errorName="Ingen kategori!"
                description="Det må vel gå an å plassere denne artikkelen i en kategori?"
                onClose={this.resetError}
              />
            ) : null}
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
                      kategori =>
                        kategori.kategori_id === this.state.kategori_id
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
