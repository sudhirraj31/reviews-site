import React, { useState } from "react";
import { FaThumbsUp, FaRegEye } from "react-icons/fa";
import styled from "styled-components";
import Gravatar from "react-gravatar";

import { gql } from "graphql-request";
import { graphcms } from "../../API";

import colors from "../../config/colors";

const MetaData = ({ review }) => {
  const userId = localStorage.getItem("token");
  const isUserLiked = review.likedbyusers.filter((_) => _.id === userId);
  let currentLikes = review.likedbyusers.length;
  const [like, setLike] = useState(Boolean(isUserLiked.length));
  const [likeCount, setLikeCount] = useState(review.likedbyusers.length);

  const handleLike = async (e) => {
    e.stopPropagation();
    // update like state
    currentLikes++;
    // mutation to like with particular review id
    const UPDATE_LIKE = gql`
      mutation {
        updateReview(
          data: { like: ${currentLikes}, likedbyusers: {connect: {where: {id: "${userId}"}}} }
          where: { id: "${review.id}" }
        ) {
          id
          like
        }
      }
    `;
    const DELETE_LIKE = gql`
      mutation {
        updateReview(
          data: { like: ${currentLikes}, likedbyusers: {disconnect: {id: "${userId}"}} }
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
    setLike(!like);
    if (like) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    graphcms.request(like ? DELETE_LIKE : UPDATE_LIKE).then(() => {
      graphcms.request(PUBLISH_LIKE);
    });
  };
  return (
    <>
      {Boolean(likeCount) && (
        <MetaLikes>
          <div>
            {review.likedbyusers.map((user) => (
              <Gravatar
                key={user.id}
                email={user.email}
                style={{
                  marginLeft: "-10px",
                  border: "#fff 2px solid",
                  borderRadius: "25px",
                }}
                size={20}
              />
            ))}
          </div>
          <div>{likeCount} people likes this</div>
        </MetaLikes>
      )}
      <Separator></Separator>
      <MetaInfo>
        <MetaItem onClick={handleLike}>
          <FaThumbsUp
            size={20}
            color={like ? colors.primary : colors.lightgrey}
          />
        </MetaItem>
        <MetaItem>
          <FaRegEye size={24} color={colors.lightgrey} />
          <MetaSpan>{review.view}</MetaSpan>
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
    </>
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
const MetaLikes = styled.p`
  margin: 5px 0;
  padding: 0px 20px;
  display: flex;
  align-items: center;
  color: ${colors.lightgrey};
  font-size: 14px;
`;
const Separator = styled.div`
  border-bottom: #ccc 1px solid;
  margin-bottom: 10px;
`;
