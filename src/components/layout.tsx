import React from 'react';
// import ResponsiveAppBar from './header';
import Footer from './footer';
import styled from '@emotion/styled';
import { Link, navigate } from 'gatsby';

const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`

const ChildWrapper = styled.div`
  margin-top: 80px;
`


export default function Layout({ children }) {
  return (
    <Page className='page-wrapper'>
      {/* <ResponsiveAppBar /> */}
      <Link to="/">Home</Link>
      <br />
      <br />
      <Link to="/blog">Blog</Link>
      <br />
      <Link to="/contact">Contact</Link>
      <br />
      <Link to="/components">Components</Link>
      <br />
      <Link to="/countdown">Countdown</Link>
      <ChildWrapper>
        { children }
      </ChildWrapper>
      <Footer />
    </ Page>
  );
}