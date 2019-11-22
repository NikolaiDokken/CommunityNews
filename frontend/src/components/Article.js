import React, { Component } from "react";
import "../styles/stylesheet.css";
import "../styles/Article.css";
import Navbar from "./Navbar";
import Comments from "./Comments";
import Footer from "./Footer";
import axios from "axios";
import { getArticle, updateArticleViews } from "../Service";

export default class Article extends Component<{
  match: { params: { id: number } }
}> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sak: []
    };
  }

  updateViews() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 10000);
    });
  }

  componentDidMount() {
    getArticle(this.props.match.params.id).then(res => {
      this.setState({
        sak: res
      });
      console.log("sakID" + res.sak_id);
      this.setState({ isLoaded: true });
    });
    this.updateViews().then(() => {
      updateArticleViews(this.props.match.params.id);
    });
  }

  render() {
    const { error, isLoaded, sak } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <Navbar />
          <img className="mt-3" id="image" src={sak.bilde}></img>
          <div className="text-box">
            <h1>{sak.overskrift}</h1>
            <div className="row">
              <p className="col" id="info-text">
                Av {sak.forfatter} |{" "}
                {" " +
                  sak.tidspunkt.substring(8, 10) +
                  "." +
                  sak.tidspunkt.substring(5, 7) +
                  "." +
                  sak.tidspunkt.substring(0, 4) +
                  " Kl. " +
                  sak.tidspunkt.substring(11, 16)}
              </p>
              <div className="col">
                <span
                  className="badge badge-warning"
                  style={{ height: "25px", width: "110px", fontSize: "15px" }}
                >
                  {sak.kategori_navn}
                </span>
              </div>

              <div className="ml-auto">Visninger: {sak.visninger}</div>
            </div>

            <p className="mx-auto">{sak.innhold}</p>
          </div>
          <Comments sak_id={this.props.match.params.id}></Comments>
        </div>
      );
    }
  }
}
