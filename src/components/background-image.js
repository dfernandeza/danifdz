import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

const BgImage = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "danifdz.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <BackgroundImage
      Tag="header"
      className="header"
      fluid={data.placeholderImage.childImageSharp.fluid}
      backgroundColor={`#e8e1db`}
    >
      {children}
    </BackgroundImage>
  );
};

BgImage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BgImage;
