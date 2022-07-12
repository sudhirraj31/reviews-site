import React, { useState } from "react";
import { FaThumbsUp, FaRegEye } from "react-icons/fa";
import styled from "styled-components";
import { gql } from "graphql-request";
import { graphcms } from "../../API";

import colors from "../../config/colors";

const MetaData = ({ review }) => {
  let currentLikes = review.like;
  const [like, setLike] = useState(currentLikes);
  const [likeIconColor, setLikeIconColor] = useState(colors.lightgrey);
  const handleLike = (e) => {
    e.stopPropagation();
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
    <MetaInfo>
      <MetaItem>
        <FaRegEye size={24} color={colors.lightgrey} />
        <MetaSpan>{review.view}</MetaSpan>
      </MetaItem>
      <MetaItem onClick={handleLike}>
        <FaThumbsUp size={20} color={likeIconColor} />
        <MetaSpan>{like}</MetaSpan>
      </MetaItem>
      {review.author?.username ? (
        <MetaItem>
          by
          <MetaSpan style={{ fontWeight: "bold" }}>
            {review.author?.username}
          </MetaSpan>
        </MetaItem>
      ) : null}
    </MetaInfo>
  );
};

export default MetaData;

const MetaInfo = styled.div`
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
`;
const MetaItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const MetaSpan = styled.span`
  margin-left: 10px;
  font-size: 20px;
`;
