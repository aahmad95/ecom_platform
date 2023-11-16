import React, { useContext, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/NavBar";
import { Link } from "react-router-dom";
import icon from "../logo.svg";
import "font-awesome/css/font-awesome.min.css";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import cartContext from "../context/cart/cartContext";
function Navbar({ reload, setReload }) {
  const context = useContext(cartContext);

  const { setOrders, setOrderDetails } = context;

  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setOrders([]);
    setOrderDetails([]);
    setReload(true);
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);

      setUser(decoded.user.role);
    }
  }, [reload]);

  return (
    <>
      {localStorage.getItem("token") && user === "customer" ? (
        <NavBar
          variant="dark"
          sticky="top"
          collapseOnSelect
          expand="lg"
          style={{
            backgroundImage:
              "linear-gradient( 160.1deg,  rgba(151, 17, 172, 0.94) 10.2%, rgb(26, 93, 194) 77.3% )",
          }}
        >
          <NavBar.Brand as={Link} to="/">
            <img
              src={icon}
              width="60"
              height="55"
              // className="d-inline-block align-top mx-2"
              alt="E-commerce website logo"
            />
          </NavBar.Brand>
          <NavBar.Brand
            className="text-wrap"
            style={{ color: "#1ab5e9", fontSize: "36px" }}
            as={Link}
            to="/"
          >
            <b> E-commerce Website </b>
          </NavBar.Brand>
          <NavBar.Toggle
            className="mx-2"
            aria-controls="responsive-navbar-nav"
          />

          <NavBar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className=" mx-4">
              <Nav.Link as={Link} to="/home">
                Home
                <i
                  className="mx-2 fa-solid fa-house fa-flip"
                  style={{ color: "#ab41f1" }}
                ></i>
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
                <i
                  className="mx-2 fa-solid fa-id-card fa-flip"
                  style={{ color: "#ab41f1" }}
                ></i>
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Cart
                <i
                  className="mx-2 fa-solid fa-cart-plus fa-bounce"
                  style={{ color: "#ab41f1" }}
                ></i>
              </Nav.Link>
              <Nav.Link as={Link} to="/orders">
                Orders
                <i
                  className="mx-2 fa-solid fa-cubes fa-spin"
                  style={{ color: "#ab41f1" }}
                ></i>
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                Logout
                <i
                  className="mx-2 fa-sharp fa-solid fa-right-from-bracket fa-shake"
                  style={{ color: "#ab41f1" }}
                ></i>
              </Nav.Link>
            </Nav>
          </NavBar.Collapse>
        </NavBar>
      ) : localStorage.getItem("token") && user === "admin" ? (
        <NavBar
          variant="dark"
          sticky="top"
          collapseOnSelect
          expand="lg"
          style={{
            backgroundImage:
              "linear-gradient( 160.1deg,  rgba(151, 17, 172, 0.94) 10.2%, rgb(26, 93, 194) 77.3% )",
          }}
        >
          <NavBar.Brand as={Link} to="/admin">
            <img
              src={icon}
              width="60"
              height="55"
              // className="d-inline-block align-top mx-2"
              alt="E-commerce website logo"
            />
          </NavBar.Brand>
          <NavBar.Brand
            className="text-wrap"
            style={{ color: "#1ab5e9", fontSize: "36px" }}
            as={Link}
            to="/admin"
          >
            <b> E-commerce Website </b>
          </NavBar.Brand>
          <NavBar.Toggle
            className="mx-2"
            aria-controls="responsive-navbar-nav"
          />

          <NavBar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className=" mx-4">
              <Nav.Link as={Link} to="/admin/profile">
                Profile
                <i
                  className="mx-2 fa-solid fa-id-card fa-flip"
                  style={{ color: "#ab41f1" }}
                ></i>
              </Nav.Link>

              <Nav.Link onClick={handleLogout}>
                Logout
                <i
                  className="mx-2 fa-sharp fa-solid fa-right-from-bracket fa-shake"
                  style={{ color: "#ab41f1" }}
                ></i>
              </Nav.Link>
            </Nav>
          </NavBar.Collapse>
        </NavBar>
      ) : localStorage.getItem("token") && user === "seller" ? (
        <NavBar
          variant="dark"
          sticky="top"
          collapseOnSelect
          expand="lg"
          style={{
            backgroundImage:
              "linear-gradient( 160.1deg,  rgba(151, 17, 172, 0.94) 10.2%, rgb(26, 93, 194) 77.3% )",
          }}
        >
          <NavBar.Brand as={Link} to="/seller/products">
            <img
              src={icon}
              width="60"
              height="55"
              // className="d-inline-block align-top mx-2"
              alt="E-commerce website logo"
            />
          </NavBar.Brand>
          <NavBar.Brand
            className="text-wrap"
            style={{ color: "#1ab5e9", fontSize: "36px" }}
            as={Link}
            to="/seller/products"
          >
            <b> E-commerce Website </b>
          </NavBar.Brand>
          <NavBar.Toggle
            className="mx-2"
            aria-controls="responsive-navbar-nav"
          />

          <NavBar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className=" mx-4">
              <Nav.Link onClick={handleLogout}>
                Logout
                <i
                  className="mx-2 fa-sharp fa-solid fa-right-from-bracket fa-shake"
                  style={{ color: "#ab41f1" }}
                ></i>
              </Nav.Link>
            </Nav>
          </NavBar.Collapse>
        </NavBar>
      ) : (
        <NavBar
          variant="dark"
          sticky="top"
          collapseOnSelect
          expand="lg"
          style={{
            backgroundImage:
              "linear-gradient( 160.1deg,  rgba(151, 17, 172, 0.94) 10.2%, rgb(26, 93, 194) 77.3% )",
          }}
        >
          <NavBar.Brand as={Link} to="/">
            <img
              src={icon}
              width="60"
              height="55"
              // className="d-inline-block align-top mx-2"
              alt="E-commerce website logo"
            />
          </NavBar.Brand>
          <NavBar.Brand
            className="text-wrap"
            style={{ color: "#1ab5e9", fontSize: "36px" }}
            as={Link}
            to="/"
          >
            <b> E-commerce Website </b>
          </NavBar.Brand>
          <NavBar.Toggle
            className="mx-2"
            aria-controls="responsive-navbar-nav"
          />

          <NavBar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className=" mx-4">
              <Nav.Link as={Link} to="/home">
                <i
                  className="mx-2 fa-solid fa-house fa-bounce"
                  style={{ color: "#ab41f1" }}
                ></i>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                <i
                  className="mx-2 fa-sharp fa-solid fa-right-to-bracket fa-beat-fade"
                  style={{ color: "#ab41f1" }}
                ></i>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                <i
                  className="mx-2 fa-solid fa-user-plus fa-fade"
                  style={{ color: "#ab41f1" }}
                ></i>
                SignUp
              </Nav.Link>
            </Nav>
          </NavBar.Collapse>
        </NavBar>
      )}
    </>
  );
}

export default Navbar;
