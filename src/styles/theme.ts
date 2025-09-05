// The shape of the theme object
export interface Theme {
  colors: {
    background: string;
    surface: string;
    primaryText: string;
    secondaryText: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
    code: string;
  };
  fontWeights: {
    regular: number;
    bold: number;
  };
  spacing: {
    s: string;
    m: string;
    l: string;
    xl: string;
  };
  breakpoints: {
    tablet: string;
    desktop: string;
  };
}

// The dark theme configuration
export const darkTheme: Theme = {
  colors: {
    background: "#121212",
    surface: "#1E1E1E",
    primaryText: "#E0E0E0",
    secondaryText: "#A0A0A0",
    accent: "#DAA520",
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Lora, serif",
    code: "Fira Code, monospace",
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
    desktop: '1024px',
  },
};

// The new light theme configuration
export const lightTheme: Theme = {
  colors: {
    background: "#FFFFFF",
    surface: "#F2F2F2",
    primaryText: "#121212",
    secondaryText: "#555555",
    accent: "#B8860B", // A slightly darker gold for better contrast on light bg
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Lora, serif",
    code: "Fira Code, monospace",
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
    desktop: '1024px',
  },
};

