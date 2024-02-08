import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloComponent } from "./ApolloClient/ApolloClientProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloComponent>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </ApolloComponent>
  </React.StrictMode>
);
