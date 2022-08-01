import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import MainPage from "./pages/MainPage";
import AdminAddPage from "./pages/AdminAddPage";
import AdminEditPage from "./pages/AdminEditPage";
import BasketPage from "./pages/BasketPage";

function Navigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin" element={<AdminPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/admin/add" element={<AdminAddPage />} />
        <Route path="/admin/edit/:id" element={<AdminEditPage />} />
        <Route path="/basket" element={<BasketPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
