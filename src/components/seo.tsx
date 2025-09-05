import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

// The Seo component now accepts props to override default values.
export const Seo = ({ title, description, image, children }) => {
  // Query for the default site metadata from gatsby-config.ts
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
          twitterUsername
        }
      }
    }
  `);

  // Merge default metadata with page-specific props
  const seo = {
    title: title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    image: `${site.siteMetadata.siteUrl}${image || site.siteMetadata.image}`,
    url: site.siteMetadata.siteUrl,
    twitterUsername: site.siteMetadata.twitterUsername,
  };

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* Open Graph tags for social sharing (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      {/* Twitter specific tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={seo.twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      
      {/* Import Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Lora:wght@400&family=Fira+Code&display=swap"
        rel="stylesheet"
      />

      {/* Allows you to add other custom tags */}
      {children}
    </>
  );
};

