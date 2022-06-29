import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "baseui/button";

import Layout from "./reviewer/components/Layout";
import Home from "./reviewer/pages/home";
import WriteReview from "./reviewer/pages/WriteReview";
import ReviewPage from "./reviewer/pages/reviewPage";

function App() {
  const { isAuthenticated, loginWithPopup } = useAuth0();

  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (
                <Home />
              ) : (
                <Button onClick={() => loginWithPopup()}>Log In</Button>
              )
            }
          />
          <Route
            path="/write-review"
            element={
              isAuthenticated ? (
                <WriteReview />
              ) : (
                <Button onClick={() => loginWithPopup()}>Log In</Button>
              )
            }
          />
          <Route path="/reviews/:id" element={<ReviewPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
