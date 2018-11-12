import React from "react";
import { ApolloConsumer } from "react-apollo";
import cookie from "cookie";
import styled from "styled-components";

import { redirect } from "../lib";

export const Header = () => (
  <StyledHeader>
    <StyledHeaderInner>
      <StyledContainer>
        <ApolloConsumer>
          {client => (
            <Logo
              onClick={() => {
                document.cookie = cookie.serialize("token", "", {
                  maxAge: -1 // Expire the cookie immediately
                });
                client.cache.reset().then(() => {
                  redirect({}, "/");
                });
              }}
              src="/static/twitter.svg"
              alt="[Twitter - Logo]"
            />
          )}
        </ApolloConsumer>
      </StyledContainer>
    </StyledHeaderInner>
  </StyledHeader>
);

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;

  backface-visibility: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const StyledHeaderInner = styled.div`
  position: relative;
  width: 100%;
  height: 46px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 1190px;
  height: 100%;
  margin: 0 auto;
`;

const Logo = styled.img`
  width: 21px;
  height: 21px;
`;
