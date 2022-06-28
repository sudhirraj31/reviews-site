import React, { useState } from "react";
import { Card, StyledBody } from "baseui/card";
import { Show } from "baseui/icon";
import { FaRegThumbsUp } from "react-icons/fa";
import styled from "styled-components";
import { gql } from "graphql-request";
import graphcms from "../API";

export default function Review({ review }) {
  let currentLikes = review.like;
  const [like, setLike] = useState(currentLikes);
  const handleLike = () => {
    console.log("like clicked");
    // update like state
    currentLikes++;
    setLike(currentLikes);
    console.log(like);
    // mutation to like with particular review id
    const UPDATE_LIKE = gql`
      mutation {
        updateReview(
          data: { like: ${currentLikes} }
          where: { id: "${review.id}" }
        ) {
          id
          like
        }
      }
    `;
    const PUBLISH_LIKE = gql`
      mutation {
        publishReview(where: { id: "${review.id}" }) {
          like
        }
      }
    `;
    graphcms.request(UPDATE_LIKE).then(graphcms.request(PUBLISH_LIKE));
  };
  return (
    <Wrapper>
      <Card
        overrides={{ Root: { style: { width: "100%" } } }}
        headerImage={review.image?.url}
        title={review.title}
      >
        <StyledBody>{review.body}</StyledBody>
        <Separator></Separator>
        <StyledBody>
          <MetaInfo>
            <MetaData>
              <Show size={24} />
              <MetaSpan>{review.view}</MetaSpan>
            </MetaData>
            <MetaData onClick={handleLike}>
              <FaRegThumbsUp size={20} />
              <MetaSpan>{like}</MetaSpan>
            </MetaData>
            {review.author?.username ? (
              <MetaData>
                by
                <MetaSpan style={{ fontWeight: "bold" }}>
                  {review.author?.username}
                </MetaSpan>
              </MetaData>
            ) : null}
          </MetaInfo>
        </StyledBody>
      </Card>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  margin: 40px auto;
  align-items: center;
`;
const MetaInfo = styled.div`
  display: flex;
  justify-content: space-around;
`;
const MetaData = styled.div`
  display: flex;
  justify-content: center;
`;
const MetaSpan = styled.span`
  margin-left: 10px;
  font-size: 20px;
`;
const Separator = styled.div`
  border-bottom: #ccc 1px solid;
  margin-bottom: 10px;
`;
