// This object holds all the design tokens from our blueprint.
export const theme = {
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    primaryText: '#E0E0E0',
    secondaryText: '#A0A0A0',
    accent: '#DAA520',
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Lora', serif",
    code: "'Fira Code', monospace",
  },
  fontWeights: {
    regular: 400,
    bold: 700,
  },
  spacing: {
    s: '8px',
    m: '16px',
    l: '24px',
    xl: '32px',
  },
  breakpoints: {
    tablet: '768px',
  },
};

// We'll also export a type for our theme to use with TypeScript
export type ThemeType = typeof theme;

