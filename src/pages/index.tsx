import * as React from "react"
import { HeadFC, PageProps, navigate } from "gatsby"
import { Router, Link } from '@reach/router';
import styled from "@emotion/styled";
import "../styles/index.css"  // for overwriting default styles

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}
const Styled = styled.span`
  color: red;
  display: flex;
  justify-content: center;
`

const Contact = React.lazy(() => import('../components/contact'));
const Button = React.lazy(() => import('../components/button'));
const Count = React.lazy(() => import('../components/countdown'));
const BlogIndex = React.lazy(() => import('../templates/blog-index'));

const LazyComponent = ({ Component, ...props }) => (
  <React.Suspense fallback={'<p>Loading...</p>'}>
    <Component {...props} />
  </React.Suspense>
);


const Home: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        Hello World!
        <br />
        <Styled>- you just made a Styled span! 🎉🎉🎉</Styled>
      </h1>
    </main>
  )
}

const IndexPage: React.FC<PageProps> = (props) => {
  const [index, setCount ] = React.useState(1)
  const btnFunc = () => {
    setCount(x => x + 1)
  }

  return (
    <div>
      <Router>
        <Home path="/" />
        {/* <LazyComponent Component={Contact} path="contact" />
        <LazyComponent Component={Button} path="components" counter={index} setCount={btnFunc} />
        <LazyComponent Component={Count} path="countdown" /> */}
        <LazyComponent Component={BlogIndex} path="blog" />
      </Router>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
