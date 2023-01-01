import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Router, Link } from '@reach/router';

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
const Contact = React.lazy(() => import('../components/contact'));
// const About = React.lazy(() => import('../components/About'));

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
        <span style={headingAccentStyles}>— you just made a Gatsby site! 🎉🎉🎉</span>
      </h1>
    </main>
  )
}

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div>
      <h1>Hi people</h1>
      <Link to="/">Home</Link>
      <br />
      <Link to="/contact/">Contact</Link>
      <br />
      {/* <Link to="/about-us">About Us</Link>
      <br /> */}

      <input />

      <Router>
        <Home path="/" />
        <LazyComponent Component={Contact} path="contact" />
        {/* <LazyComponent Component={About} path="about-us" /> */}
      </Router>
    </div>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
