import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Sidebar from "./Sidebar";
import Stack from "react-bootstrap/Stack";
import { useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

// import closeButton from "react-bootstrap/ModalHeader";

const CustomerOrders = () => {
  const params = useParams();
  const [load, setLoad] = useState(false);

  const [customerName, setCustomerName] = useState();

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
      const decoded = jwt_decode(authToken);
      if (decoded.user.role === "admin") {
        getCustomer(params.customerId);
        getOrders(params.customerId);
      }
    }
    setLoad(false);
    // eslint-disable-next-line
  }, [load]);

  const getCustomer = async (id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/users/getUser/${id}`,
      requestOptions
    );
    const json = await response.json();
    setCustomerName(json.username);
  };

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
    <>
      <Stack style={{ paddingLeft: "80px" }} gap={1}>
        <div className="mx-3 my-5">
          <h1 className="text-center " style={{ color: "#9b32e0" }}>
            <b>{customerName}'s Orders</b>
          </h1>
          <hr style={{ border: "3px solid purple" }} className="mx-auto" />
        </div>
        <Stack gap={5} className="mx-5 px-5 mb-5">
          {orders && orders.length ? (
            orderDetails?.map((orderDetail, index) => {
              console.log(orderDetail.order);
              return (
                <div
                  key={index}
                  className="d-flex justify-content-center align-items-center bg-white shadow-lg mt-2 mx-auto px-2"
                >
                  <Stack className="mb-3">
                    <div className="mt-5 mb-2 mx-3">
                      <h1
                        className="text-center fs-2"
                        style={{ color: "#9b32e0" }}
                      >
                        <b>Order No: {orderDetails.length - index}</b>
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
                      <Table striped bordered hover className="shadow-lg ">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Product Category</th>
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
                                    alt={`${orderItem.product.name}`}
                                  />
                                </td>
                                <td>{orderItem.product.description}</td>
                                <td>{orderItem.product.category}</td>
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
                                          if (orderItem.productDetail[key]) {
                                            return (
                                              <div key={index}>
                                                <Stack
                                                  direction="horizontal"
                                                  gap={1}
                                                >
                                                  <div className="p-2 text-muted">
                                                    {key}:{" "}
                                                  </div>
                                                  <div className="p-2 text-dark">
                                                    {
                                                      orderItem.productDetail[
                                                        key
                                                      ]
                                                    }
                                                  </div>
                                                </Stack>
                                              </div>
                                            );
                                          }
                                        }
                                        return false;
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
                        className="mx-auto  w-50 shadow-lg"
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
                  </Stack>
                </div>
              );
            })
          ) : (
            <>
              <div className="mb-5 mt-1 py-5 fs-2 fw-bold text-center text-danger">
                There isn't any order from this customer yet.
              </div>
            </>
          )}
        </Stack>
      </Stack>
      <div>
        <Sidebar />
      </div>
    </>
  );
};

export default CustomerOrders;
