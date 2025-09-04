import React, { Suspense, lazy } from "react";
import { Router } from "@reach/router";
import { Link } from "gatsby";

// 1. Import the Countdown component. We will create lazy versions of the others.
import Countdown from "../components/countdown";

// 2. Define the lazy components. React will only load their code when needed.
const Dashboard = lazy(() => import("../components/dashboard"));
const Profile = lazy(() => import("../components/profile"));

// 3. Create a simple wrapper to handle the "Suspense" (loading) state.
const LazyComponent = ({ Component, ...props }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component {...props} />
  </Suspense>
);

const App = () => {
  return (
    <>
      <h1>Your Client-Side App</h1>
      <nav>
        <Link to="/app/dashboard">Dashboard</Link> |{" "}
        <Link to="/app/profile">Profile</Link> |{" "}
        <Link to="/app/countdown">Countdown</Link>
      </nav>
      <Router basepath="/app">
        {/* 4. Use the LazyComponent wrapper for your dynamic routes */}
        <LazyComponent Component={Dashboard} path="/dashboard" />
        <LazyComponent Component={Profile} path="/profile" />
        {/* We can also lazy load existing components */}
        <LazyComponent Component={Countdown} path="/countdown" />
      </Router>
    </>
  );
};

export default App;

