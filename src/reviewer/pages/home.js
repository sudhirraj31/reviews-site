import React from "react";
import { gql } from "graphql-request";
import { useNavigate } from "react-router-dom";

import Review from "../components/Review";
import { graphcms } from "../../API";

const Home = ({ reviews }) => {
  const navigate = useNavigate();
  const handleReviewClick = (review) => {
    navigate(`/reviews/${review.id}`);
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
    });
  };
  return (
    <>
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            style={{ cursor: "pointer", width: "60%", margin: "0 auto" }}
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
