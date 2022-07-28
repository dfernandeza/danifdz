/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve("src/templates/blog-post.js");

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `
      )
        .then(result => {
          result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            const path = node.frontmatter.path;
            createPage({
              path,
              component: blogPostTemplate,
              context: {
                pathSlug: path,
              },
              // Enable deferred static generation
              // defer: true/false,
            });
          });
        })
        .catch(reject)
    );
  });
};
