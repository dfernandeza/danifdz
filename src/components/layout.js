/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { OutboundLink } from "gatsby-plugin-google-gtag";

import "./layout.css";

export default function Layout({ children }) {
  return (
    <Fragment>
      <main className="layout">{children}</main>
      <footer className="footer">
        <OutboundLink
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          href="https://twitter.com/dfernandeza"
        >
          Twitter
        </OutboundLink>
        <OutboundLink
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          href="https://github.com/dfernandeza"
        >
          Github
        </OutboundLink>
        <OutboundLink
          target="_blank"
          rel="noopener noreferrer"
          className="footer__link"
          href="https://www.linkedin.com/in/imdanifdz/"
        >
          LinkedIn
        </OutboundLink>

        <small className="footer__text">© {new Date().getFullYear()}</small>
      </footer>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
