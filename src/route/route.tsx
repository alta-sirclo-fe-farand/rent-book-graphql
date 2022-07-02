import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import LoginContext from "../context/LoginContext";
import SearchContext from "../context/SearchContext";

import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Detail from "../pages/detail";
import Edit from "../pages/profileEdit";
import Profile from "../pages/profile";
import Rent from "../pages/rent";
import History from "../pages/history";
import Search from "../pages/search";

const Navigation = () => {
  const client = new ApolloClient({
    uri: "https://rent-book-database.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "ZtsuGBKi742xmrOY4A8jhEQ87cJfqVsJuo4Nor84zkg6l43sukTMZD6JS41o3jPJ",
    },
    cache: new InMemoryCache(),
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <BrowserRouter>
          <ApolloProvider client={client}>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="detail/:id" element={<Detail />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit" element={<Edit />} />
              <Route path="rent/:id" element={<Rent />} />
              <Route path="history" element={<History />} />
              <Route path="search/:value" element={<Search />} />
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </ApolloProvider>
        </BrowserRouter>
      </SearchContext.Provider>
    </LoginContext.Provider>
  );
};

export default Navigation;
