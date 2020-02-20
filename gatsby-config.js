module.exports = {
  siteMetadata: {
    title: `danifdz.dev`,
    description: `Personal blog.`,
    author: `@dfernandeza`,
    siteUrl: `https://danifdz.dev`,
    social: {
      twitter: `@dfernandeza`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-37854450-6`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `danifdz.dev`,
        short_name: `danifdz`,
        start_url: `/`,
        background_color: `#e8e1db`,
        theme_color: `#54b3a7`,
        display: `minimal-ui`,
        icon: `src/images/danifdz-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
