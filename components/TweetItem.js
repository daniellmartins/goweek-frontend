import React from "react";
import styled from "styled-components";

import { TweetLike } from "./";

export const TweetItem = ({ tweet }) => (
  <StyledTweetItem>
    <strong>
      {tweet.author.name} {tweet.author.lastname}
    </strong>
    <p>{tweet.content}</p>
    <TweetLike tweet={tweet} />
  </StyledTweetItem>
);

const StyledTweetItem = styled.div`
  color: #1c2022;

  padding: 16px;
  margin: 0;

  cursor: pointer;
  border-top: 1px solid #e6ecf0;

  transition: background-color 0.25s linear;

  &:hover {
    background-color: #f5f8fa;
  }

  &:first-child {
    margin-top: 0;
    border: 0;
  }

  p {
    margin: 8px 0;
  }
`;
