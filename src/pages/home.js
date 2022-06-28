import React, { useEffect, useState } from "react";
import { gql } from "graphql-request";
import Review from "../components/Review";

import graphcms from "../API";
import { useNavigate } from "react-router-dom";

const GET_REVIEWS = gql`
  {
    reviews {
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
    console.log(currentViews);
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
  console.log(reviews);
  return (
    <div style={{ margin: "0 auto" }}>
      {reviews.map((review) => {
        return (
          <div key={review.id} onClick={() => handleReviewClick(review)}>
            <Review review={review} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
