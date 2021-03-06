// @flow

import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "../styles/stylesheet.css";
import "../styles/Article.css";
import Navbar from "./Navbar";
import Comments from "./Comments";
import Footer from "./Footer";
import { getArticle, updateArticleViews } from "../Service";

type Sak = {
  overskrift: string,
  innhold: string,
  bilde: string,
  forfatter: string,
  tidspunkt: string,
  kategori_navn: string,
  kategori_id: number,
  visninger: number
};

var timeStart: number = 0;
var timeStop: number = 0;

export default class Article extends Component<
  { match: { params: { id: number } } },
  {
    error: any,
    isLoaded: boolean,
    sak: Sak
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      sak: {}
    };
  }

  componentDidMount() {
    timeStart = new Date().getTime();
    getArticle(this.props.match.params.id)
      .then(res => {
        this.setState({
          sak: res.data[0]
        });
        this.setState({ isLoaded: true });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  componentWillUnmount() {
    timeStop = new Date().getTime();
    if (timeStop - timeStart > 10000) {
      updateArticleViews(this.props.match.params.id);
    }
  }

  formatText(text) {
    document.getElementById("articleContent").innerHTML += text;
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
          <img
            className="mt-3"
            id="image"
            src={sak.bilde}
            alt={sak.overskrift}
          ></img>
          <div className="text-box">
            <h1>{sak.overskrift}</h1>
            <div className="row">
              <p className="col" id="info-text">
                Av {sak.forfatter === null ? "Anonym" : sak.forfatter} |{" "}
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
                <NavLink exact to={"/kategori/" + sak.kategori_id}>
                  <span
                    className="badge badge-warning"
                    style={{ height: "25px", width: "110px", fontSize: "15px" }}
                  >
                    {sak.kategori_navn}
                  </span>
                </NavLink>
              </div>

              <div className="ml-auto mr-3">Visninger: {sak.visninger}</div>
            </div>

            <div
              className="mx-auto"
              id="articleContent"
              dangerouslySetInnerHTML={{ __html: sak.innhold }}
            ></div>
          </div>
          <Comments sak_id={this.props.match.params.id}></Comments>
          <Footer></Footer>
        </div>
      );
    }
  }
}
