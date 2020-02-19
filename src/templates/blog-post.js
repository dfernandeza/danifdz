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

  const { html, frontmatter } = data.markdownRemark;

  return (
    <>
      <Header siteTitle="Daniel Fernández" />
      <Layout>
        <SEO title={frontmatter.title} />
        <article className="blog-post">
          <h1>{frontmatter.title}</h1>
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
      frontmatter {
        title
      }
    }
  }
`;

export default Template;
