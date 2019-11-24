import React, { Component } from "react";
import "../styles/Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <footer className="custom-bg lab_social_icon_footer">
        <hr />
        <link
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
          rel="stylesheet"
        ></link>
        <div className="row mx-5">
          <h5 className="col-sm mx-5 text-center align-self-center">
            Kontakt oss
            <hr className="w-50" />
          </h5>
          <h5 className="col-sm mx-5 text-center align-self-center">
            Sosiale medier
            <hr className="w-50" />
          </h5>
        </div>
        <div className="row mx-5">
          <div className="col-sm mx-5 text-center align-self-center small">
            <div className="row">
              <p className="col-sm">
                <i className="fa fa-home mr-3"></i>
                <a href="https://www.google.com/maps/place/Trondheim/@63.4187959,10.3687233,12z/data=!3m1!4b1!4m5!3m4!1s0x466d319747037e53:0xbf7c8288f3cf3d4!8m2!3d63.4305149!4d10.3950528">
                  {" "}
                  Trondheim, Norge
                </a>
              </p>
              <p className="col-sm">
                <i className="fa fa-envelope mr-3"></i>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=tips@ingNytt.com&su=Tips"
                >
                  tips@ingNytt.com{" "}
                </a>
              </p>
            </div>
            <div className="row">
              <p className="col-sm">
                <i className="fa fa-phone mr-3"></i> + 47 12345678
              </p>
              <p className="col-sm">
                <i className="fa fa-print mr-3"></i> + 47 12345678
              </p>
            </div>
          </div>
          <div className="col-sm mx-5 text-center align-self-center">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                id="social-fb"
                className="fa fa-facebook-square fa-3x social m-2"
              ></i>
            </a>
            <a
              href="https://twitter.com/realDonaldTrump"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                id="social-tw"
                className="fa fa-twitter-square fa-3x social m-2"
              ></i>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                id="social-gp"
                className="fa fa-google-plus-square fa-3x social m-2"
              ></i>
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=suppoty@irish.com&su=THIS-WEBSITE-IS-SICK&body=DearIrishLtd&bcc=irish@ltd.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                id="social-em"
                className="fa fa-envelope-square fa-3x social m-2"
              ></i>
            </a>
          </div>
        </div>
        <div
          className="col text-center py-3 align-self-center justify-content-center"
          style={{ backgroundColor: "#313131" }}
        >
          <hr className="w-100" />
          <p>© 2019 Copyright: IngNytt</p>
          <p>Sitemap | Betingelser og vilkår | Personvern</p>
        </div>
      </footer>
    );
  }
}
