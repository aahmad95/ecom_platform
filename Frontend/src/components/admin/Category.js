import React, { useContext, useEffect, useRef, useState } from "react";
import categoryContext from "../../context/category/categoryContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Category = () => {
  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    // getCategories();
    console.log(name, image);

    // eslint-disable-next-line
  }, []);
  const handleAdd = (e) => {
    // console.log(e);
    // console.log(name);
    // console.log("image:", image);
    // {
    //     const formData = new FormData()
    //         formData.append('image', image)
    //         formData.append('title', title)
    //         formData.append('price', price)
    //         formData.append('description', description)
    //         formData.append('published', published)
    //         await axios.post('/api/products/addProduct', formData)
    //         history.push('/products')
    //   };
  };
  return (
    <div>
      <div className="mt-2 mx-2 row my-5">
        <h1 style={{ fontSize: "50px", color: "#9b32e0" }}>
          <b>Categories:</b>
        </h1>
        <div className="container mx-3">
          {/* {categories.length === 0 && "No Categories to display."} */}
        </div>

        {/* {categories.map((category) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={category.image} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                {/* <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text> 
                <Button variant="primary">Show Products</Button>
              </Card.Body>
            </Card>
          );
        })}
         */}
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
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        const imageDataURL = e.target.result;
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
      <div>
        <h1>Image Display</h1>
        <img src={image} alt="Base64 Image" />
      </div>
    </div>
  );
};

export default Category;
