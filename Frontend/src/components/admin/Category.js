import React, { useContext, useEffect, useRef, useState } from "react";
import categoryContext from "../../context/category/categoryContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Buffer } from "buffer";
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
    const reqBody = {
      name: name,
      image: image,
      userId: decoded.user.id,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(reqBody),
      maxBodyLength: Infinity,
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
      <div className="mt-2 mx-2 row my-5">
        <h1 style={{ fontSize: "50px", color: "#9b32e0" }}>
          <b>Categories:</b>
        </h1>
        <div className="container mx-3">
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
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={category.image} alt="image" />
                  <Card.Body>
                    <Card.Title>{category.name}</Card.Title>
                    {/* <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>  */}
                    <Button variant="primary">Show Products</Button>
                  </Card.Body>
                </Card>
                <img src={category.image.data} alt="" />
              </div>
            );
          })}

        <Button variant="primary" onClick={handleShow}>
          Add Category
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Category Name:</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label>Category Image: </Form.Label>
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
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="success" onClick={handleAdd}>
              Add Category
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
