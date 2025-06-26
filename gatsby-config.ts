import type { GatsbyConfig } from "gatsby";
require('dotenv').config({
  path: `.env`,
});

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: ['user', 'post', 'category'],
  singleTypes: ['header'],
};

const config: GatsbyConfig = {
  siteMetadata: {
    title: `portfolio-2`,
    siteUrl: `https://blog.kconley.com`
  },
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ]
};

export default config;
