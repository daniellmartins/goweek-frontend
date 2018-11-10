import gql from "graphql-tag";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query me {
          user {
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
