import React, { Component } from "react";

import styled from "styled-components";

import { TweetItem } from "./";

export class TweetList extends Component {
  componentDidMount() {
    this.props.subscribeToTweets();
  }

  render() {
    const { loading, error, data } = this.props;
    console.log(data);
    if (loading) return <p>loading...</p>;
    if (error || !data.tweets) return <p>error</p>;
    return (
      <StyledTweetList>
        {data.tweets.map(tweet => (
          <TweetItem key={tweet._id} tweet={tweet} />
        ))}
      </StyledTweetList>
    );
  }
}

const StyledTweetList = styled.div`
  background-color: #ffffff;
`;
