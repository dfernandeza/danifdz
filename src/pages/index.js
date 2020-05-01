import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import BgImage from "../components/background-image";

const IndexPage = ({ data }) => {
  const {
    allMarkdownRemark: { edges = [] },
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
        <SEO title="Daniel Fernández - Frontend Developer" />

        <section className="landing">
          <div className="landing__abstract">
            <p>
              A Frontend Developer born in Costa Rica{" "}
              <span role="img" aria-label="Costa Rica">
                🇨🇷
              </span>
              , living in Spain{" "}
              <span aria-label="Spain" role="img">
                🇪🇸
              </span>{" "}
              with 10+ years of experience developing high quality web
              applications and exceptional user experiences for medium and
              large-sized companies.
            </p>
            {/* <p>
              Technologies I've been working with recently:
              <span className="skill skill--html">#HTML</span>
              <span className="skill skill--css">#CSS</span>
              <span className="skill skill--js">#JavaScript</span>
            </p> */}
          </div>

          <div className="featured-list">
            {!!edges.length && <h2>Blog posts</h2>}
            {edges.map(({ node }, index) => (
              <article
                key={`${node.id}-${index}`}
                className="featured-list__item"
              >
                <header>
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
                    {node.frontmatter.date} • 5 min read
                  </small>
                </header>
                <p className="featured-list__item-description">
                  {node.frontmatter.excerpt}
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
