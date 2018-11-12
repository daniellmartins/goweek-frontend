import React, { Component } from "react";
import { ApolloConsumer, Mutation } from "react-apollo";
import gql from "graphql-tag";
import cookie from "cookie";
import styled from "styled-components";

import { redirect } from "../lib";
import { Button, Input } from "./ui";

const SIGNIN_MUTATION = gql`
  mutation signin($email: String!, $password: String!) {
    signin(input: { email: $email, password: $password }) {
      token
    }
  }
`;

export class SignIn extends Component {
  state = { email: "", password: "" };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, singin) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) singin({ variables: { email, password } });
  };

  onCompleted = (data, client) => {
    document.cookie = cookie.serialize("token", data.signin.token, {
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
    client.cache.reset().then(() => {
      redirect({}, "/");
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <StyledSignIn>
        <Logo src="/static/twitter.svg" alt="[Twitter - Logo]" />
        <ApolloConsumer>
          {client => (
            <Mutation
              mutation={SIGNIN_MUTATION}
              onCompleted={data => this.onCompleted(data, client)}
            >
              {(signin, { loading }) => (
                <Form onSubmit={e => this.handleSubmit(e, signin)}>
                  <Input
                    required
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={this.handleInput}
                  />
                  <Input
                    required
                    name="password"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={this.handleInput}
                  />
                  <Button type="submit">
                    {loading ? "Loading" : "Entrar"}
                  </Button>
                </Form>
              )}
            </Mutation>
          )}
        </ApolloConsumer>
      </StyledSignIn>
    );
  }
}

const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;

  form {
    margin: 20px 0 0;
    width: 100%;
    max-width: 280px;

    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  input {
    margin-bottom: 10px;
  }
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;

const Form = styled.form``;
