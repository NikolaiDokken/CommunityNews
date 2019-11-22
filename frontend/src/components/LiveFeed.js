import React, { Component } from "react";
import "../styles/LiveFeed.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { getFrontPageNews } from "../Service";

export default class LiveFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      overskrifter: []
    };
  }

  componentDidMount() {
    getFrontPageNews().then(res => {
      const overskrifter = [res[0], res[1], res[2], res[3], res[4]];
      this.setState({ overskrifter });
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
        <div class="marquee">
          <div><strong>SISTE NYTT</strong></div>
          <p>
            {this.state.overskrifter.map(overskrift => (
              <NavLink className="mr-5" exact to={"/sak/" + overskrift.sak_id} style={{textDecorationLine: "none"}}>
                <text style={{ color: "#1b1b1b", textDecorationStyle: "solid"}}>
                  <strong>
                    {overskrift.tidspunkt.substring(8, 10) +
                      "." +
                      overskrift.tidspunkt.substring(5, 7) +
                      " Kl. " +
                      overskrift.tidspunkt.substring(11, 16)}
                  </strong>
                </text>
                {" - " + overskrift.overskrift}
              </NavLink>
            ))}
          </p>
        </div>
      );
    }
  }
}

function recentNews(props) {
  return (
    <NavLink exact to={"/sak/" + props.id}>
      <div class="card">
        <img class="card-img-top" src={props.bilde} alt="Alt-text"></img>
        <div class="card-body">
          <h5 class="card-title">{props.overskrift}</h5>
          <p class="card-text">{props.innhold}</p>
          <p class="card-text">
            <small class="text-muted">Lagt til: {props.tidspunkt}</small>
          </p>
        </div>
      </div>
    </NavLink>
  );
}
