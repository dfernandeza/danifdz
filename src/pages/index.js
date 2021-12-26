import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SearchEngineOptimization from "../components/seo";
import BgImage from "../components/background-image";
import Tags from "../components/tags";

const IndexPage = ({ data }) => {
  const {
    allMarkdownRemark: { edges = [] }
  } = data;

  return (
    <>
      <BgImage>
        <div className="header__container">
          <h1 className="header__title text--primary">I'm</h1> <br />
          <h1 className="header__title header__title--name text--primary">
            Daniel
          </h1>{" "}
          <br />
          <h1 className="header__title header__title--lastname text--primary">
            Fernández
          </h1>
        </div>
      </BgImage>

      <Layout>
        <SearchEngineOptimization title="Daniel Fernández - Frontend Developer" />

        <section className="landing">
          <div className="landing__abstract">
            <p>
              A software engineer with 10+ years of experience developing high quality web applications and exceptional user experiences for medium and large-sized companies.
            </p>
            <p>
              Currently engineering at{" "}
              <a
                href="https://newrelic.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                New Relic
              </a>
              .
            </p>
          </div>

          <div className="featured-list">
            {!!edges.length && (
              <h2 className="featured-list__title">Learning in public</h2>
            )}
            {edges.map(({ node }, index) => (
              <article
                key={`${node.id}-${index}`}
                className="featured-list__item"
              >
                <header className="featured-list__itemHeader">
                  <h3>
                    <Link
                      className="featured-list__item-link"
                      to={node.frontmatter.path}
                    >
                      <span className="featured-list__item-link__text">
                        {node?.frontmatter?.title}
                      </span>
                      <span className="featured-list__item-link__arrow">
                        {" "}
                        →
                      </span>
                    </Link>
                  </h3>
                  <small className="featured-list__item-meta">
                    {/* {node.frontmatter.date} •{" "} */}
                    <span role="img" aria-label="hourglass">
                      ⌛
                    </span>
                    {node.timeToRead} min read
                  </small>
                </header>
                <p className="featured-list__item-description">
                  {node.frontmatter.excerpt}
                  <Tags tags={node.frontmatter.tags} />
                </p>
              </article>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
};

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            path
            date(formatString: "MMM D, Y")
            tags
            excerpt
          }
        }
      }
    }
  }
`;

export default IndexPage;
