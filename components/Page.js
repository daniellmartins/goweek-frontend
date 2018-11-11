import React from "react";
import styled, { createGlobalStyle } from "styled-components";

export const Page = ({ children }) => (
  <StyledPage>
    {children}
    <StyledGlobal />
  </StyledPage>
);

const StyledPage = styled.div`
  min-height: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const StyledGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body,
  #__next {
    min-height: 100%;
  }

  button {
    outline: none;
  }
`;
