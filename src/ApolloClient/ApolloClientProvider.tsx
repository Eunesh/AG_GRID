import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { FC } from "react";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_GRAPHQL_URL, // Graphql API endpoint
  cache: new InMemoryCache(),
});

interface IApolloComponent {
  children: React.ReactNode | Array<React.ReactNode> | undefined;
}

export const ApolloComponent: FC<IApolloComponent> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
