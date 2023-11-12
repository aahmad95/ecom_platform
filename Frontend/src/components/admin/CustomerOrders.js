import React, { useEffect, useState } from "react";
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
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
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

  // const [searchValue, setSearchValue] = useState("Search Filter");
  // const [filteredProducts, setFilteredProducts] = useState([]);
  // const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);
      if (decoded.user.role === "admin") {
        // setUserId(decoded.user.id);

        getCustomer(params.customerId);
        getOrders(params.customerId);
      } else navigate("/404");
    }

    // eslint-disable-next-line
  }, [load]);

  const getCustomer = async (id) => {
    // console.log(id);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/users/getUser/${id}`,
      requestOptions
    );
    const json = await response.json();
    // console.log("jsonnnnnnnn", json);
    setCustomerName(json.username);
    // console.log(sellerName);
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
      {/* <Stack direction="horizontal"> */}

      <Stack style={{ paddingLeft: "80px" }} gap={1}>
        {/* <div className="mx-3"> */}
        <div className="mx-3 my-5">
          <h1 className="text-center " style={{ color: "#9b32e0" }}>
            <b>{customerName}'s Orders</b>
          </h1>
          <hr style={{ border: "3px solid purple" }} className="mx-auto" />
        </div>
        {/* </div> */}
        <Stack gap={5} className="mx-5 px-5 mb-5">
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
                      {/* responsive */}
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
                                    alt={`${orderItem.product.name} Image`}
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
                        // responsive
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
      <div
      //  style={{width: "55px"}}
      >
        <Sidebar />
      </div>
      {/* </Stack> */}
    </>
  );
};

export default CustomerOrders;
