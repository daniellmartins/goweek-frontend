import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { TweetCreate, TweetList } from "./";

const TWEETS_QUERY = gql`
  {
    tweets {
      _id
      content
      likes
      iliked
      author {
        _id
        name
        lastname
      }
    }
  }
`;

const TWEET_SUBSCRIPTION = gql`
  subscription {
    tweetSubscription {
      mutation
      node {
        _id
        content
        likes
        iliked
        author {
          _id
          name
          lastname
        }
      }
    }
  }
`;

export const Timeline = () => (
  <StyledTimeline>
    <Logo src="/static/twitter.svg" alt="[Twitter - Logo]" />
    <TweetCreate />

    <Query query={TWEETS_QUERY}>
      {({ subscribeToMore, ...result }) => (
        <TweetList
          {...result}
          subscribeToTweets={() => {
            subscribeToMore({
              document: TWEET_SUBSCRIPTION,
              onError: error => console.log(error),
              updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const { tweetSubscription } = subscriptionData.data;
                const { mutation, node } = tweetSubscription;
                if (mutation === "CREATED") {
                  return {
                    ...prev,
                    tweets: [node, ...prev.tweets]
                  };
                }
                if (mutation === "UPDATED") {
                  return {
                    ...prev,
                    tweets: prev.tweets.map(tweet =>
                      tweet._id === node._id ? node : tweet
                    )
                  };
                }
                return prev;
              }
            });
          }}
        />
      )}
    </Query>
  </StyledTimeline>
);

const StyledTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 0 0;
`;

const Logo = styled.img``;
