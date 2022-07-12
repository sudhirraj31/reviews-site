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
  margin: 0 auto;
  top: 80px;
  position: fixed;
  width: 100%;
  height: calc(100% - 80px);
  overflow-y: scroll;
`;
