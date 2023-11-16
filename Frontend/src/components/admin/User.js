import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Sidebar from "./Sidebar";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      var decoded = jwt_decode(authToken);
      decoded.user.role === "admin" && getCategories();
    }
    const getCategories = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/category/getAllCategory`
      );
      setCategories(data);
    };

    // eslint-disable-next-line
  }, []);
  const handleAdd = async () => {
    const authToken = localStorage.getItem("token");
    var decoded = jwt_decode(authToken);

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
  };
  return (
    <>
      <Stack direction="horizontal">
        <div>
          <Sidebar />
        </div>
        <div>
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

            <div className="container text-center mt-2">
              <div className="row row-cols-3">
                {categories &&
                  categories.map((category) => {
                    return (
                      <div>
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
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="title">
                    <Form.Label className="fw-bold fs-3">
                      Category Name:
                    </Form.Label>
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
                        console.clear();
                        console.log();
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
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary shadow-lg fw-bold p-2 "
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="success shadow-lg fw-bold p-2"
                  onClick={handleAdd}
                >
                  Add Category
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </Stack>
    </>
  );
};

export default Category;
