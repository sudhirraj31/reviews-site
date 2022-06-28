import React, { useEffect, useState } from "react";
import { gql } from "graphql-request";
import Review from "../components/Review";

import graphcms from "../API";

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
  useEffect(() => {
    graphcms.request(GET_REVIEWS).then((data) => setReviews(data.reviews));
  }, []);
  console.log(reviews);
  return (
    <div style={{ margin: "0 auto" }}>
      {reviews.map((review) => {
        return <Review key={review.id} review={review} />;
      })}
    </div>
  );
};

export default Home;
