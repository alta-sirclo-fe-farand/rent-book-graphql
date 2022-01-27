import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import Detail from '../pages/detail';
import Profile from '../pages/profile';
import Rent from '../pages/rent';
import History from '../pages/history';

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="rent" element={<Rent />} />
        <Route path="history" element={<History />} />
        <Route path="/" element={<Home />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation;
