import React from "react";
import { graphql } from "gatsby";

import Header from "../components/header";
import Layout from "../components/layout";
import SEO from "../components/seo";

import NotFoundPage from "../pages/404";

const Template = ({ data }) => {
  if (data.markdownRemark === null) {
    return <NotFoundPage />;
  }

  const { html, timeToRead, excerpt, frontmatter } = data.markdownRemark;

  return (
    <>
      <Header siteTitle="Daniel Fernández" />
      <Layout>
        <SEO
          title={frontmatter.title}
          description={frontmatter.excerpt || excerpt}
          thumbnail={frontmatter.thumbnail}
        />
        <article className="blog-post">
          <h1>
            {frontmatter.title}
            <time className="time-to-read" dateTime={`PT${timeToRead}M`}>
              <span role="img" aria-label="hourglass">
                ⌛
              </span>{" "}
              {timeToRead} min read
            </time>
          </h1>

          <div dangerouslySetInnerHTML={{ __html: html }} />
        </article>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(
      frontmatter: { path: { eq: $pathSlug }, published: { ne: false } }
    ) {
      html
      timeToRead
      excerpt(pruneLength: 160)
      frontmatter {
        title
        excerpt
        thumbnail {
          childImageSharp {
            sizes(maxWidth: 300) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;

export default Template;
