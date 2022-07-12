import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import MetaData from "../components/MetaData";

function ReviewPage({ reviews }) {
  const param = useParams();
  const review = reviews.filter((review) => review.id === param.id)[0];
  return (
    <Wrapper>
      <Title>{review.title}</Title>
      <Image src={review.image?.url} />
      <Body>{review.body}</Body>
      <Separator></Separator>
      <MetaData review={review} />
    </Wrapper>
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
  object-fit: cover;
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
