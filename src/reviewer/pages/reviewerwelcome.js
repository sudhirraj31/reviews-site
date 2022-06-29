import React from "react";
import styled from "styled-components";
import { Button } from "baseui/button";
import AppColors from "../../config/colors";

function Welcome({ loginWithPopup }) {
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
          <Button onClick={() => loginWithPopup()}>Log In as Reviewer</Button>
        </Action>
        <Action>
          <Button onClick={() => loginWithPopup()}>Log In as Admin</Button>
        </Action>
      </Main>
    </Wrapper>
  );
}

export default Welcome;

const Wrapper = styled.div`
  height: 90vh;
  background-color: #fcfcfc;
  display: grid;
  place-items: center;
`;

const Main = styled.div`
  text-align: center;
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
