import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CreateItem from './pages/CreateItem';
import { useMeQuery } from './generated/graphql';
import UpdateItem1 from './pages/UpdateItem1';


const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include'
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
function App() {

  return (
    <ApolloProvider client={client}>

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/Register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/createitem"
            element={<CreateItem />}
          />
          <Route
            path="/updateitem"
            element={<UpdateItem1 />}
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>

  );
}

export default App;
