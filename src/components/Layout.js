import React from "react";
import styled from "styled-components";

import Header from "./Header";

//components styling
const Main = styled.main`
postion:fixed;
height:calc(100%-185px);
width:100%;
padding:1em;

@media (min-width: 700px) {
flex: 1;
margin: 0 auto;
width: 70%;
CSS | 129
}
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
