import React, { useContext, useEffect, useRef, useState } from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import categoryContext from "../../context/cart/cartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Buffer } from "buffer";
import Sidebar from "./Sidebar";
// import closeButton from "react-bootstrap/ModalHeader";
const Category = () => {
  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/category/getAllCategory`
      );
      setCategories(data);
    };
    getCategories();

    //Logic for adding note:
    // eslint-disable-next-line
  }, []);
  const handleAdd = async () => {
    // console.log(e);
    // console.log(name);
    // console.log("image:", image);
    // {
    const authToken = localStorage.getItem("token");
    var decoded = jwt_decode(authToken);

    // const formData = new FormData();
    // // formData.append("name", name);
    // // formData.append("image", image);
    // // formData.append("userId", decoded.user.id);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      image: image,
      userId: decoded.user.id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/category/createCategory",
      requestOptions
    );
    const json = await response.json();
    console.log(json);
    handleClose();
    // const response= await axios.post('http://localhost:5000/category/createCategory', formData);
  };
  return (
    <div>
      <Sidebar/>
      <div className="mt-2 mx-2 row my-5">
        <h1 style={{ fontSize: "50px", color: "#9b32e0" }}>
          <b>Categories:</b>
        </h1>

        <div className="container mx-3 text-center">
          <Button
            variant="outline-dark py-2 px-3  m-5  fw-bold fs-2 shadow-lg"
            onClick={handleShow}
          >
            Add New Category
          </Button>
          {categories.length === 0 && "No Categories to display."}
        </div>
        {/* {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
              showAlert={props.showAlert}
            />
          );
        })} */}
        <div class="container text-center mt-2">
          <div class="row row-cols-3">
            {categories &&
              categories.map((category) => {
                // const base64String = btoa(
                //   String.fromCharCode(...new Uint8Array(category.image.data))
                // );
                // console.log(base64String);
                // console.log(category.image.data);
                return (
                  <div>
                    {/* console.log(categories); */}
                    <Card className="shadow-lg">
                      <Card.Img
                        variant="top"
                        src={category.image}
                        alt="image"
                      />
                      <Card.Body>
                        <Card.Title className="fw-bold fs-1">
                          {category.name}
                        </Card.Title>
                        {/* <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>  */}
                        <Button variant="info fw-bold shadow-lg">
                          Products
                        </Button>
                      </Card.Body>
                    </Card>
                    <img src={category.image.data} alt="" />
                  </div>
                );
              })}
          </div>
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
              Add Category
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
                <Form.Label className="fw-bold fs-3">Category Name:</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="fw-bold fs-3">
                  Category Image:{" "}
                </Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  size="lg"
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
              variant="secondary shadow-lg fw-bold p-2 "
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

export default Category;
