import React from "react";
// import { Card, StyledBody } from "baseui/card";
import styled from "styled-components";

import MetaData from "./MetaData";

export default function Review({ review }) {
  return (
    <Card>
      <CardImage src={review.image?.url} />
      <CardBodyWrapper>
        <CardTitle>{review.title}</CardTitle>
        <CardBody>{review.body}</CardBody>
      </CardBodyWrapper>
      <Separator></Separator>
      <MetaData review={review} />
    </Card>
  );
}

const Card = styled.div`
  margin: 40px auto;
  padding: 0 0px;
  width: 100%;
`;
const CardImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
`;
const CardBodyWrapper = styled.div`
  padding: 0 20px;
`;
const CardTitle = styled.h1`
  text-align: left;
`;
const CardBody = styled.p`
  color: #000;
`;
const Separator = styled.div`
  border-bottom: #ccc 1px solid;
  margin-bottom: 10px;
`;
