import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Detail from '../pages/detail';
import Edit from '../pages/profileEdit';
import Delete from '../pages/profileDelete';
import Profile from '../pages/profile';
import Rent from '../pages/rent';
import History from '../pages/history';


const Navigation = () => {

  const client = new ApolloClient({
    uri: "https://rent-book-database.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret": "ZtsuGBKi742xmrOY4A8jhEQ87cJfqVsJuo4Nor84zkg6l43sukTMZD6JS41o3jPJ"
    },
    cache: new InMemoryCache(),
  });

  return (
    <BrowserRouter>
      <ApolloProvider client = {client}>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit" element={<Edit />} />
          <Route path="delete" element={<Delete />} />
          <Route path="rent/:id" element={<Rent />} />
          <Route path="history" element={<History />} />
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default Navigation;
