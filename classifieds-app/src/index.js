import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Root from "#root/components/Root";
import graphqlClient from "#root/api/graphqlClient";
import * as theme from "./theme";
import store from "./store";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    html, body, #app{
        height: 100%;
        margin: 0;
        padding: 0;
        width: 100;
    }

    body{
        font-family: Roboto, sans-serif;
    }
`;

render(
  <Provider store={store}>
    <ApolloProvider client={graphqlClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Root />
      </ThemeProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById("app")
);
