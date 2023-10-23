import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import CategoryState from "./context/category/CategoryState";
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

function App() {
  return (
    <div>
      <CategoryState>
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

            <Route exact path="/navbar" element={<Navbar />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            {/* 

            <Route exact path="/signup" element={<Signup />} /> */}
            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/admin/category" element={<Category />} />

            <Route exact path="/admin/users" element={<User />} />
            <Route exact path="/admin/sellers" element={<Seller />} />
            <Route exact path="/admin/ads" element={<Ads />} />
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </CategoryState>
    </div>
  );
}

export default App;
