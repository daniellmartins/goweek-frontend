import gql from "graphql-tag";

export const checkLoggedIn = apolloClient =>
  apolloClient
    .query({
      query: gql`
        query me {
          me {
            _id
            name
            lastname
            email
          }
        }
      `
    })
    .then(({ data }) => {
      return { me: data };
    })
    .catch(() => {
      // Fail gracefully
      return { me: {} };
    });
