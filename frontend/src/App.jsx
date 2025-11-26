import React, { use } from "react";
import ProductContainer from "./container/ProductContainer";
import { Navigate, Route, Routes } from "react-router";
import SingleProductContainer from "./container/SingleProductContainer";
import CategoryContainer from "./container/CategoryContainer";
import Navbar from "./components/Navbar";
import SearchResultCountainer from "./container/SearchResultCountainer";
import { AuthContext } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CartContainer from "./container/CartContainer";
import NotFound from "./pages/NotFound";
import ErrorPage from "./pages/ErrorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user } = use(AuthContext);
  console.log(user);
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={user ? <ProductContainer /> : <Navigate to="/login" />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/product/:id"
            element={
              user ? <SingleProductContainer /> : <Navigate to="/login" />
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/category/:id"
            element={user ? <CategoryContainer /> : <Navigate to="/login" />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/products"
            element={
              user ? <SearchResultCountainer /> : <Navigate to="/login" />
            }
            errorElement={<ErrorPage />}
          />
          <Route
            path="/register"
            element={<Register />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/cart"
            element={user ? <CartContainer /> : <Navigate to="/login" />}
            errorElement={<ErrorPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
