import type { GatsbyConfig } from "gatsby";

require('dotenv').config({
  path: `.env`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: ['post', 'category'],
  singleTypes: ['header'],
  alwaysUseMdx: false
};

const config: GatsbyConfig = {
  siteMetadata: {
    // Add default SEO metadata here
    title: `Aether`,
    description: `A sovereign digital platform documenting explorations into technology, consciousness, and the systems that shape our world.`,
    siteUrl: `https://blog.kconley.com`,
    image: `/default-og-image.png`, // A default image for social sharing
    twitterUsername: `@your_twitter_handle`, // Your twitter handle
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ]
};

export default config;
