import React, { Component } from "react";

export default class Alert extends Component<> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>{this.props.errorName}</strong> {this.props.description}
        <button
          type="button"
          class="close"
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
