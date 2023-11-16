import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import icon from "../logo.svg";
import { Link } from "react-router-dom";

const SellerSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [match, setMatch] = useState(true);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line
  }, [match]);
  const createWallet = async (userId) => {
    console.log(userId);
    var myHeaders1 = new Headers();
    myHeaders1.append("Content-Type", "application/json");

    var raw1 = JSON.stringify({
      Amount: 0,
      userId: userId,
    });

    var requestOptions1 = {
      method: "POST",
      headers: myHeaders1,
      body: raw1,
      redirect: "follow",
    };
    const response1 = await fetch(
      "http://localhost:5000/api/v1/wallet/createWallet",
      requestOptions1
    );
    const json1 = await response1.json();
    console.log(json1);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: name,
      role: "seller",
      address: address,
      email: email,
      password: password,
      image: image
        ? image
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVz_XdPamId2_uvEeLG23zjW02eAXgZhCfoQ&usqp=CAU",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/users/createUser",
      requestOptions
    );
    const json = await response.json();
    console.log(json);

    if (json.authToken) {
      var decoded = await jwt_decode(json.authToken);
      console.log(decoded);
      await createWallet(decoded.user.id);
      navigate("/login");
    }
  };
  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center align-items-center bg-white">
        <div className="shadow-lg pg-3 bg-white w-60 m-5">
          <div className="justify-content-center align-items-center p-5 mx-4">
            <div className="text-center">
              <img
                src={icon}
                width="75"
                height="65"
                // className="img-fluid"
                alt="E-commerce website logo"
              />
            </div>

            <h1 className="text-center mb-4">
              <b>SignUp</b> <h3>(Seller)</h3>
            </h1>

            <Form.Group className="mb-3" controlId="fileName">
              <Form.Label>
                <i className="fa-solid fa-circle-user fa-beat-fade mx-1"></i>
                <b>Profile Image:</b>
              </Form.Label>
              <Form.Control
                type="file"
                name="image"
                size="md"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                      const imageDataURL = e.target.result;
                      // You can use imageDataURL as a base64-encoded image string.
                      setImage(imageDataURL);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>
                <i className="fa-solid fa-user fa-beat-fade mx-1"></i>
                <b>Username:</b>
              </Form.Label>
              <Form.Control
                variant="outlined"
                type="text"
                placeholder="Enter your name here."
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom02">
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
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>
                <i className="fa-solid fa-location-dot fa-beat-fade mx-1"></i>

                <b>Address:</b>
              </Form.Label>
              <Form.Control
                variant="outlined"
                type="text"
                placeholder="Enter your address here."
                required
                onChange={(e) => setAddress(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value !== confirmPassword) {
                    setMatch(false);
                  } else {
                    setMatch(true);
                  }
                }}
              />
              {match ? (
                ""
              ) : (
                <Form.Text className="text-danger">
                  Password and Confirm Password doesn't match.
                </Form.Text>
              )}
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-1" controlId="validationCustom05">
              <Form.Label>
                <i className="fa-solid fa-lock fa-beat-fade mx-1"></i>
                <b>Confirm Password:</b>
              </Form.Label>
              <Form.Control
                variant="outlined "
                type="password"
                placeholder="Enter your password here again."
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (password !== e.target.value) {
                    setMatch(false);
                  } else {
                    setMatch(true);
                  }
                }}
              />
              {match ? (
                ""
              ) : (
                <Form.Text className="text-danger">
                  Password and Confirm Password doesn't match.
                </Form.Text>
              )}
              <Form.Control.Feedback type="invalid">
                Password and Confirm Password doesn't match.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="mb-2 grid text-center">
            <Button
              disabled={!match}
              variant="outline-success py-2 px-4 shadow-lg"
              type="submit"
            >
              Create Account
            </Button>
          </div>
          <div className=" mb-5 grid text-center">
            <Stack className=" mb-5 grid text-center">
              <Form.Text>
                Register as Customer Account.{" "}
                <Link to="/SignUp">CustomerAccount</Link>
              </Form.Text>
              <Form.Text>
                Already have an account. <Link to="/login">Login </Link>
              </Form.Text>
            </Stack>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default SellerSignUp;
