import React, { Component } from "react";
import "../styles/LiveFeed.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

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
    axios.get("http://localhost:8080/viktighet/1").then(res => {
      const overskrifter = res.data;
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
          <div>SISTE NYTT</div>
          <p>
            {this.state.overskrifter.map(overskrift => (
              <NavLink className="mr-5" exact to={"/sak/" + overskrift.sak_id}>
                {overskrift.overskrift}
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
