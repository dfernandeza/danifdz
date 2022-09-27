import React from "react";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Toggle from "../components/toggle";
import Layout from "../components/layout";
import SearchEngineOptimization from "../components/seo";
import PartySVG from "../components/party";
import Tags from "../components/tags";
import Card from "../components/card";

const SERIES = ["functional programming"];

function fromNodeToPost(node) {
  const {
    id,
    frontmatter: { date, excerpt, path, tags, title },
    timeToRead,
    excerpt: truncatedExcerpt
  } = node;

  return { id, date, excerpt, path, truncatedExcerpt, tags, timeToRead, title };
}

export default function IndexPage({ data }) {
  const {
    posts: { edges: postEdges = [] },
    series: { group: seriesGroups = [] }
  } = data;

  const posts = [];

  for (const { node } of postEdges) {
    const post = fromNodeToPost(node);
    const postSeries = SERIES.find(
      (s) => post.tags.includes("series") && post.tags.includes(s)
    );

    if (postSeries) {
      const { edges, totalCount } = seriesGroups.find(
        (group) => group.fieldValue === postSeries
      );

      post.series = {
        posts: edges.map(({ node }) => fromNodeToPost(node)),
        count: totalCount
      };
    }

    posts.push(post);
  }

  return (
    <>
      <Toggle />
      <header className="header">
        <h1 className="header__title">
          <span>I'm</span>
          <span className="header__title--name">Daniel</span>
          <span className="header__title--lastname">Fernández</span>
        </h1>
        <div className="nineties-party">
          <PartySVG />
        </div>
      </header>

      <Layout>
        <SearchEngineOptimization title="Daniel Fernández - Frontend Developer" />

        <section className="landing">
          <div className="landing__abstract">
            <div className="avatar">
              <StaticImage
                alt="A picture of Daniel smiling"
                src="../images/me.png"
                width={150}
                loading="eager"
                placeholder="none"
              />
              {/* <svg
                width="150"
                height="150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M147.5 75c0 40.041-32.459 72.5-72.5 72.5-40.04 0-72.5-32.459-72.5-72.5C2.5 34.96 34.96 2.5 75 2.5c40.041 0 72.5 32.46 72.5 72.5Z"
                  fill="#fbc641"
                  stroke="#000"
                  strokeWidth="5"
                />
                <path
                  d="M25.313 82.5c35.077 63.339 95.788 20.48 100.312 0"
                  stroke="#000"
                  strokeWidth="5"
                />
                <path
                  d="M52.5 66.563c5.178 0 9.375-9.235 9.375-20.626 0-11.39-4.197-20.624-9.375-20.624s-9.375 9.234-9.375 20.625c0 11.39 4.197 20.624 9.375 20.624ZM98.438 66.563c5.177 0 9.374-9.235 9.374-20.626 0-11.39-4.197-20.624-9.374-20.624-5.178 0-9.376 9.234-9.376 20.625 0 11.39 4.198 20.624 9.376 20.624Z"
                  fill="#000"
                />
              </svg> */}
            </div>

            <p>
              I've been doing software engineering for 10+ years, during which I
              have gained valuable knowledge and experience developing and
              architecting web applications for small, medium and large sized
              companies. I really enjoy creating high-quality web applications
              using tools like React and NodeJS but I will be happy to jump and
              learn new technologies at any moment.
            </p>
            <p>
              I also enjoy and have experience leading engineering teams and
              working with stakeholders to build successful software products.
            </p>
            <p>
              Currently engineering at{" "}
              <a
                href="https://www.twilio.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Twilio
              </a>
              .
            </p>
          </div>

          <div className="featured-list">
            {!!posts.length && (
              <h2 className="featured-list__title">Learning in public</h2>
            )}

            {posts.map((post, index) => {
              return (
                <article
                  key={`${post.id}-${index}`}
                  className="featured-list__item"
                >
                  <header className="featured-list__itemHeader">
                    <h3>
                      <Link className="featured-list__item-link" to={post.path}>
                        <span className="featured-list__item-link__text">
                          {post.title}
                        </span>
                        <span className="featured-list__item-link__arrow">
                          {" "}
                          →
                        </span>
                      </Link>
                    </h3>
                    <small className="featured-list__item-meta">
                      {/* {post.date} •{" "} */}
                      {post?.series ? (
                        <>
                          {" "}
                          <span roles="img" aria-label="notebook">
                            📒
                          </span>{" "}
                          {post.series.count} blog posts
                        </>
                      ) : (
                        <>
                          <span role="img" aria-label="hourglass">
                            ⌛
                          </span>
                          {post.timeToRead} min read
                        </>
                      )}
                    </small>
                  </header>
                  <p className="featured-list__item-description">
                    {post.excerpt}
                    <Tags tags={post.tags} />
                  </p>
                  {post?.series ? (
                    <ul className="series-list">
                      {post.series.posts.map((s) => {
                        return (
                          <li className="series-list__item">
                            <Link
                              className="series-list__item-link"
                              to={s.path}
                            >
                              <Card
                                title={
                                  <>
                                    <h3>{s.title} </h3>
                                    <small>
                                      <span role="img" aria-label="hourglass">
                                        ⌛
                                      </span>
                                      {s.timeToRead} min read
                                    </small>
                                  </>
                                }
                                text={s.truncatedExcerpt}
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      </Layout>
    </>
  );
}

export const query = graphql`
  query HomepageQuery {
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { published: { ne: false }, parent: { eq: null } }
      }
    ) {
      edges {
        node {
          ...NodeFragment
        }
      }
    }
    series: allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { published: { ne: false }, tags: { eq: "series" } }
      }
    ) {
      group(field: frontmatter___parent) {
        fieldValue
        edges {
          node {
            ...NodeFragment
          }
        }
        totalCount
      }
    }
  }

  fragment NodeFragment on MarkdownRemark {
    id
    timeToRead
    frontmatter {
      title
      path
      date(formatString: "MMM D, Y")
      tags
      excerpt
    }
    excerpt(pruneLength: 120)
  }
`;
