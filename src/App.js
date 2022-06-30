import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "baseui/button";

import Layout from "./reviewer/components/Layout";
import Home from "./reviewer/pages/home";
import WriteReview from "./reviewer/pages/createreview";
import ReviewPage from "./reviewer/pages/reviewpage";
import AdminDashboard from "./admin/pages/admindashboard";
import ReviewerWelcome from "./reviewer/pages/reviewerwelcome";
import { graphcms } from "./API";
import { gql } from "graphql-request";
import AdminWelcome from "./admin/pages/adminwelcome";

function App() {
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  console.log(isAuthenticated);
  if (isAuthenticated) {
    console.log("executed!");
    const GET_AUTHOR = gql`
    {
      author(where: { email: "${user.email}" }) {
        id
        isAdmin
      }
    }
    `;
    graphcms.request(GET_AUTHOR).then((res) => {
      console.log(res, user);
      if (res.author?.isAdmin) setIsAdmin(true);
      if (res.author === null) {
        console.log("have to create user");
        const POST_AUTHOR = gql`
            mutation {
              createAuthor(data: {email: "${user.email}", username: "${user.nickname}", isAdmin: false}) {
                id
              }
            }`;
        graphcms.request(POST_AUTHOR).then((res) => {
          console.log("created author");
          const PUBLISH_AUTHOR = gql`
            mutation {
              publishAuthor(where: { id: "${res.createAuthor.id}" }){
                id
              }
            }
          `;
          graphcms.request(PUBLISH_AUTHOR).then((res) => {
            console.log("published author");
            localStorage.setItem("token", res.publishAuthor.id);
          });
        });
      } else {
        localStorage.setItem("token", res.author.id);
      }
    });
  }
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
                <ReviewerWelcome loginWithPopup={loginWithPopup} />
              )
            }
          />
          <Route
            path="/write-review"
            element={
              isAuthenticated ? (
                <WriteReview />
              ) : (
                <ReviewerWelcome loginWithPopup={loginWithPopup} />
              )
            }
          />
          <Route path="/reviews/:id" element={<ReviewPage />} />
          {/* Admin pages */}
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <AdminDashboard />
              ) : (
                <AdminWelcome loginWithPopup={loginWithPopup} />
              )
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
