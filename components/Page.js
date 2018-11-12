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
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    font-family: sans-serif;
    box-sizing: border-box;
  }
  
  body {
    color: #14171a;
    font-size: 14px;
    line-height: 20px;
    font-family: "Segoe UI", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #e6ecf0;
    overflow-y: scroll;
  }

  html,
  body,
  #__next {
    height: 100%;
  }

  button {
    outline: none;
  }
`;
