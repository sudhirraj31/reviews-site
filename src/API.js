import { GraphQLClient } from "graphql-request";


const endpoint = process.env.REACT_APP_GRAPHCMS_ENDPOINT;
const token = process.env.REACT_APP_GRAPHCMS_TOKEN;

export const graphcms = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${token}`,
  },
});
