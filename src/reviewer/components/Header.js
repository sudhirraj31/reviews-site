import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button, SHAPE } from "baseui/button";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { loginWithPopup, logout, user, isAuthenticated } = useAuth0();
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.removeItem("token");
  };
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <h1 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Review Site
          </h1>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        {isAuthenticated ? (
          <StyledNavigationItem>
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              <span style={{ margin: "0 30px", fontWeight: "bold" }}>
                Hello, {user.nickname}
              </span>
              Log out
            </div>
          </StyledNavigationItem>
        ) : (
          <StyledNavigationItem>
            <div onClick={() => loginWithPopup()} style={{ cursor: "pointer" }}>
              Log In
            </div>
          </StyledNavigationItem>
        )}
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Button shape={SHAPE.pill} onClick={() => navigate("/write-review")}>
            Write a Review
          </Button>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};

export default Header;
