import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "baseui/button";

import Layout from "./reviewer/components/Layout";
import Home from "./reviewer/pages/home";
import WriteReview from "./reviewer/pages/createreview";
import ReviewPage from "./reviewer/pages/reviewpage";
import AdminDashboard from "./admin/pages/admindashboard";
import Welcome from "./reviewer/pages/reviewerwelcome";

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
                <Welcome loginWithPopup={loginWithPopup} />
              )
            }
          />
          <Route
            path="/write-review"
            element={
              isAuthenticated ? (
                <WriteReview />
              ) : (
                <Welcome loginWithPopup={loginWithPopup} />
              )
            }
          />
          <Route path="/reviews/:id" element={<ReviewPage />} />
          {/* Admin pages */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
