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

export default () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        <StyledNavigationItem>
          <h1>Review Site</h1>
        </StyledNavigationItem>
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        {isAuthenticated ? (
          <StyledNavigationItem>
            <span style={{ margin: "0 30px", fontWeight: "bold" }}>
              Hello, {user.name}
            </span>
            <StyledLink onClick={() => logout()}>Log out</StyledLink>
          </StyledNavigationItem>
        ) : (
          <StyledNavigationItem>
            <StyledLink onClick={() => loginWithRedirect()}>Log In</StyledLink>
          </StyledNavigationItem>
        )}
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>
          <Link to="/write-review">
            <Button shape={SHAPE.pill}>Write a Review</Button>
          </Link>
        </StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
};
