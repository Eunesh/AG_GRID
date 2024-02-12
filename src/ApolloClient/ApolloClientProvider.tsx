import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { FC } from "react";
import { setContext } from "@apollo/client/link/context";
import Cookie from "universal-cookie";

//Cookie
const cookie = new Cookie();

//http link
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_GRAPHQL_URL,
});

//Authlink
const authLink = setContext((_, { headers }) => {
  // get the authentication token from Cookie
  const token = cookie.get("Login_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // uri: import.meta.env.VITE_API_GRAPHQL_URL, // Graphql API endpoint
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

interface IApolloComponent {
  children: React.ReactNode | Array<React.ReactNode> | undefined;
}

export const ApolloComponent: FC<IApolloComponent> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
