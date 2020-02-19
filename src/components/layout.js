/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
// import { useStaticQuery, graphql } from "gatsby";

import "./layout.css";

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `);

  return (
    <>
      <div className="layout">
        <main>{children}</main>
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
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
