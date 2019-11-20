import React, { Component } from "react";
import "../styles/stylesheet.css";
import "../styles/Article.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { getArticle } from "../Service";

export default class Article extends Component<{
  match: { params: { id: number } }
}> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      forfatter: "",
      overskrift: "",
      innhold: "",
      tidspunkt: "",
      bilde: "",
      kategori: "Kategori",
      viktighet: 1
    };
  }

  componentDidMount() {
    getArticle(this.props.match.params.id).then(res => {
      this.setState({
        forfatter: res.forfatter,
        overskrift: res.overskrift,
        innhold: res.innhold,
        tidspunkt: res.tidspunkt,
        bilde: res.bilde
      });
      this.setState({ isLoaded: true });
    });
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Navbar />
          <img className="mt-3" id="image" src={this.state.bilde}></img>
          <div className="text-box">
            <h1>{this.state.overskrift}</h1>
            <p id="info-text">
              Av {this.state.forfatter} |{" "}
              {" " +
                this.state.tidspunkt.substring(8, 10) +
                "." +
                this.state.tidspunkt.substring(5, 7) +
                "." +
                this.state.tidspunkt.substring(0, 4) +
                " Kl. " +
                this.state.tidspunkt.substring(11, 16)}
            </p>
            <p className="mx-auto">{this.state.innhold}</p>
          </div>
        </div>
      );
    }
  }
}
