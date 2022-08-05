import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import MainPage from "./pages/MainPage";
import AdminAddPage from "./pages/AdminAddPage";
import AdminEditPage from "./pages/AdminEditPage";
import BasketPage from "./pages/BasketPage";
import Navbar from "./components/Navbar";
import Provider from "./context/Provider";
import AdminProvider from "./context/AdminProvider";

function Navigation() {
  return (
    <Provider>
      <BrowserRouter>
        <AdminProvider>
          <Navbar />
          <Routes>
            <Route path="admin" element={<AdminPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/admin/add" element={<AdminAddPage />} />
            <Route path="/admin/edit/:id" element={<AdminEditPage />} />
            <Route path="/basket" element={<BasketPage />} />
            
          </Routes>
        </AdminProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default Navigation;
