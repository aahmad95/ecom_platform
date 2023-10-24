import React, { useEffect } from "react";
import CartContext from "./cartContext";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const CartState = (props) => {
  const [orders, setOrders] = useState([]);
  let orderId;
  // [{ productDetailId: "", quantity: 0 }]
  const [orderItem, setOrderItem] = useState([]);
  // const [orders, setOrders] = useState([]);
  const host = "http://localhost:5000";
  const [user, setUser] = useState("");
  const authToken = localStorage.getItem("token");
  useEffect(() => {
    var decoded = jwt_decode(authToken);
    setUser(decoded.user);
    // console.log(decoded);
    console.log(user);
  }, []);

  const checkout = async (data) => {
    let price = 100;
    // console.log(decoded);
    // console.log(user);
    // const orderId =
    await createOrder();
    console.log("data:  ", data);
    console.log("orders:  ", orders);
    console.log("orderId", orderId);

    const orderPromises = data.map(async (order) => {
      console.log(">>>>>>>>>", order);
      console.log(order.product.price, order.quantity, order.productDetails.id);
      price = price + order.product.price * order.quantity;
      await createOrderItem(
        order.product.price,
        order.quantity,
        order.productDetails.id,
        orderId
      );
    });
    await Promise.all(orderPromises);
    console.log(price);
    await updateOrder(price);
  };
  const createOrder = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      payment: 0,
      userId: user.id,
      paymentMethod: "Cash",
      DeliveryFee: 100,
      address: user.address,
      status: "Pending",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/order/createOrder",
      requestOptions
    );
    const data = await response.json();
    orderId = await data.id;

    console.log("Order:  ", data);
    console.log("orderId: ", orderId);
    // return await data.id;
  };

  const createOrderItem = async (price, quantity, productDetailId, orderId) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      price: price,
      quantity: quantity,
      productDetailId: productDetailId,
      orderId: orderId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/orderItem/createOrderItem",
      requestOptions
    );
    const data = await response.json();
    console.log("orderItem:  ", data);
  };

  const updateOrder = async (price) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      payment: price,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/order/updateOrder/${orderId}`,
      requestOptions
    );
    const data = await response.json();
    console.log("Updated Order: ", data);
  };

  return (
    <CartContext.Provider value={{ orders, setOrders, checkout }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
