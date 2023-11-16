import React, { useContext, useEffect, useState } from "react";
import cartContext from "../context/cart/cartContext";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import icon from "../logo.svg";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const context = useContext(cartContext);

  const { orders, setOrders, orderDetails, setOrderDetails } = context;
  // orders=[{productDetailId,quantity}]
  const [orderItems, setOrderItems] = useState([]);
  // { product: {}, productDetails: {}, quantity:0 }
  const [orderId, setOrderId] = useState("");
  const [show, setShow] = useState(false);
  const [cancel, setCancel] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchOrderItems();
    }
    setLoad(false);
    console.log("hello");
    console.log(orders);
    // eslint-disable-next-line
  }, [load]);

  const fetchOrderItems = async () => {
    const items = [];
    const orderPromises = orders.map(async (order) => {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetch(
        `http://localhost:5000/api/v1/productDetail/getProductDetail/${order.productDetailId}`,
        requestOptions
      );
      const json = await response.json();
      const productDetails = json;

      const response1 = await fetch(
        `http://localhost:5000/api/v1/product/getProduct/${productDetails.productId}`,
        requestOptions
      );
      const json1 = await response1.json();
      const product = json1;
      const orderItem = {
        product,
        productDetails,
        quantity: order.quantity,
      };

      items.push(orderItem);
    });

    await Promise.all(orderPromises);
    setOrderItems(items);
  };

  const handleCancel = async (productId) => {
    console.log(productId);
    setCancel(false);
    let newOrder = orders.filter((order) => {
      return parseInt(order.productDetailId) !== productId;
    });
    await Promise.all(newOrder);
    console.log(newOrder);
    await setOrders(newOrder);
    setLoad(true);
  };

  const updateQuantity = async (orderItem) => {
    const array = orders.map((order) => {
      if (order.productDetailId === orderItem.productDetails.id) {
        order.quantity = orderItem.quantity;
      }
      return order;
    });
    setOrders(array);
  };

  const handleCheckout = async () => {
    await setOrderDetails(orderItems);
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else if (localStorage.getItem("token")) {
      navigate("/checkout");
    }
    console.log(orderDetails);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-white">
      <div className="shadow-lg pg-3 bg-white w-50 m-5 ">
        <div className="mt-5 mx-3 my-5">
          <h1
            className="text-center"
            style={{ fontSize: "50px", color: "#9b32e0" }}
          >
            <b>Cart</b>
            <img
              src={icon}
              width="70"
              height="60"
              // className="d-inline-block align-top"
              alt="E-commerce website logo"
            />
          </h1>
          <hr
            style={{ width: "155px", border: "3px solid purple" }}
            className="mx-auto mt-1"
          />
          <Stack className="mx-auto my-5" gap={3}>
            {orderItems.length > 0 ? (
              orderItems.map((orderItem, index) => {
                return (
                  <Card
                    key={index}
                    style={{ width: "20rem" }}
                    className="text-center shadow-lg mx-auto border-info my-4"
                  >
                    <Card.Body className="my-2">
                      <Card.Title className="fs-2">
                        {orderItem.product.name}
                      </Card.Title>
                      <Card.Text className="fs-4">
                        {orderItem.product.description}
                      </Card.Text>
                    </Card.Body>
                    <Card.Img
                      variant="bottom"
                      src={orderItem.productDetails.image}
                      height="300px"
                    />
                    <ListGroup className="list-group-flush fs-4">
                      <ListGroup.Item className="fw-bold">
                        {`Price: ${orderItem.product.price} Rs`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Quantity:
                        <Button
                          disabled={orderItem.quantity < 2}
                          variant="secondary shadow-lg fw-bold p-1  px-2 mx-3"
                          onClick={() => {
                            console.log("orderItem in button", orderItem);
                            orderItem.quantity = orderItem.quantity - 1;
                            updateQuantity(orderItem);
                          }}
                        >
                          &#8722;
                        </Button>
                        <b>{orderItem.quantity}</b>
                        <Button
                          disabled={
                            orderItem.quantity ===
                            orderItem.productDetails.stock
                          }
                          variant="secondary shadow-lg fw-bold p-1  px-2 mx-3"
                          onClick={() => {
                            orderItem.quantity = orderItem.quantity + 1;
                            updateQuantity(orderItem);
                          }}
                        >
                          &#43;
                        </Button>
                      </ListGroup.Item>
                      {Object.keys(orderItem.productDetails).map((key) => {
                        if (
                          ![
                            "createdAt",
                            "updatedAt",
                            "id",
                            "productId",
                            "stock",
                            "image",
                          ].includes(key)
                        ) {
                          if (orderItem.productDetails[key]) {
                            return (
                              <ListGroup.Item
                                key={orderItem.productDetails[key]}
                              >
                                {`${key}: ${orderItem.productDetails[key]}`}
                              </ListGroup.Item>
                            );
                          }
                        }
                        return false;
                      })}
                    </ListGroup>
                    <Card.Body className="my-2">
                      <Button
                        variant="dark shadow-lg fs-5 "
                        onClick={() => {
                          setOrderId(orderItem.productDetails.id);
                          setCancel(true);
                        }}
                      >
                        Cancel Order
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })
            ) : (
              <div className="text-center">
                You haven't added any product into the cart yet.
              </div>
            )}
          </Stack>
          <div className="text-center">
            <Button
              disabled={!orders.length}
              variant="outline-success shadow-lg fs-4 fw-bold p-1 px-4 mb-3"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="fw-bold text-center fs-1"
          >
            Add to Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fs-3">
          Please login first for adding this product to cart.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger shadow-lg fw-bold"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="info shadow-lg fw-bold"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={cancel}
        onHide={() => {
          setCancel(false);
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
            Cancel Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fs-2">Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="info shadow-lg fw-bold px-4"
            onClick={() => {
              setCancel(false);
            }}
          >
            No
          </Button>
          <Button
            variant="danger shadow-lg fw-bold px-4"
            onClick={() => {
              handleCancel(orderId);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
