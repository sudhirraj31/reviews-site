import React from "react";
import styled from "styled-components";
import { Button } from "baseui/button";
import AppColors from "../../config/colors";

function AdminWelcome({ loginWithPopup }) {
  return (
    <Wrapper>
      <Main>
        <WelcomeTitle>
          <h1>Welcome!</h1>
        </WelcomeTitle>
        <WelcomeMessage>
          Here you can approve or reject posted reviews by reviewers.
        </WelcomeMessage>
        <Action>
          <Button onClick={() => loginWithPopup()}>Login as Admin</Button>
        </Action>
      </Main>
    </Wrapper>
  );
}

export default AdminWelcome;

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
