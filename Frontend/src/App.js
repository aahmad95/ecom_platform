import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CartState from "./context/cart/CartState";
import Category from "./components/admin/Category";
import AdminPage from "./components/AdminPage";
import User from "./components/admin/User";
import Seller from "./components/admin/Seller";
import Login from "./components/Login";

import Dashboard from "./components/admin/Dashboard";
import Ads from "./components/admin/Ads";
import SignUp from "./components/SignUp";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import MyProfile from "./components/MyProfile";
import Checkout from "./components/Checkout";
import Customer from "./components/admin/Customer";
import NotFound from "./components/NotFound";
import SellerProducts from "./components/admin/SellerProducts";

function App() {
  return (
    <div className=".app">
      <CartState>
        <Router>
          <Navbar />

          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/category/:categoryId" element={<Products />} />
            <Route
              exact
              path="/product/:productId"
              element={<ProductDetails />}
            />
            {/* if(!localStorage.getItem("token")) */}
            <Route exact path="/navbar" element={<Navbar />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/profile" element={<MyProfile />} />
            <Route exact path="/checkout" element={<Checkout />} />
            {/* 

            <Route exact path="/signup" element={<Signup />} /> */}
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/admin/category" element={<Category />} />

            <Route exact path="/admin/customers" element={<Customer />} />
            <Route exact path="/admin/sellers" element={<Seller />} />
            <Route
              exact
              path="/admin/sellers/:sellerId"
              element={<SellerProducts />}
            />
            <Route exact path="/admin/ads" element={<Ads />} />
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
            {/* The catch-all route for undefined URLs */}

            <Route path="*" element={<NotFound />} />
            <Route exact path="404" element={<NotFound />} />
          </Routes>
        </Router>
      </CartState>
      <Footer />

      {/* <Router>
        <Routes>
      
      </Routes>
        </Router> */}
    </div>
  );
}

export default App;
