import React from "react";
import styled from "styled-components";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;

//components styling
const Main = styled.main`
  postion: fixed;
  height: calc(100%-185px);
  width: 100%;

  @media (min-width: 700px) {
    margin: 0 auto;
    padding: 0;
    width: 100%;
  }
`;
