import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import BackgroundImage from "gatsby-background-image";

const BgImage = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "danifdz.png" }) {
        childImageSharp {
          fluid(
            maxWidth: 1000
            duotone: { highlight: "#ffffff", shadow: "#000000" }
          ) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
      backgroundColor={`#e2e2e2`}
      fadeIn={`soft`}
      style={{
        height: `auto`,
        width: `100vw`
      }}
    >
      {children}
    </BackgroundImage>
  );
};

BgImage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BgImage;
