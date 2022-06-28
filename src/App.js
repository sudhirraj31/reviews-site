import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./components/Layout";
import WriteReview from "./pages/WriteReview";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "baseui/button";

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
        </Routes>
        <Routes>
          <Route
            exact
            path="/write-review"
            element={
              isAuthenticated ? (
                <WriteReview />
              ) : (
                <Button onClick={() => loginWithPopup()}>Log In</Button>
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
