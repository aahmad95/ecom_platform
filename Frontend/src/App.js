import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
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
import SellerProductDetails from "./components/admin/SellerProductDetails";
import CustomerOrders from "./components/admin/CustomerOrders";
import Orders from "./components/Orders";
import SellerSignUp from "./components/SellerSignUp";
import SellerHome from "./components/SellerHome";
import { useEffect, useState } from "react";
import Sidebar from "./components/admin/Sidebar";
import jwt_decode from "jwt-decode";
import ProductsOfSeller from "./components/seller/ProductsOfSeller";
import SellerCategories from "./components/seller/SellerCategories";
import ProductDetailsOfSeller from "./components/seller/ProductDetailsOfSeller";

function App() {
  // const [user, setUser] = useState("");

  // useEffect(() => {
  //   // console.log(localStorage.getItem("token"))
  //   if (localStorage.getItem("token")) {
  //     const authToken = localStorage.getItem("token");
  //     const decoded = jwt_decode(authToken);
  //     if (!user) {
  //       setUser(decoded.user);
  //     }
  //   } else {
  //     setUser("");
  //   }
  //   // eslint-disable-next-line
  // }, [user]);

  return (
    <div className=".app">
      <CartState>
        <Router>
          <Navbar />
          {/* {user.role  === "seller" ? <Sidebar /> : ""} */}
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
            <Route exact path="/orders" element={<Orders />} />

            <Route exact path="/sellerSignup" element={<SellerSignUp />} />
            <Route exact path="/seller" element={<SellerHome />} />
            <Route
              exact
              path="/seller/products"
              element={<ProductsOfSeller />}
            />
            <Route
              exact
              path="/seller/categories"
              element={<SellerCategories />}
            />
            <Route
              exact
              path="/seller/product/:productId"
              element={<ProductDetailsOfSeller />}
            />

            <Route exact path="/admin" element={<AdminPage />} />
            <Route exact path="/admin/category" element={<Category />} />

            <Route exact path="/admin/customers" element={<Customer />} />
            <Route
              exact
              path="/admin/customers/:customerId"
              element={<CustomerOrders />}
            />
            <Route exact path="/admin/sellers" element={<Seller />} />
            <Route
              exact
              path="/admin/sellers/:sellerId"
              element={<SellerProducts />}
            />
            <Route
              exact
              path="/admin/sellers/product/:productId"
              element={<SellerProductDetails />}
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
