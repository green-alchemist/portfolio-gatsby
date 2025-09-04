import React from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import ResponsiveAppBar from './header';
import Footer from './footer';
import Components from './button';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex-grow: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} ${props => props.theme.spacing.l};
`;

// This empty div acts as a spacer to push content below the fixed header
const HeaderSpacer = styled.div`
  height: 64px; 
`;

export default function Layout({ children }) {
  const [index, setCount ] = React.useState(1)
  const btnFunc = () => {
    setCount(x => x + 1)
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PageContainer>
        <ResponsiveAppBar />
        <HeaderSpacer /> 
        <Components counter={index} setCount={btnFunc}></Components>

        <MainContent>
          {children}
        </MainContent>
        <Footer />
      </PageContainer>
    </ThemeProvider>
  );
}

