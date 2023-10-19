import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import icon from "../logo.svg";
// import jwt_decode from "jsonwebtoken";
// import { jwt_decode } from "jsonwebtoken";
const SignUp = () => {
  //   const jwt = require("jsonwebtoken");
  //   var jwt = require("jsonwebtoken");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  let navigate = useNavigate();
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/users/loginUser",
      requestOptions
    );
    const json = await response.json();
    console.log(json);

    if (json.authToken) {
      //saving the auth-token in local-Storage and redirect
      localStorage.setItem("token", json.authToken);
      setUser(json.user);
      var decoded = jwt_decode(json.authToken);
      console.log(decoded);

      //   props.showAlert("Logged in Successfully.", "success");
      if (decoded.user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "seller") {
        navigate("/seller");
      } else if (user.role === "customer") {
        navigate("/customer");
      }
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-white">
      <div className="shadow-lg pg-3 bg-white w-45 m-5 ">
        {/* <Stack
          gap={4}
          className="pg-3 bg-white w-50 mt-5 mb-5 mt-5 col-md-5 mx-4"
        > */}

        <div className="justify-content-center align-items-center  m-5 w-40 ">
          <div className="text-center">
            <img
              src={icon}
              width="70"
              height="50"
              className="img-fluid"
              alt="E-commerce website logo"
            />
          </div>

          <h2
            className="text-center mb-5 "
            style={{ fontSize: "50px", color: "#9b32e0" }}
          >
            <b>SignUp</b>
          </h2>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <b>Email address:</b>
              </Form.Label>
              <Form.Control
                variant="outlined"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                <b>Password:</b>
              </Form.Label>
              <Form.Control
                variant="outlined "
                type="password"
                placeholder="Enter your password here."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </div>
        {/* </Stack> */}
        <div className="mt-4 mb-5 grid text-center">
          <Button
            variant="outline-success mx-3 p-3 shadow-lg"
            type="submit"
            //   onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            variant="outline-info mx-2 p-3 shadow-lg"
            onClick={handleSignUp}
          >
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
