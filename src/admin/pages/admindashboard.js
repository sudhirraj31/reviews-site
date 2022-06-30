import React, { useEffect, useState } from "react";
import { gql } from "graphql-request";

import Review from "../components/Review";
import { graphcms } from "../../API";

const GET_REVIEWS = gql`
  {
    reviews(where: { approve: false }) {
      id
      title
      body
      image {
        id
        url
      }
      author {
        id
        username
      }
    }
  }
`;

const AdminDashboard = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    graphcms.request(GET_REVIEWS).then((data) => setReviews(data.reviews));
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      {reviews.length === 0 ? (
        <h1 style={{ textAlign: "center" }}>No reviews pending!</h1>
      ) : (
        reviews.map((review) => {
          return (
            <Review
              key={review.id}
              review={review}
              reviews={reviews}
              setReviews={setReviews}
            />
          );
        })
      )}
    </div>
  );
};

export default AdminDashboard;
