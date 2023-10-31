import React from "react";
// import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/NavBar";
import { Link } from "react-router-dom";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import icon from "../logo.svg";
import "font-awesome/css/font-awesome.min.css";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    // const context = useContext(cartContext);
    // const { orders, setOrders } = context;
    navigate("/login");
    // props.showAlert("Logged Out Successfully.", "success");
  };

  return (
    <NavBar
      sticky="top"
      collapseOnSelect
      expand="lg"
      style={{
        // backgroundColor: "#9b32e0",
        backgroundImage:
          // "radial-gradient( circle farthest-corner at 10% 20%,  rgba(171,102,255,1) 0%, rgba(116,182,247,1) 90% )",
          // "linear-gradient( 173.1deg,  rgba(226,66,249,0.94) 10.2%, rgba(79,147,249,1) 77.3% )",
          "linear-gradient( 160.1deg,  rgba(151, 17, 172, 0.94) 10.2%, rgb(26, 93, 194) 77.3% )",
        // "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)",

        // , color: "#430404"
      }}
    >
      {/* <Container> */}
      <NavBar.Brand as={Link} to="/">
        <img
          src={icon}
          width="60"
          height="55"
          className="d-inline-block align-top mx-2"
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
      <NavBar.Toggle className="mx-2" aria-controls="responsive-navbar-nav" />
      {/* <Nav className=" mx-4">
        <Nav.Link as={Link} to="/">
          <i
            className="mx-2 fa-solid fa-house fa-flip"
            style={{ color: "#ab41f1" }}
          ></i>
          Home
        </Nav.Link>
      </Nav> */}
      <NavBar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        {localStorage.getItem("token") ? (
          <Nav className=" mx-4">
            <Nav.Link as={Link} to="/">
              Home
              <i
                className="mx-2 fa-solid fa-house fa-flip"
                style={{ color: "#ab41f1" }}
              ></i>
            </Nav.Link>
            {/* <Stack direction="horizontal" gap={2}> */}
            <Nav.Link as={Link} to="/profile">
              Profile
              <i
                className="mx-2 fa-solid fa-id-card fa-flip"
                style={{ color: "#ab41f1" }}
              ></i>
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              {/* <h6> */}
              Cart
              <i
                className="mx-2 fa-solid fa-cart-plus fa-bounce"
                style={{ color: "#ab41f1" }}
              ></i>
              {/* </h6> */}
            </Nav.Link>
            <Nav.Link onClick={handleLogout}>
              {/* <h6> */}
              Logout
              <i
                className="mx-2 fa-sharp fa-solid fa-right-from-bracket fa-shake"
                style={{ color: "#ab41f1" }}
              ></i>
              {/* </h6> */}
            </Nav.Link>
            {/* </Stack> */}
          </Nav>
        ) : (
          <Nav className=" mx-4">
            <Nav.Link href="/">
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
            <Nav.Link href="/signup">
              <i
                className="mx-2 fa-solid fa-user-plus fa-fade"
                style={{ color: "#ab41f1" }}
              ></i>
              SignUp
            </Nav.Link>
            {/* <Nav.Link href="/login">
              <i
                className="mx-2 fa-solid fa-cart-plus fa-bounce"
                style={{ color: "#ab41f1" }}
              ></i>
              Cart
            </Nav.Link> */}
          </Nav>
        )}

        {/* <Form className="d-flex">
          <Form.Control
            style={{ width: "350px", textAlign: "center" }}
            type="search"
            placeholder="Search"
            className="mx-2"
            aria-label="Search"
          />
          <Button className="me-2" variant="outline-info">
            Search
          </Button>
        </Form> */}
      </NavBar.Collapse>
      {/* </Container> */}
    </NavBar>
  );
}

export default Navbar;
