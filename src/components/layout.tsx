import React from 'react';
import ResponsiveAppBar from './header';
import Footer from './footer';
import styled from '@emotion/styled';
import { Link, navigate } from 'gatsby';
import Components from './button';
import { Router } from '@reach/router';


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

  const [index, setCount ] = React.useState(1)
  const btnFunc = () => {
    setCount(x => x + 1)
  }


  return (
    <Page className='page-wrapper'>
      <ResponsiveAppBar />
      <Link to="/">Home</Link>
      <br />
      <Link to="/blog">Blog</Link>
      <br />
      <Link to="/contact">Contact</Link>
      <br />
      <Link to="/countdown">Countdown</Link>
      <br />
    
      <Components counter={index} setCount={btnFunc}></Components>
      <ChildWrapper>
      {/* <Router>
      </Router> */}

        
        { children }

      </ChildWrapper>
      <Footer />
    </ Page>
  );
}