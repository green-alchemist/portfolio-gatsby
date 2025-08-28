import { graphql, useStaticQuery } from 'gatsby';

type HeaderData = {
  title: string;
  navigation: {
    id: string;
    title: string;
    path: string;
    isSocial: boolean;
  }[];
};

export const useHeaderData = (): HeaderData => {
  // The useStaticQuery and GraphQL query are now isolated in this hook.
  const data = useStaticQuery(graphql`
    query HeaderDataQuery {
      strapiHeader {
        title
        navigation {
          id
          title
          path
          isSocial
        }
      }
    }
  `);

  // The hook returns only the data the component needs.
  return data.strapiHeader;
};

