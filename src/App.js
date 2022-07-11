import "./App.css";
import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { graphcms } from "./API";
import { gql } from "graphql-request";

import Layout from "./reviewer/components/Layout";
import Home from "./reviewer/pages/home";
import WriteReview from "./reviewer/pages/createreview";
import ReviewPage from "./reviewer/pages/reviewpage";
import AdminDashboard from "./admin/pages/admindashboard";
import ReviewerWelcome from "./reviewer/pages/reviewerwelcome";
import AdminWelcome from "./admin/pages/adminwelcome";

const GET_REVIEWS = gql`
  {
    reviews(where: { approve: true }, orderBy: approve_DESC) {
      id
      title
      body
      image {
        id
        url
      }
      view
      like
      author {
        username
      }
    }
  }
`;

function App() {
  const { isAuthenticated, user, loginWithPopup } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    graphcms.request(GET_REVIEWS).then((data) => setReviews(data.reviews));

    // if logged in
    if (isAuthenticated) {
      const GET_AUTHOR = gql`
    {
      author(where: { email: "${user.email}" }) {
        id
        username
        isAdmin
      }
    }
    `;
      graphcms.request(GET_AUTHOR).then((res) => {
        if (res.author?.isAdmin) localStorage.setItem("admin", true);
        if (res.author === null) {
          const POST_AUTHOR = gql`
            mutation {
              createAuthor(data: {email: "${user.email}", username: "${user.nickname}", isAdmin: false}) {
                id
              }
            }`;
          graphcms.request(POST_AUTHOR).then((res) => {
            const PUBLISH_AUTHOR = gql`
            mutation {
              publishAuthor(where: { id: "${res.createAuthor.id}" }){
                id
                username
              }
            }
          `;
            graphcms.request(PUBLISH_AUTHOR).then((res) => {
              localStorage.setItem("token", res.publishAuthor.id);
              localStorage.setItem("username", res.publishAuthor.username);
            });
          });
        } else {
          localStorage.setItem("token", res.author.id);
          localStorage.setItem("username", res.author.username);
        }
      });
    }
  }, [isAuthenticated]);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={
              isAuthenticated ? (
                <Home reviews={reviews} />
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
          <Route
            path="/reviews/:id"
            element={<ReviewPage reviews={reviews} />}
          />
          {/* Admin pages */}
          <Route
            path="/admin"
            element={
              localStorage.getItem("admin") ? (
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
