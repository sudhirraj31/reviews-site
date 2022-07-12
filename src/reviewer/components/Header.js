import * as React from "react";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AppColors from "../../config/colors";

const Header = () => {
  const navigate = useNavigate();
  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();
  const userName = localStorage.getItem("username");
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.clear();
  };
  return (
    <HeaderBar>
      <LogoText onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        Reviews Site
      </LogoText>
      <UserState>
        {isAuthenticated ? (
          <UserLogginState>
            <div>Hello, {userName}</div>
            <div
              onClick={handleLogout}
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                color: AppColors.grey,
              }}
            >
              Log out?
            </div>
          </UserLogginState>
        ) : (
          <div onClick={() => loginWithPopup()} style={{ cursor: "pointer" }}>
            Log In
          </div>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default Header;

const HeaderBar = styled.header`
  background-color: #fff;
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  top: 0;
  align-items: center;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
  font-size: 24px;
`;

const UserState = styled.div`
  margin-left: auto;
  @media (min-width: 480px) {
    margin-right: 40px;
  }
  @media (max-width: 480px) {
    margin-right: 20px;
  }
`;

const UserLogginState = styled.div`
  display: flex;
  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
  }
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;
