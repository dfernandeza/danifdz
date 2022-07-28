/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./layout.css";

export default function Layout({ children }) {
  return (
    <Fragment>
      <main className="layout">{children}</main>
      <footer className="footer">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          href="https://twitter.com/dfernandeza"
        >
          Twitter
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          href="https://github.com/dfernandeza"
        >
          Github
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          href="https://www.linkedin.com/in/dfernandeza1/"
        >
          LinkedIn
        </a>

        <small className="footer__text">
          © {new Date().getFullYear()}, Built with{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="footer__text-link"
            href="https://www.gatsbyjs.org"
          >
            Gatsby
          </a>
        </small>
      </footer>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
