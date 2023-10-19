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
    navigate("/login");
    // props.showAlert("Logged Out Successfully.", "success");
  };
  return (
    <NavBar
      collapseOnSelect
      expand="lg"
      style={{
        backgroundColor: "#9b32e0",
        // , color: "#430404"
      }}
    >
      {/* <Container> */}
      <NavBar.Brand as={Link} to="/">
        <img
          src={icon}
          width="65"
          height="60"
          className="d-inline-block align-top mx-2"
          alt="E-commerce website logo"
        />
      </NavBar.Brand>
      <NavBar.Brand
        style={{ color: "#ff9633", fontSize: "50px" }}
        as={Link}
        to="/"
      >
        {/* <h1> */}
        <b> E-commerce Website </b>
        {/* </h1> */}
      </NavBar.Brand>
      <NavBar.Toggle className="mx-2" aria-controls="responsive-navbar-nav" />
      <NavBar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <Nav className=" mx-4">
          <Nav.Link as={Link} to="/">
            <h5>
              <i
                class="mx-2 fa-solid fa-house fa-flip"
                style={{ color: "#ff9633" }}
              ></i>
              Home
            </h5>
          </Nav.Link>
          {localStorage.getItem("token") ? (
            <Stack direction="horizontal" gap={2}>
              <Nav.Link href="#link">
                <h5>
                  Profile
                  <i
                    class="mx-2 fa-solid fa-id-card fa-flip"
                    style={{ color: "#ff9633" }}
                  ></i>
                </h5>
              </Nav.Link>
              <Nav.Link href="#link">
                <h5>
                  Cart
                  <i
                    class="mx-2 fa-solid fa-cart-plus fa-bounce"
                    style={{ color: "#ff9633" }}
                  ></i>
                </h5>
              </Nav.Link>
              <Nav.Link onClick={handleLogout}>
                <h5>
                  Logout
                  <i
                    class="mx-2 fa-sharp fa-solid fa-right-from-bracket fa-shake"
                    style={{ color: "#ff9633" }}
                  ></i>
                </h5>
              </Nav.Link>
            </Stack>
          ) : (
            <Stack direction="horizontal">
              <Nav.Link as={Link} to="/login">
                <h5>
                  <i
                    class="mx-2 fa-sharp fa-solid fa-right-to-bracket fa-beat-fade"
                    style={{ color: "#ff9633" }}
                  ></i>
                  Login
                </h5>
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                <h5>
                  <i
                    class="mx-2 fa-solid fa-user-plus fa-fade"
                    style={{ color: "#ff9633" }}
                  ></i>
                  SignUp
                </h5>
              </Nav.Link>
              <Nav.Link href="#link">
                <h5>
                  <i
                    class="mx-2 fa-solid fa-cart-plus fa-bounce"
                    style={{ color: "#ff9633" }}
                  ></i>
                  Cart
                </h5>
              </Nav.Link>
            </Stack>
          )}
        </Nav>
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
