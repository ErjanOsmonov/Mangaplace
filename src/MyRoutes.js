import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import MyNavbar from "./components/MyNavbar";
import AdminProvider from "./contexts/AdminProvider";
import AuthProvider from "./contexts/AuthProvider";
import ClientProvider from "./contexts/ClientProvider";
import AddPage from "./pages/AddPage";
import AdminPage from "./pages/AdminPage";
import DetailProduct from "./pages/DetailProduct";
// import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import FavPage from "./pages/FavPage";

const MyRoutes = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <ClientProvider>
          <BrowserRouter>
            <MyNavbar />
            <Routes>
              <Route path="/add" element={<AddPage />} />
              <Route path="/" element={<SearchPage />} />
              <Route path="/:type/:id" element={<DetailProduct />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/fav" element={<FavPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ClientProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default MyRoutes;
