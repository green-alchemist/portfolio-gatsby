import { createGlobalStyle } from 'styled-components';

// This component will inject global styles into your app
export const GlobalStyles = createGlobalStyle`
  /* 1. Import your chosen fonts from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Lora:wght@400&family=Fira+Code&display=swap');

  /* 2. Apply a modern CSS reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    height: 100%;
  }

  /* 3. Apply your theme variables globally */
  body {
    font-family: ${props => props.theme.fonts.body};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primaryText};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primaryText};
  }

  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    cursor: pointer;
  }

  code {
    font-family: ${props => props.theme.fonts.code};
  }
`;

