import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const ADD_TWEET_LIKE_MUTATION = gql`
  mutation addLikeToTweet($tweetId: ID!) {
    addLikeToTweet(tweetId: $tweetId)
  }
`;

const DELETE_TWEET_LIKE_MUTATION = gql`
  mutation deleteLikeFromTweet($tweetId: ID!) {
    deleteLikeFromTweet(tweetId: $tweetId)
  }
`;

const Button = ({ like, loading, tweet }) => (
  <StyledButton
    type="button"
    iliked={tweet.iliked}
    disabled={loading}
    onClick={() => {
      like({ variables: { tweetId: tweet._id } });
    }}
  >
    <Like iliked={tweet.iliked} />
    {tweet.likes}
  </StyledButton>
);

export const TweetLike = ({ tweet }) =>
  tweet.iliked ? (
    <Mutation mutation={DELETE_TWEET_LIKE_MUTATION}>
      {(like, { loading }) => (
        <Button like={like} loading={loading} tweet={tweet} />
      )}
    </Mutation>
  ) : (
    <Mutation mutation={ADD_TWEET_LIKE_MUTATION}>
      {(like, { loading }) => (
        <Button like={like} loading={loading} tweet={tweet} />
      )}
    </Mutation>
  );

const StyledButton = styled.button`
  color: ${({ iliked }) => (iliked ? "#e0245e" : "#657786")};
  font-size: 12px;

  display: flex;
  align-items: center;

  cursor: pointer;
  border: 0;
  background: transparent;

  transition: fill 0.25s linear;

  &:hover {
    color: #e0245e;
    svg {
      fill: #e0245e;
    }
  }

  svg {
    fill: ${({ iliked }) => (iliked ? "#e0245e" : "#657786")};

    margin-right: 5px;

    transition: fill 0.25s linear;
  }
`;

const Like = ({ iliked }) => (
  <svg
    fill="#657786"
    width="14px"
    height="14px"
    viewBox="0 0 512 512"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    {iliked ? (
      <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" />
    ) : (
      <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z" />
    )}
  </svg>
);
