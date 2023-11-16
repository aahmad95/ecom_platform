import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import icon from "../logo.svg";

const Login = ({ reload }) => {
  const [hide, setHide] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setHide(true);
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
    if (response.status === 200) {
      const json = await response.json();
      console.log(json);

      if (json.authToken) {
        var decoded = await jwt_decode(json.authToken);
        setUser(decoded.user);
        localStorage.setItem("token", json.authToken);
        await reload();

        if (decoded.user.role === "admin") {
          setValidated(true);
          navigate("/admin");
        } else if (decoded.user.role === "seller") {
          setValidated(true);
          navigate("/seller/products");
        } else if (decoded.user.role === "customer") {
          setValidated(true);
          navigate("/home");
        }
      }
    }
    if (response.status === 204) {
      setHide(false);
    }
  };
  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center bg-white">
        <div className="shadow-lg pg-3 bg-white w-45 m-5 ">
          <div className="justify-content-center align-items-center  m-5 w-40 ">
            <div className="text-center">
              <img
                src={icon}
                width="70"
                height="65"
                // className="img-fluid"
                alt="E-commerce website logo"
              />
            </div>

            <h1 className="text-center mb-5 ">
              <b>Login</b>
            </h1>

            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>
                <i className="fa-solid fa-at fa-beat-fade mx-1"></i>
                <b>Email address:</b>
              </Form.Label>
              <Form.Control
                variant="outlined"
                type="email"
                placeholder="name@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom04">
              <Form.Label>
                <i className="fa-sharp fa-solid fa-key fa-beat-fade mx-1"></i>
                <b>Password:</b>
              </Form.Label>
              <Form.Control
                variant="outlined "
                type="password"
                placeholder="Enter your password here."
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
            <div hidden={hide} className="text-danger text-center fa-bounce">
              Invalid Credentials!
            </div>
          </div>
          <div className="mt-4 mb-2 grid text-center">
            <Button
              variant="outline-success mx-2 py-2 px-4 shadow-lg"
              type="submit"
            >
              Login
            </Button>
          </div>
          <div className=" mb-5 grid text-center">
            <Form.Text>
              Create a new account. <Link to="/signup">SignUp</Link>
            </Form.Text>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Login;
