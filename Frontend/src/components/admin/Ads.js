import React, { useEffect, useState } from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import categoryContext from "../../context/category/categoryContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Buffer } from "buffer";

// import closeButton from "react-bootstrap/ModalHeader";

const Ads = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [priority, setPriority] = useState(false);
  const [userId, setUserId] = useState(false);
  const [ads, setAds] = useState([]);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   getUserId();
  //   //  getCategories();
  //   // eslint-disable-next-line
  // }, []);

  // const getUserId = async () => {
  //   const token = localStorage.getItem("token");

  //   var decoded = await jwt_decode(token);

  //   await setUserId(decoded.user.id);
  // };
  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    // console.log(e);
    console.log(priority);
    // console.log("image:", image);

    // const authToken = localStorage.getItem("token");
    // var decoded = jwt_decode(authToken);

    // const response = await fetch(
    //   "http://localhost:5000/category/createCategory",
    //   requestOptions
    // );
    // const json = await response.json();
    // console.log(json);
    // handleClose();
  };
  return (
    <div>
      <div className="mt-2 mx-2 row my-5">
        <h1 style={{ fontSize: "50px", color: "#9b32e0" }}>
          <b>Ads:</b>
        </h1>

        <div className="container mx-3 text-center">
          <Button
            variant="outline-dark py-2 px-3  m-5  fw-bold fs-2 shadow-lg"
            onClick={handleShow}
          >
            Add New Ad
          </Button>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="fw-bold text-center fs-1"
            >
              Add new Ad
            </Modal.Title>

            {/* <button
              type="button"
              className="btn-close justify-content-end"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button> */}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fw-bold fs-3">Ad Name:</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label className="fw-bold fs-3">Set Priority:</Form.Label>
                <Form.Check // prettier-ignore
                  className="mx-3"
                  type="switch"
                  id="custom-switch"
                  // defaultChecked={priority}
                  required
                  onChange={(e) => setPriority(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="fw-bold fs-3">Ad Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  size="lg"
                  required
                  onChange={(event) => {
                    //   setImage(e.target.files[0]);
                    console.clear();
                    console.log();
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary shadow-lg fw-bold p-2"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="success shadow-lg fw-bold p-2" onClick={handleAdd}>
              Add Category
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Ads;
