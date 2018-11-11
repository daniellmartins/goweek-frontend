import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import cookie from "cookie";

import { checkLoggedIn, redirect } from "../lib";
import { SignIn, Timeline } from "../components";

export default class Index extends Component {
  static async getInitialProps(context) {
    const { me } = await checkLoggedIn(context.apolloClient);
    return { ...me };
  }

  signout = client => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });
    client.cache.reset().then(() => {
      redirect({}, "/");
    });
  };

  render() {
    if (!this.props.me) return <SignIn />;
    return <Timeline />;
  }
}
