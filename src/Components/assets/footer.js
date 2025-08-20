import React, { Component } from "react";
import classes from "styles/Footer.module.css";
export class Footer extends Component {
  render() {
    return (
      <footer
        className={classes.footer + " _root page-footer justify-content-center"}
      >
        <p>
          Powered by
          <a href="https://github.com/Sefaria/Sefaria-Project/wiki/API-Documentation">
            {" "}
            Sefaria APIs
          </a>
        </p>
        <p>
          Free background photos from
          <a href="https://pngtree.com/free-backgrounds"> pngtree.com</a>
        </p>
      </footer>
    );
  }
}
