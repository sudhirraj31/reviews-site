import React, { useState, useEffect } from "react";
import { gql } from "graphql-request";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { graphcms } from "../../API";

import MetaData from "../components/MetaData";

function ReviewPage() {
  const [review, setReview] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  useEffect(() => {
    const GET_REVIEW = gql`
       {
        review(where: { id: "${params.id}" }) {
          id
          title
          body
          view
          image {
            url
          }
          likedbyusers {
            id
            email
          }
          author {
            email
            id
            username
          }
        }
      }
    `;
    graphcms.request(GET_REVIEW).then((res) => {
      setReview(res.review);
      setLoading(false);
      console.log(res);
    });
  }, []);
  console.log(review);

  // const review = reviews.filter((review) => review.id === param.id)[0];
  return (
    <>
      {loading ? (
        <p>loading...</p>
      ) : (
        <Wrapper>
          <Title>{review.title}</Title>
          <Image src={review.image?.url} />
          <Body>{review.body}</Body>
          <Separator></Separator>
          <MetaData review={review} />
        </Wrapper>
      )}
    </>
  );
}

export default ReviewPage;

const Wrapper = styled.div`
  margin: 40px 20px;
  padding: 0 0px;
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
`;
const CardBodyWrapper = styled.div`
  padding: 0 20px;
`;
const Title = styled.h1`
  text-align: left;
`;
const Body = styled.p`
  color: #000;
`;
const Separator = styled.div`
  border-bottom: #ccc 1px solid;
  margin-bottom: 10px;
`;
