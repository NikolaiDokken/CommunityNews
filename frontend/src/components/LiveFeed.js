// @flow

import React, { Component } from "react";
import "../styles/LiveFeed.css";
import { NavLink } from "react-router-dom";
import { getFrontPageNews } from "../Service";

export default class LiveFeed extends Component<{},{error: any, isLoaded: boolean, overskrifter: Array<string>}> {
  constructor(props: any) {
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
        <div className="marquee">
          <div><strong>SISTE NYTT</strong></div>
          <p>
            {this.state.overskrifter.map((overskrift, index) => (
              <NavLink className="mr-5" exact to={"/sak/" + overskrift.sak_id} style={{textDecorationLine: "none"}} key={index}>
                <var style={{ color: "#1b1b1b", textDecorationStyle: "solid"}}>
                  <strong>
                    {overskrift.tidspunkt.substring(8, 10) +
                      "." +
                      overskrift.tidspunkt.substring(5, 7) +
                      " Kl. " +
                      overskrift.tidspunkt.substring(11, 16)}
                  </strong>
                </var>
                {" - " + overskrift.overskrift}
              </NavLink>
            ))}
          </p>
        </div>
      );
    }
  }
}
