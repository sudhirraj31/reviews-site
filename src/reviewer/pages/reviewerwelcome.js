import React from "react";
import styled from "styled-components";
import { Button } from "baseui/button";
import AppColors from "../../config/colors";
import { useNavigate } from "react-router-dom";

function ReviewerWelcome({ loginWithPopup }) {
  const navigate = useNavigate();
  const handleReviewerLogin = () => {
    loginWithPopup().then(() => {
      localStorage.setItem("auth", true);
      navigate("/");
    });
  };
  const handleAdminLogin = () => {
    loginWithPopup().then(() => {
      localStorage.setItem("auth", true);
      navigate("/admin");
    });
  };
  return (
    <Wrapper>
      <Main>
        <WelcomeTitle>
          <h1>Welcome!</h1>
        </WelcomeTitle>
        <WelcomeMessage>
          Write your thoughts about any product. It'll help others.
        </WelcomeMessage>
        <Action>
          <Button onClick={handleReviewerLogin}>Login as Reviewer</Button>
        </Action>
        <Action>
          <Button onClick={handleAdminLogin}>Login as Admin</Button>
        </Action>
      </Main>
    </Wrapper>
  );
}

export default ReviewerWelcome;

const Wrapper = styled.div`
  height: 80vh;
  background-color: #fcfcfc;
  display: grid;
  place-items: center;
`;

const Main = styled.div`
  text-align: center;
  padding: 40px 80px;
  border: #888888 1px solid;
  box-shadow: 5px 5px #888888;
`;

const WelcomeTitle = styled.div`
  margin: 10px auto;
`;
const WelcomeMessage = styled.div`
  margin-bottom: 50px;
  color: ${AppColors.grey};
`;
const Action = styled.div`
  margin: 10px auto;
`;
