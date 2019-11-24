// @flow

import React, { Component } from "react";

export default class Alert extends Component<{errorName: string, description: String, onClose: function}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{this.props.errorName}</strong> {this.props.description}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={this.props.onClose}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}
