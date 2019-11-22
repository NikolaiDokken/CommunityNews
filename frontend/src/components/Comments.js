import React, { Component } from "react";

import "../styles/Article.css";
import { getComments, postComment } from "../Service";

export default class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      brukernavn: "",
      kommentar: ""
    };
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    getComments(this.props.sak_id).then(comments => {
      this.setState({ comments });
    });
  }

  submitComment() {
    if (this.state.kommentar.length == 0 || this.state.kommentar.length > 200) {
      alert("Kommenarer må være mellom 0 og 200 tegn");
      return;
    } else if (
      this.state.brukernavn == "" ||
      this.state.brukernavn.length > 20
    ) {
      alert("Brukernavn må være mellom 0 og 20 tegn");
      return;
    }
    if (window.confirm("Er du sikker på at du publisere denne kommentaren?")) {
      postComment(this.props.sak_id, this.state).then(res => {
        window.location.reload();
      });
    } else {
      // Do nothing
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="text-box mt-5">
        <form>
          <div class="form-group">
            <label>Brukernavn</label>
            <input
              name="brukernavn"
              onChange={this.handleChange}
              type="text"
              class="form-control"
              placeholder="Dette vil vises sammen med din kommentar"
            ></input>
          </div>
          <div class="form-group">
            <label>Kommentar</label>
            <textarea
              name="kommentar"
              onChange={this.handleChange}
              type="text"
              class="form-control"
              placeholder="Skriv inn din kommentar"
              rows="3"
            ></textarea>
            <small>{this.state.kommentar.length}/200</small>
          </div>
          <div className="form-group">
            <button
              type="button"
              onClick={this.submitComment}
              class="btn btn-primary"
              style={{ height: "40px" }}
            >
              Post
            </button>
          </div>
        </form>
        <h3>Kommentarer</h3>

        {this.state.comments.map(kommentar => (
          <div class="card mb-3">
            <div class="card-header">
              <strong>{kommentar.brukernavn}</strong>
            </div>
            <div class="card-body p-2">
              <p>{kommentar.kommentar}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
