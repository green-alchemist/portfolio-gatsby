import * as React from "react"
import { HeadFC, PageProps, navigate } from "gatsby"
import { Router } from '@reach/router';
import styled from "@emotion/styled";
import "../styles/index.css"  // for overwriting default styles



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
  border: 1px solid red;
  /* position: relative;
  top: 20px; */
`

const PageStyles = styled.div`
  color: "#232129";
  padding: 96;
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
    <PageStyles>
      <h1 style={headingStyles}>
        Hello World!
        <br />
        <Styled>- you just made a Styled span! 🎉🎉🎉</Styled>
      </h1>
    </PageStyles>
  )
}

const IndexPage: React.FC<PageProps> = (props) => {
  const [index, setCount ] = React.useState(1)

  return (
    <div>
      <Router>
        <Home path="/" />
        <LazyComponent Component={Contact} path="contact" />
        <LazyComponent Component={Count} path="countdown" />
        <LazyComponent Component={BlogIndex} path="blog" />
      </Router>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
