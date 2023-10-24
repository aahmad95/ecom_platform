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
  const { orders, setOrders, checkout } = context;
  // const orderItems = [];
  const [orderItems, setOrderItems] = useState([]);
  // { product: {}, productDetails: {}, quantity:0 }
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  useEffect(() => {
    fetchOrderItems();
    // console.log("OrderItems------->", orderItems);
  }, [orders]);
  const fetchOrderItems = async () => {
    const items = [];
    const orderPromises = orders.map(async (order) => {
      // orders.forEach(async (order) => {
      // console.log(order);
      // const orderItem = {
      //   product: {},
      //   productDetails: {},
      //   quantity: order.quantity,
      // };

      // orderItem.productDetails = await getProductDetails(order.productDetailId);
      // console.log(orderItem);
      // console.log(orderItem.productDetails);
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

      // orderItem.product = await getProduct(orderItem.productDetails.productId);
      const response1 = await fetch(
        `http://localhost:5000/api/v1/product/getProduct/${productDetails.productId}`,
        requestOptions
      );
      const json1 = await response1.json();
      const product = json1;
      // console.log(orderItem);
      // console.log(orderItems);
      const orderItem = {
        product,
        productDetails,
        quantity: order.quantity,
      };

      items.push(orderItem);
      console.log("items", items);
    });

    await Promise.all(orderPromises);
    console.log("items......", items);
    setOrderItems(items);
  };
  const handleCancel = (productId) => {
    let newOrder = orders.filter((order) => {
      return order.productDetailId != productId;
    });
    console.log("newOrder-------------", newOrder);
    setOrders(newOrder);
    fetchOrderItems();
  };
  const handleCheckout = () => {
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else if (localStorage.getItem("token")) {
      checkout(orderItems);
    }
    //  let newOrder = orders.filter((order) => {
    //    return order.productDetailId != productId;
    //  });
    //  console.log("newOrder-------------", newOrder);
    //  setOrders(newOrder);
    //  fetchOrderItems();
  };

  // useEffect(() => {
  //   console.log("Order items updated");
  // }, [orderItems]);

  // const getProductDetails = async (id) => {
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   const response = await fetch(
  //     `http://localhost:5000/api/v1/productDetail/getProductDetail/${id}`,
  //     requestOptions
  //   );
  //   const json = await response.json();
  //   return json;
  // };

  // const getProduct = async (id) => {
  //   const requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };
  //   const response1 = await fetch(
  //     `http://localhost:5000/api/v1/product/getProduct/${id}`,
  //     requestOptions
  //   );
  //   const json = await response1.json();
  //   return json;
  // };

  const getOrderItems = async () => {};

  return (
    <div className="d-flex justify-content-center align-items-center bg-white">
      <div className="shadow-lg pg-3 bg-white w-50 m-5 ">
        <div className="mt-5 mx-3 my-5">
          {console.log(orderItems)}
          <h1
            className="text-center"
            style={{ fontSize: "50px", color: "#9b32e0" }}
          >
            <b>Cart</b>
            <img
              src={icon}
              width="60"
              height="60"
              className="d-inline-block align-top"
              alt="E-commerce website logo"
            />
          </h1>
          <hr
            style={{ width: "150px", border: "3px solid purple" }}
            className="mx-auto mt-1"
          />
          <Stack className="mx-auto my-5" gap={3}>
            {orderItems.length > 0 ? (
              orderItems.map((orderItem, index) => {
                console.log("------> Hi", orderItem);
                console.log(index);
                return (
                  // <div>Hello</div>
                  <Card
                    key={orderItem.product.id}
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
                      <ListGroup.Item>
                        {`Price: ${orderItem.product.price} Rs`}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {`Quantity: ${orderItem.quantity}`}
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
                            // console.log(`${key}: ${product[key]}`);
                            return (
                              <ListGroup.Item>
                                {`${key}: ${orderItem.productDetails[key]}`}
                              </ListGroup.Item>
                            );
                          }
                        }
                      })}
                    </ListGroup>
                    <Card.Body className="my-2">
                      <Button
                        // disabled={!(quantity && productDetailId)}
                        variant="dark shadow-lg fs-5 "
                        onClick={() => {
                          handleCancel(orderItem.productDetails.id);
                        }}
                      >
                        Cancel Order
                      </Button>
                    </Card.Body>
                    {/* </Card.Title> */}
                  </Card>
                );
              })
            ) : (
              <div className="text-center">
                You haven't added any product into the cart yet.{" "}
              </div>
            )}
          </Stack>
          <div className="text-center">
            <Button
              // disabled={!(quantity && productDetailId)}
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
        // size="lg"
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
    </div>
  );
};

export default Cart;