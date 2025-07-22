import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar1 from "./components/Navbar1";

import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import ItemDetail from "./pages/ItemDetail";
import Dashboard from "./pages/Dashboard";
import ListLostItem from "./pages/ListLostItem";
import ListFoundItem from "./pages/ListFoundItem";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      <Navbar1 />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/lost" element={<LostItems />} />
        <Route path="/found" element={<FoundItems />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        {/* User-Specific / Protected Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lost/new" element={<ListLostItem />} />
        <Route path="/found/new" element={<ListFoundItem />} />
        <Route path="/profile" element={<Profile />} />{" "}
        {/*  Route for Profile */}
        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
