import React, { useContext, useEffect, useState } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
const Orders = () => {
  const [user, setUser] = useState();
  const [orders, setOrders] = useState();
  // [{order: order}]
  const [orderDetails, setOrdersDetails] = useState();
  // [{order: order, orderItems: orderItems}]
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
    setOrdersDetails(items);
    console.log("itemssssss", items);
    console.log("OrderDetails", orderDetails);
  };
  return (
    <>
      <Stack gap={3} className="mb-5">
        <div className="mt-5 mb-4 mx-auto">
          <h1 className="text-center fs-1" style={{ color: "#9b32e0" }}>
            <b>Orders</b>
          </h1>
          <hr
            style={{ width: "203px", border: "3px solid purple" }}
            className="mx-auto"
          />
        </div>
        {orders && orders.length ? (
          orderDetails?.map((orderDetail, index) => {
            console.log(orderDetail.order);
            return (
              <div
                key={index}
                class="d-flex justify-content-center align-items-center bg-white shadow-lg mt-2 mx-auto"
              >
                <Stack>
                  <div className="mt-4 mb-2 mx-3">
                    <h1
                      className="text-center fs-2"
                      style={{ color: "#9b32e0" }}
                    >
                      <b>Order </b>
                    </h1>
                    <hr
                      style={{ width: "150px", border: "3px solid purple" }}
                      className="mx-auto"
                    />
                  </div>

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
            <div className="my-5 py-4 fs-2 fw-bold text-center text-danger">
              You haven't ordered anything yet.
            </div>
            <h4 className="text-center mb-5">
              <Link class="button" to="/">
                Back to Homepage
              </Link>
            </h4>
          </>
        )}
      </Stack>
    </>
  );
};

export default Orders;
