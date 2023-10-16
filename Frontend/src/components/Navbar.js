import React from "react";
// import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavBar from "react-bootstrap/NavBar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import icon from "../logo.svg";
import "font-awesome/css/font-awesome.min.css";
function Navbar() {
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
      <NavBar.Brand href="/">
        <img
          src={icon}
          width="60"
          height="50"
          className="d-inline-block align-top mx-4"
          alt="E-commerce website logo"
        />
      </NavBar.Brand>
      <NavBar.Brand
        // style={{ color: "#430404" }}
        href="#home"
      >
        <h1>
          <b> E-commerce Website </b>
        </h1>
      </NavBar.Brand>
      <NavBar.Toggle className="mx-2" aria-controls="responsive-navbar-nav" />
      <NavBar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto mx-2">
          <Nav.Link href="#home">
            <h3>
              <i
                class="mx-2 fa-sharp fa-solid fa-right-to-bracket fa-beat-fade"
                style={{ color: "#ff9633" }}
              ></i>
              Login
            </h3>
          </Nav.Link>
          <Nav.Link href="#link">
            <h3>
              <i
                class="mx-2 fa-solid fa-user-plus fa-fade"
                style={{ color: "#ff9633" }}
              ></i>
              SignUp
            </h3>
          </Nav.Link>
          <Nav.Link href="#link">
            <h3>
              <i
                class="mx-2 fa-solid fa-cart-plus fa-bounce"
                style={{ color: "#ff9633" }}
              ></i>
              Cart
            </h3>
          </Nav.Link>

          {/* After Login  */}
          {/* <Nav.Link href="#link">
            <h3>
              My Account
              <i
                class="mx-2 fa-solid fa-id-card fa-flip"
                style={{ color: "#ff9633" }}
              ></i>
            </h3>
          </Nav.Link>
          <Nav.Link href="#link">
            <h3>
              Cart
              <i
                class="mx-2 fa-solid fa-cart-plus fa-bounce"
                style={{ color: "#ff9633" }}
              ></i>
            </h3>
          </Nav.Link>
          <Nav.Link href="#link">
            <h3>
              Logout
              <i
                class="mx-2 fa-sharp fa-solid fa-right-from-bracket fa-shake"
                style={{ color: "#ff9633" }}
              ></i>
            </h3>
          </Nav.Link> */}

          {/* <NavDropdown title="Categories" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Form className="d-flex">
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
        </Form>
      </NavBar.Collapse>
      {/* </Container> */}
    </NavBar>
  );
}

export default Navbar;
