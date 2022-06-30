import React from "react";
import { useParams } from "react-router-dom";

import Review from "../components/Review";

function ReviewPage({ reviews }) {
  const param = useParams();
  const review = reviews.filter((review) => review.id === param.id)[0];
  return <Review review={review} />;
}

export default ReviewPage;
