import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  /* The @import rule has been removed from here.
    The fonts are now loaded by the Seo component.
  */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primaryText};
    font-family: ${({ theme }) => theme.fonts.body};
    line-height: 1.6;
    transition: background-color 0.3s, color 0.3s;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.primaryText};
  }

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }

  code {
    font-family: ${({ theme }) => theme.fonts.code};
  }
`;