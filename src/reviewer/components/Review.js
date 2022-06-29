import React, { useState } from "react";
import { Card, StyledBody } from "baseui/card";
import { FaThumbsUp, FaRegEye } from "react-icons/fa";
import styled from "styled-components";
import { gql } from "graphql-request";
import graphcms from "../../API";

import colors from "../../config/colors";

export default function Review({ review }) {
  let currentLikes = review.like;
  const [like, setLike] = useState(currentLikes);
  const [likeIconColor, setLikeIconColor] = useState(colors.lightgrey);
  const handleLike = () => {
    // update like state
    currentLikes++;
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
    graphcms.request(UPDATE_LIKE).then(() => {
      graphcms.request(PUBLISH_LIKE);
      setLike(currentLikes);
      setLikeIconColor(colors.primary);
    });
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
              <FaRegEye size={24} color={colors.lightgrey} />
              <MetaSpan>{review.view}</MetaSpan>
            </MetaData>
            <MetaData onClick={handleLike}>
              <FaThumbsUp size={20} color={likeIconColor} />
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
