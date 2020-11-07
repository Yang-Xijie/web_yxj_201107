import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// above - default import
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:23333/v1/graphql", // GraphQL server's URL
  cache: new InMemoryCache(),
});
client
  .query({
    query: gql`
      query MyQuery {
        user {
          name
          email
        }
      }
    `,
  })
  .then((result) => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// from https://www.apollographql.com/docs/react/get-started/
/* import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache()
});
*/

// from web-eesast src/index.tsx
/*
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// above - default
import { BrowserRouter as Router } from "react-router-dom"; //这一句我没加
import { ApolloProvider } from "@apollo/client";
import { client } from "./api";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

// form web-eesast src/api/index.ts
/*
...
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
那个splitlink应该是用来处理链接的,我应该暂时不需要.
link里面确实出现了uri.应该是对不同情况的一个处理

import { BrowserRouter as Router } from "react-router-dom";
就剩这一句搞清楚就行了
*/
