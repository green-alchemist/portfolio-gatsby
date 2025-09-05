import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ResponsiveAppBar from './header';
import Footer from './footer';
import { GlobalStyles } from '../styles/GlobalStyles';
import { lightTheme, darkTheme } from '../styles/theme';
import { ThemeContextProvider, useThemeContext } from '../context/ThemeContext';
import { Seo } from './seo'; // 1. Import the new Seo component

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primaryText};
  transition: background-color 0.3s, color 0.3s;
`;

const ContentWrapper = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
`;

const Spacer = styled.div`
  height: 64px;
`;

const ThemedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeContext();

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {/* 2. Add the Seo component here */}
      <Seo title="Portfolio" />
      <GlobalStyles />
      <Page>
        <ResponsiveAppBar />
        <Spacer />
        <ContentWrapper>
          {children}
        </ContentWrapper>
        <Footer />
      </Page>
    </ThemeProvider>
  );
};

export default function Layout({ children }) {
  return (
    <ThemeContextProvider>
      <ThemedLayout>{children}</ThemedLayout>
    </ThemeContextProvider>
  );
}

