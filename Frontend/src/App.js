import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CartState from "./context/cart/CartState";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Category from "./components/admin/Category";
import AdminPage from "./components/AdminPage";
import Seller from "./components/admin/Seller";
import Login from "./components/Login";
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
import ProductsOfSeller from "./components/seller/ProductsOfSeller";
import SellerCategories from "./components/seller/SellerCategories";
import ProductDetailsOfSeller from "./components/seller/ProductDetailsOfSeller";
import Profile from "./components/Profile";
import ProductsOfCategory from "./components/seller/ProductsOfCategory";

function App() {
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState("");
  useEffect(() => {
    if (reload === true) {
      setReload(false);
    }
    if (localStorage.getItem("token")) {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);

      setUser(decoded.user.role);
    }
  }, [reload]);

  const refreshHandler = () => {
    setReload(true);
  };

  return (
    <div className=".app">
      <CartState>
        <Router>
          <Navbar reload={reload} setReload={setReload} />

          {!localStorage.getItem("token") && (
            <Routes>
              <Route
                exact
                path="/login"
                element={<Login reload={refreshHandler} />}
              />

              <Route exact path="/signup" element={<SignUp />} />
              <Route exact path="/sellerSignup" element={<SellerSignUp />} />
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route
                exact
                path="/category/:categoryId"
                element={<Products />}
              />
              <Route
                exact
                path="/product/:productId"
                element={<ProductDetails reload={refreshHandler} />}
              />
              <Route path="*" element={<NotFound user={user} />} />
            </Routes>
          )}
          {localStorage.getItem("token") && user === "customer" && (
            <Routes>
              <Route
                exact
                path="/login"
                element={<Login reload={refreshHandler} />}
              />
              <Route exact path="/profile" element={<MyProfile />} />
              {/* Customer */}
              <Route exact path="/" element={<Home />} />
              <Route exact path="/home" element={<Home />} />
              <Route
                exact
                path="/category/:categoryId"
                element={<Products />}
              />
              <Route
                exact
                path="/product/:productId"
                element={<ProductDetails />}
              />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/checkout" element={<Checkout />} />
              <Route exact path="/orders" element={<Orders />} />
              <Route path="*" element={<NotFound user={user} />} />
            </Routes>
          )}
          {localStorage.getItem("token") && user === "seller" && (
            <Routes>
              <Route
                exact
                path="/login"
                element={<Login reload={refreshHandler} />}
              />
              <Route exact path="/seller/profile" element={<Profile />} />
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
              <Route
                exact
                path="/seller/category/product/:productId"
                element={<ProductDetailsOfSeller />}
              />
              <Route
                exact
                path="/seller/category/:categoryId"
                element={<ProductsOfCategory />}
              />
              <Route path="*" element={<NotFound user={user} />} />
            </Routes>
          )}
          {localStorage.getItem("token") && user === "admin" && (
            <Routes>
              <Route
                exact
                path="/login"
                element={<Login reload={refreshHandler} />}
              />
              <Route exact path="/admin" element={<AdminPage />} />
              <Route exact path="/admin/profile" element={<Profile />} />
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
              <Route path="*" element={<NotFound user={user} />} />
            </Routes>
          )}
        </Router>
      </CartState>
      <Footer />
    </div>
  );
}
export default App;
