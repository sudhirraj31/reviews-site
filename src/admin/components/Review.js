import * as React from "react";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button, SHAPE } from "baseui/button";
import styled from "styled-components";
import AppColors from "../../config/colors";

import { gql } from "graphql-request";
import { graphcms } from "../../API";

const Review = ({ reviews, review, setReviews }) => {
  const UPDATE_REVIEW = gql`
      mutation {
        updateReview(
          data: { approve: true }
          where: { id: "${review.id}" }
        ) {
          id
        }
      }
    `;
  const DELETE_REVIEW = gql`
    mutation {
      deleteReview(where: { id: "${review.id}" }) {
        id
      }
    }
  `;
  const PUBLISH_REVIEW = gql`
      mutation {
        publishReview(where: { id: "${review.id}" }) {
          id
        }
      }
    `;
  const handleApprove = () => {
    graphcms
      .request(UPDATE_REVIEW)
      .then(() => {
        graphcms.request(PUBLISH_REVIEW);
      })
      .then(() => {
        setReviews(reviews.filter((_) => _.id !== review.id));
      });
  };
  const handleReject = () => {
    graphcms.request(DELETE_REVIEW).then(() => {
      setReviews(reviews.filter((_) => _.id !== review.id));
    });
  };
  return (
    <Wrapper>
      <Card
        overrides={{ Root: { style: { width: "70%", margin: "0 auto" } } }}
        headerImage={review.image?.url}
        title={review.title}
      >
        <StyledBody>{review.body}</StyledBody>
        <Separator></Separator>
        <StyledAction>
          <ActionButton>
            <Button
              overrides={{
                BaseButton: {
                  style: { width: "20%", backgroundColor: AppColors.success },
                },
              }}
              shape={SHAPE.pill}
              onClick={handleApprove}
            >
              <FaCheckCircle size={20} color="#fff" />
              Approve
            </Button>
            <Button
              overrides={{
                BaseButton: {
                  style: { width: "20%", backgroundColor: AppColors.failed },
                },
              }}
              shape={SHAPE.pill}
              onClick={handleReject}
            >
              <FaTimesCircle size={20} color="#fff" />
              Reject
            </Button>
          </ActionButton>
        </StyledAction>
      </Card>
    </Wrapper>
  );
};
export default Review;

// styling
const Wrapper = styled.div`
  margin: 40px auto;
  align-items: center;
`;
const ActionButton = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Separator = styled.div`
  border-bottom: #ccc 1px solid;
  margin-bottom: 10px;
`;
