import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import icon from "../logo.svg";
import Modal from "react-bootstrap/Modal";
import * as formik from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";

const MyProfile = () => {
  const [user, setUser] = useState();
  // console.log(decoded.user);

  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();

  const [show, setShow] = useState(false);

  const [validated, setValidated] = useState(false);
  let navigate = useNavigate();

  //   const { Formik } = formik;

  //   const schema = yup.object().shape({
  //     eamil: yup.string().required(),
  //     password: yup.string().required(),
  //   });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      var decoded = jwt_decode(authToken);
      setUser(decoded.user);
      setName(decoded.user.username);
      setImage(decoded.user.image);
      setEmail(decoded.user.email);
      setAddress(decoded.user.address);
    }

    // console.log("OrderItems------->", orderItems);
  }, []);

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
      email: email,
      address: address,
      image: image,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/users/updateUser/${user.id}`,
      requestOptions
    );
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      localStorage.setItem("token", json.authToken);
      setShow(true);
      const authToken = localStorage.getItem("token");
      var decoded = jwt_decode(authToken);
      console.log(decoded);
    }

    // if (json.authToken) {
    //   var decoded = await jwt_decode(json.authToken);
    //   console.log(decoded);
    //   // await createWallet(decoded.user.id);
    //   navigate("/login");
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
      <div className="d-flex justify-content-center align-items-center bg-white">
        <div className="shadow-lg pg-3 bg-white w-50 m-5">
          {/* <Stack
          gap={4}
          className="pg-3 bg-white w-50 mt-5 mb-5 mt-5 col-md-5 mx-4"
        > */}

          <div className="justify-content-center align-items-center p-5 mx-auto">
            <div className="text-center">
              <img
                src={icon}
                width="70"
                height="50"
                className="img-fluid"
                alt="E-commerce website logo"
              />
            </div>

            <h1
              className="text-center mb-3 "
              // style={{ fontSize: "50px", color: "#9b32e0" }}
            >
              <b>My Profile</b>
            </h1>

            <div className="text-center">
              <Image
                //  className="shadow-lg"
                height="130px"
                width="130px"
                alt="Profile Image"
                src={
                  image
                    ? image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVz_XdPamId2_uvEeLG23zjW02eAXgZhCfoQ&usqp=CAU"
                }
                roundedCircle
              />
            </div>

            <Form.Group controlId="fileName" className="mb-3">
              <Form.Label>
                <i class="fa-solid fa-circle-user fa-beat-fade mx-1"></i>
                <b>Profile Image:</b>
              </Form.Label>
              <Form.Control
                type="file"
                name="image"
                size="sm"
                onChange={(event) => {
                  //   setImage(e.target.files[0]);
                  const file = event.target.files[0];
                  if (file) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                      const imageDataURL = e.target.result;
                      // console.log("Base 64 -> ", base64);
                      // You can use imageDataURL as a base64-encoded image string.
                      // console.log(imageDataURL);
                      setImage(imageDataURL);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>
                <i class="fa-solid fa-user fa-beat-fade mx-1"></i>
                <b>Username:</b>
              </Form.Label>
              <Form.Control
                value={name}
                variant="outlined"
                type="text"
                // placeholder="Enter your name here."
                required
                // value={values.email}
                // isInvalid={!!errors.city}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>
                <i class="fa-solid fa-at fa-beat-fade mx-1"></i>
                <b>Email address:</b>
              </Form.Label>
              <Form.Control
                value={email}
                variant="outlined"
                type="email"
                // placeholder="name@example.com"
                required
                // value={values.email}
                // isInvalid={!!errors.city}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please provide a different email as this email has already been
                registered.
              </Form.Control.Feedback>
              {/* <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback> */}
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>
                <i class="fa-solid fa-location-dot fa-beat-fade mx-1"></i>

                <b>Address:</b>
              </Form.Label>
              <Form.Control
                value={address}
                variant="outlined"
                type="text"
                // placeholder="Enter your address here."
                required
                // value={values.email}
                // isInvalid={!!errors.city}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Label>
                <i class="fa-solid fa-location-dot fa-beat-fade mx-1"></i>

                <b>Gender:</b>
              </Form.Label>
            {['checkbox', 'radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            label="1"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            label="2"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          
        </div>
      ))} */}
            <div className="mt-5 grid text-center">
              <Button
                variant="outline-success fw-bold mx-2 py-2 px-4 shadow-lg m-3"
                type="submit"
                //   onClick={handleSignUp}
              >
                Update Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
        }}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="fw-bold text-center fs-3"
          >
            Update Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="text-success fs-4">
            Your Profile has been updated Successfully.
          </div>
          <Button
            variant="outline-secondary shadow-lg fs-5 fw-bold px-3 my-3"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </Form>
    //   )}
    // </Formik>
  );
};

export default MyProfile;
