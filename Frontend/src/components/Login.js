import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import icon from "../logo.svg";
import * as formik from "formik";
import * as yup from "yup";
// import jwt_decode from "jsonwebtoken";
// import { jwt_decode } from "jsonwebtoken";
const Login = () => {
  //   const jwt = require("jsonwebtoken");
  //   var jwt = require("jsonwebtoken");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [validated, setValidated] = useState(false);
  let navigate = useNavigate();
  // const handleSignUp = () => {
  //   navigate("/signup");
  // };

  //   const { Formik } = formik;

  //   const schema = yup.object().shape({
  //     eamil: yup.string().required(),
  //     password: yup.string().required(),
  //   });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

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
      "http://localhost:5000/api/v1/users/loginUser",
      requestOptions
    );
    const json = await response.json();
    console.log(json);

    if (json.authToken) {
      var decoded = await jwt_decode(json.authToken);
      console.log(decoded);
      await setUser(decoded.user);
      console.log(user);

      //saving the auth-token in local-Storage and redirect
      localStorage.setItem("token", json.authToken);

      //   props.showAlert("Logged in Successfully.", "success");
      if (decoded.user.role === "admin") {
        setValidated(true);
        navigate("/admin");
      } else if (decoded.user.role === "seller") {
        setValidated(true);
        navigate("/seller");
      } else if (decoded.user.role === "customer") {
        setValidated(true);
        navigate("/home");
      }
    }
    // }
  };
  return (
    // <Formik
    //   validationSchema={schema}
    //   onSubmit={console.log}
    //   initialValues={{
    //     email: "",
    //     password: "",
    //   }}
    // >
    //   {({ handleSubmit, handleChange, values, touched, errors }) => (
    <Form validated={validated} onSubmit={handleSubmit}>
      {/* validated={validated} onSubmit={handleSubmit} */}
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
                width="65"
                height="45"
                className="img-fluid"
                alt="E-commerce website logo"
              />
            </div>

            <h1
              className="text-center mb-5 "
              // style={{ fontSize: "50px", color: "#9b32e0" }}
            >
              <b>Login</b>
            </h1>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>
                <i class="fa-solid fa-at fa-beat-fade mx-1"></i>
                <b>Email address:</b>
              </Form.Label>
              <Form.Control
                // name="email"
                variant="outlined"
                type="email"
                placeholder="name@example.com"
                required
                // value={values.email}
                // isInvalid={!!errors.city}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback> */}
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom04">
              <Form.Label>
                <i class="fa-sharp fa-solid fa-key fa-beat-fade mx-1"></i>
                <b>Password:</b>
              </Form.Label>
              <Form.Control
                variant="outlined "
                type="password"
                // name="password"
                placeholder="Enter your password here."
                required
                // value={values.password}
                onChange={(e) => setPassword(e.target.value)}
                // isInvalid={!!errors.state}
              />

              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback> */}
            </Form.Group>
          </div>
          {/* </Stack> */}
          <div className="mt-4 mb-2 grid text-center">
            <Button
              variant="outline-success mx-2 py-2 px-4 shadow-lg"
              type="submit"
              // onClick={handleSubmit}
            >
              Login
            </Button>
            {/* <Button
              variant="outline-info mx-2 py-2 px-3 shadow-lg"
              onClick={handleSignUp}
            >
              SignUp
            </Button> */}
            {/* <br /> */}
          </div>
          <div className=" mb-5 grid text-center">
            <Form.Text>
              Create a new account. <Link to="/signup">SignUp</Link>
            </Form.Text>
          </div>
        </div>
      </div>
    </Form>
    //   )}
    // </Formik>
  );
};

export default Login;
