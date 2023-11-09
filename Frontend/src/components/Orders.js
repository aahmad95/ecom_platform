import React, { useContext, useEffect, useState } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/esm/Table";
import Badge from "react-bootstrap/esm/Badge";
const Orders = () => {
  const [user, setUser] = useState();
  const [orders, setOrders] = useState("");
  // [{order: order}]
  const [orderDetails, setOrdersDetails] = useState();
  // [{order: order, orderItems: {orderItem:orderItem, productDetail:productDetail, product: product}}]
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      var decoded = jwt_decode(authToken);
      setUser(decoded.user);
      getOrders(decoded.user.id);
    }
    // console.log("props:    ",props.orderItems)
    // console.log("orderDetails: ",orderDetails);

    // setOrderItems(ordersDetails);
    // console.log("orderItems:  ",orderItems)
    // fetchOrderItems();
    // console.log("OrderItems------->", orderItems);
  }, []);

  const getOrders = async (userId) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/order/getOrdersByUserId/${userId}`,
      requestOptions
    );
    const json = await response.json();

    if (json.length) {
      setOrders(json);
      const items = [];
      const orderPromises = json.map(async (order) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const response = await fetch(
          `http://localhost:5000/api/v1/orderItem/getOrderItemsByOrderId/${order.id}`,
          requestOptions
        );
        const json = await response.json();
        items.push({ order, orderItems: json });
      });
      await Promise.all(orderPromises);
      items.sort((o1, o2) =>
        o1.order.id < o2.order.id ? 1 : o1.order.id > o2.order.id ? -1 : 0
      );
      setOrdersDetails(items);
      console.log("itemssssss", items);
      console.log("OrderDetails", orderDetails);
    }
  };
  return (
    <div>
      <Stack gap={5} className="mb-5 mx-5 px-5">
        <div className="mt-5 mx-auto">
          <h1 className="text-center" style={{ color: "#9b32e0" }}>
            <b>Orders</b>
          </h1>
          <hr
            style={{ width: "150px", border: "3px solid purple" }}
            className="mx-auto"
          />
        </div>
        {orders && orders.length ? (
          orderDetails?.map((orderDetail, index) => {
            console.log(orderDetail.order);
            return (
              <div
                key={index}
                class="d-flex justify-content-center align-items-center bg-white shadow-lg mt-2 mx-auto px-2"
              >
                <Stack className="mb-3">
                  <div className="mt-5 mb-2 mx-3">
                    <h1
                      className="text-center fs-2"
                      style={{ color: "#9b32e0" }}
                    >
                      <b>Order No: {orderDetail.order.id}</b>
                    </h1>
                    <hr
                      style={{ width: "180px", border: "3px solid purple" }}
                      className="mx-auto"
                    />
                    <div className="text-end">
                      <Badge
                        bg={
                          orderDetail.order.status === "Completed"
                            ? "success"
                            : "warning"
                        }
                        className="p-3 fs-5 shadow-lg"
                      >
                        {orderDetail.order.status}
                      </Badge>
                    </div>
                  </div>
                  <Stack className="mx-3" gap={2}>
                    <h4 className="text-info fw-bold">Order Items:</h4>
                    {/* resposive */}
                    <Table striped bordered hover className="shadow-lg">
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Product</th>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Product Details</th>
                          <th>Product Brand</th>
                          <th>Product Warranty</th>

                          <th>Price</th>
                          <th>Quantity</th>
                          <th>TotalPrice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderDetail.orderItems?.map((orderItem, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{orderItem.product.name}</td>
                              <td>
                                <img
                                  className="shadow-lg border"
                                  width="45px"
                                  height="45px"
                                  src={orderItem.productDetail.image}
                                  alt={"Image"}
                                />
                              </td>
                              <td>{orderItem.product.description}</td>
                              <td>
                                <Stack>
                                  {Object.keys(orderItem.productDetail)?.map(
                                    (key, index) => {
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
                                        // console.log(`/////////${key}: ${product[key]}`);
                                        if (orderItem.productDetail[key]) {
                                          // console.log(`${key}: ${product[key]}`);

                                          return (
                                            // <img src={product[key]}></img>
                                            <div key={index}>
                                              <Stack
                                                direction="horizontal"
                                                gap={1}
                                              >
                                                <div className="p-2 text-muted">
                                                  {key}:{" "}
                                                </div>
                                                <div className="p-2 text-dark">
                                                  {orderItem.productDetail[key]}
                                                </div>
                                              </Stack>
                                            </div>
                                          );
                                        }
                                      }
                                    }
                                  )}
                                  <div></div>
                                </Stack>
                              </td>
                              <td>{orderItem.product.brand}</td>
                              <td>{orderItem.product.warranty}</td>
                              <td>{orderItem.orderItem.price}</td>
                              <td>{orderItem.orderItem.quantity}</td>
                              <td>
                                {orderItem.orderItem.price *
                                  orderItem.orderItem.quantity}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>

                    <h4 className="text-info fw-bold ms-5 ps-5">
                      Order Summary:
                    </h4>
                    <Table
                      striped
                      bordered
                      hover
                      //   responsive
                      className="mx-auto w-50 shadow-lg"
                    >
                      <tbody className="px-3">
                        <tr>
                          <td width="50%">
                            <b>Subtotal </b>
                          </td>

                          <td>
                            {orderDetail.order.payment -
                              orderDetail.order.DeliveryFee}{" "}
                            Rs
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>Delivery Fee</b>
                          </td>

                          <td>{orderDetail.order.DeliveryFee} Rs</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Total Payment</b>
                          </td>

                          <td>{orderDetail.order.payment} Rs</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Delivery Address</b>
                          </td>

                          <td>{orderDetail.order.address}</td>
                        </tr>
                        <tr>
                          <td>
                            <b>Payment Method</b>
                          </td>

                          <td>{orderDetail.order.paymentMethod}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Stack>
                  {/* <div class="row g-3 align-items-center">   */}
                  {/* <div>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="validationCustom03"
              >
                {/* <div class="col-auto"> */}
                  {/* <Form.Label column sm="3">
                  <Stack direction="horizontal" className="mx-4 mb-1 fs-4">
                    <i class="fa-solid fa-location-dot fa-beat-fade mx-1"></i>
                    <b>Address:</b>
                  </Stack>
                </Form.Label> */}
                  {/* </div> */}
                  {/* <div class="col-auto"> */}
                  {/* <Col sm="8" className="p-2">
                  <Form.Control
                    // name="email"
                    className="text-center"
                    variant="outlined"
                    type="text"
                    placeholder="Enter your address here."
                    required
                    value={address}
                    // value={values.email}
                    // isInvalid={!!errors.city}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Col> */}
                  {/* </div>  */}
                  {/* <Form.Control.Feedback type="invalid">
                   Please provide a valid address.
                 </Form.Control.Feedback> */}
                  {/* </Form.Group>
            </div> */}
                </Stack>
              </div>
            );
          })
        ) : (
          <>
            <div className="my-4 py-3 fs-2 fw-bold text-center text-danger">
              You haven't ordered anything yet.
            </div>
            <h4 className="text-center">
              <Link class="button" to="/">
                Back to Homepage
              </Link>
            </h4>
          </>
        )}
      </Stack>
    </div>
  );
};

export default Orders;
