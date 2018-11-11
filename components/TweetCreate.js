import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const CREATE_TWEET_MUTATION = gql`
  mutation createTweet($content: String!) {
    createTweet(input: { content: $content }) {
      _id
      content
      createdAt
      updatedAt
      author {
        _id
        name
        lastname
        email
      }
    }
  }
`;

export class TweetCreate extends Component {
  state = { content: "" };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, create) => {
    if (e.keyCode !== 13) return;

    const { content } = this.state;
    if (content) create({ variables: { content } });
  };

  onCompleted = data => {
    this.setState({ content: "" });
  };

  render() {
    const { content } = this.state;
    return (
      <StyledTweetCreate>
        <Mutation
          mutation={CREATE_TWEET_MUTATION}
          onCompleted={this.onCompleted}
        >
          {(create, { loading }) => (
            <Form>
              <textarea
                disabled={loading}
                name="content"
                placeholder="O que está acontecendo?"
                value={content}
                onChange={this.handleInput}
                onKeyDown={e => this.handleSubmit(e, create)}
              />
            </Form>
          )}
        </Mutation>
      </StyledTweetCreate>
    );
  }
}

const StyledTweetCreate = styled.div`
  padding: 8px;
`;

const Form = styled.form`
  width: 100%;
  background-color: #e9f1f6;
  padding: 16px;
  border-radius: 5px;
  margin: 30px 0 0;

  textarea {
    font-size: 14px;

    padding: 15px;
    width: 100%;
    border: 3px solid #d8e5ed;
    border-radius: 5px;
  }
`;
