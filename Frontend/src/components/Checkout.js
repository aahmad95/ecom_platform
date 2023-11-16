import React, { useContext, useEffect, useState } from "react";
import cartContext from "../context/cart/cartContext";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import icon from "../logo.svg";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import jwt_decode from "jwt-decode";

const Checkout = () => {
  const context = useContext(cartContext);
  const { orderDetails, checkout } = context;
  // {product:{},productDetails:{},quantity:0}
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [hide, setHide] = useState(true);
  const [address, setAddress] = useState();

  const deliveryFee = 100;
  let subtotal = 0;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);
      setAddress(decoded.user.address);
    }
  }, [orderDetails]);

  const handlePlaceOrder = () => {
    setModal(true);
    checkout(subtotal, deliveryFee, address);

    setTimeout(() => {
      navigate("/home");
    }, 4000);
  };

  return (
    <>
      {orderDetails.length ? (
        <Container>
          <Form>
            <Row>
              <div className="mt-5 mb-4 mx-auto">
                <h1 className="text-center fs-1" style={{ color: "#9b32e0" }}>
                  <b>Place Order</b>
                </h1>
                <hr
                  style={{ width: "203px", border: "3px solid purple" }}
                  className="mx-auto"
                />
              </div>

              <Col>
                <div className="d-flex justify-content-center align-items-center bg-white shadow-lg mt-2">
                  <Stack>
                    <div className="mt-4 mb-2">
                      <h1
                        className="text-center fs-2"
                        style={{ color: "#9b32e0" }}
                      >
                        <b>Order Address </b>
                      </h1>
                      <hr
                        style={{ width: "212px", border: "3px solid purple" }}
                        className="mx-auto"
                      />
                    </div>
                    <div>
                      <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="validationCustom03"
                      >
                        <Form.Label column sm="3">
                          <Stack
                            direction="horizontal"
                            className="mx-4 mb-1 fs-4"
                          >
                            <i className="fa-solid fa-location-dot fa-beat-fade mx-1"></i>
                            <b>Address:</b>
                          </Stack>
                        </Form.Label>

                        <Col sm="8" className="p-2">
                          <Form.Control
                            className="text-center"
                            variant="outlined"
                            type="text"
                            placeholder="Enter your address here."
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </Col>
                      </Form.Group>
                      <div
                        hidden={hide}
                        className="text-danger text-center fa-bounce"
                      >
                        Address cannot be empty!
                      </div>
                    </div>
                  </Stack>
                </div>

                <div className="d-flex justify-content-center align-items-center bg-white shadow-lg my-5">
                  <Stack>
                    <div className="mt-4 mb-2">
                      <h1
                        className="text-center fs-2"
                        style={{ color: "#9b32e0" }}
                      >
                        <b>Order Items Details</b>
                      </h1>
                      <hr
                        style={{ width: "286px", border: "3px solid purple" }}
                        className="mx-auto"
                      />
                    </div>
                    <div className="m-2 fs-5">
                      <Table bordered hover>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th colSpan={2}>Products </th>
                            <th>Price</th>
                            <th>Quantity </th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails.map((p, index) => {
                            subtotal = subtotal + p.product.price * p.quantity;
                            return (
                              <tr key={index}>
                                <td>{p.product.name}</td>
                                <td>
                                  <img
                                    width="50px"
                                    height="60px"
                                    alt="ProductImage"
                                    src={p.productDetails.image}
                                  />
                                </td>
                                <td>{p.product.description}</td>
                                <td>{p.product.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.product.price * p.quantity}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </Stack>
                </div>
              </Col>
              <Col className="gx-0 col-4">
                <div className="d-flex justify-content-center align-items-center bg-white shadow-lg m-2 mb-5">
                  <Stack gap={1}>
                    <div className="mx-3 my-4">
                      <h1
                        className="text-center fs-2"
                        style={{ color: "#9b32e0" }}
                      >
                        <b>Order Summary</b>
                      </h1>
                      <hr
                        style={{ width: "236px", border: "3px solid purple" }}
                        className="mx-auto"
                      />
                    </div>

                    <div className="m-2 fs-4">
                      <Table hover>
                        <tbody>
                          <tr>
                            <td className="text-muted">Subtotal: </td>
                            <td>Rs. {subtotal}</td>
                          </tr>
                          <tr>
                            <td className="text-muted">Delivery Fee: </td>
                            <td>Rs. {deliveryFee}</td>
                          </tr>
                          <tr>
                            <td>Total: </td>
                            <td>Rs. {subtotal + deliveryFee}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="text-center m-5">
                      <Button
                        variant="outline-success shadow-lg fs-4 fw-bold p-1 px-2"
                        onClick={() => {
                          if (address) {
                            setHide(true);
                            setShow(true);
                          } else {
                            setHide(false);
                          }
                        }}
                      >
                        Place Order
                      </Button>
                      <Button
                        variant="outline-info shadow-lg fs-4 fw-bold mt-3 p-1 px-3"
                        onClick={() => {
                          navigate("/cart");
                        }}
                      >
                        Edit Order
                      </Button>
                    </div>
                  </Stack>
                </div>
              </Col>
            </Row>

            <Modal
              show={show}
              onHide={() => {
                setShow(false);
              }}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="text-center"
            >
              <Modal.Header closeButton>
                <Modal.Title
                  id="contained-modal-title-vcenter "
                  className="fw-bold text-center fs-2"
                >
                  Place Order
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-danger fs-2">Are you sure?</div>

                <Button
                  variant="outline-secondary shadow-lg fs-5 fw-bold px-4 my-4 mx-2"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  No
                </Button>
                <Button
                  variant="outline-warning shadow-lg fs-5 fw-bold px-4 my-4 mx-2"
                  onClick={() => {
                    setShow(false);
                    handlePlaceOrder();
                  }}
                >
                  Yes
                </Button>
              </Modal.Body>
            </Modal>
          </Form>

          <Modal
            show={modal}
            onHide={() => {
              setModal(false);
            }}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="text-center"
          >
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-vcenter "
                className="fw-bold text-center fs-3"
              >
                Order Placed
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <div className="text-success fs-4">
                Your order has been placed Successfully.
              </div>
              <Button
                variant="outline-danger shadow-lg fs-5 fw-bold px-3 my-3"
                onClick={() => {
                  setModal(false);
                  navigate("/home");
                }}
              >
                Close
              </Button>
            </Modal.Body>
          </Modal>
        </Container>
      ) : (
        <div className="d-flex justify-content-center align-items-center bg-white">
          <div className="shadow-lg pg-3 bg-white w-45 m-5 p-5">
            <h1
              className="text-center"
              style={{ fontSize: "50px", color: "#9b32e0" }}
            >
              <b>Place Order</b>
              <img
                src={icon}
                width="60"
                height="60"
                // className="d-inline-block align-top"
                alt="E-commerce website logo"
              />
            </h1>
            <hr
              style={{ width: "320px", border: "3px solid purple" }}
              className="mx-auto mt-1"
            />
            <div className="m-3 p-5 fs-2 fw-bold text-danger">
              Nothing in the cart for checkout.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
