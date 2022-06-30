import React, { useEffect, useState } from "react";
import { gql } from "graphql-request";
import { useNavigate } from "react-router-dom";

import Review from "../components/Review";
import { graphcms } from "../../API";

const GET_REVIEWS = gql`
  {
    reviews(where: { approve: true }) {
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

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    graphcms.request(GET_REVIEWS).then((data) => setReviews(data.reviews));
  }, []);
  const handleReviewClick = (review) => {
    let currentViews = review.view;
    // update view state
    currentViews++;
    // mutation to view with particular review id
    const UPDATE_VIEW = gql`
      mutation {
        updateReview(
          data: { view: ${currentViews} }
          where: { id: "${review.id}" }
        ) {
          id
          view
        }
      }
    `;
    const PUBLISH_VIEW = gql`
      mutation {
        publishReview(where: { id: "${review.id}" }) {
          view
        }
      }
    `;
    graphcms.request(UPDATE_VIEW).then(() => {
      graphcms.request(PUBLISH_VIEW);
      navigate(`/reviews/${review.id}`);
    });
  };
  return (
    <>
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            style={{ cursor: "pointer" }}
            onClick={() => handleReviewClick(review)}
          >
            <Review review={review} />
          </div>
        );
      })}
    </>
  );
};

export default Home;
