import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Toggle from "../components/toggle";

export default function Header({ siteTitle }) {
  return (
    <header className="page-header">
      <Toggle />
      <div className="page-header__container">
        <Link className="page-header__link text--primary" to="/">
          {siteTitle}
        </Link>
      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};
