import React, { useState, useEffect } from "react";
import { gql } from "graphql-request";
import { useParams } from "react-router-dom";

import graphcms from "../../API";
import Review from "../components/Review";

function ReviewPage() {
  const param = useParams();
  const [review, setReview] = useState({});
  const GET_REVIEW = gql`
    {
      review(where: { id: "${param.id}" }) {
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
  useEffect(() => {
    graphcms.request(GET_REVIEW).then((res) => {
      setReview(res.review);
    });
  }, []);

  return <Review review={review} />;
}

export default ReviewPage;
