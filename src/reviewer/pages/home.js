import React from "react";
import { gql } from "graphql-request";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

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
      <Cards>
        {reviews.map((review) => {
          return (
            <div
              key={review.id}
              style={{
                cursor: "pointer",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
              onClick={() => handleReviewClick(review)}
            >
              <Review review={review} />
            </div>
          );
        })}
      </Cards>
      <ReviewButton>
        <StyledButton onClick={() => navigate("/write-review")}>
          <FaPlus color="#fff" size={30} />
        </StyledButton>
      </ReviewButton>
    </>
  );
};

export default Home;

const Cards = styled.div`
  margin: 20px auto;
  @media (min-width: 480px) {
    width: 60%;
  }
  @media (max-width: 480px) {
    width: 90%;
  }
`;
const ReviewButton = styled.div`
  position: fixed;
  @media (min-width: 480px) {
    bottom: 30px;
    right: 50px;
  }
  @media (max-width: 480px) {
    bottom: 10px;
    right: 10px;
  }
`;

const StyledButton = styled.button`
  background-color: #000;
  color: white;
  padding: 10px;
  border-radius: 30px;
  cursor: pointer;
`;
