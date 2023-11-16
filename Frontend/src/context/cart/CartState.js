import React, { useEffect } from "react";
import CartContext from "./cartContext";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const CartState = (props) => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  // [{ productId: "" , productDetailId: "" , quantity: 0 }]

  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const authToken = localStorage.getItem("token");
      var decoded = jwt_decode(authToken);
      setUser(decoded.user);
    }
    // eslint-disable-next-line
  }, []);

  const checkout = async (subtotal, deliveryFee, address) => {
    const payment = subtotal + deliveryFee;
    console.log("payment", payment);
    console.log("deliveryFee", deliveryFee);
    console.log("address", address);

    const orderId = await createOrder(payment, deliveryFee, address);

    const items = [];
    const orderPromises = orderDetails.map(async (order) => {
      const item1 = {
        name: order.product.name,
        description: order.product.description,
        price: order.product.price,
        quantity: order.quantity,
        totalPrice: order.product.price * order.quantity,
      };
      items.push(item1);
      if (await updateStock(order.productDetails.id, order.quantity)) {
        await createOrderItem(
          order.product.price,
          order.quantity,
          order.productDetails.id,
          orderId
        );
      }
    });
    await Promise.all(orderPromises);

    setOrders([]);

    // send email for order placed confirmation:
    sendEmail(user.username, items, subtotal, deliveryFee, user.email);
  };

  const sendEmail = async (name, items, subtotal, deliveryFee, email) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name,
      items,
      subtotal,
      deliveryFee,
      email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/users/emailConfirmation",
      requestOptions
    );
    const data = await response.json();

    console.log("Email:  ", data);
  };

  const createOrder = async (payment, deliveryFee, address) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      payment: payment,
      userId: user.id,
      paymentMethod: "Cash",
      DeliveryFee: deliveryFee,
      address: address,
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
    const order = await response.json();
    return order.id;
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

  const updateStock = async (productDetailId, quantity) => {
    var stock = 0;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/getProductDetail/${productDetailId}`,
      requestOptions
    );
    if (response.status === 200) {
      const json = await response.json();
      stock = json.stock;
    }

    if (stock) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        stock: stock - quantity,
      });

      var requestOptions1 = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response1 = await fetch(
        `http://localhost:5000/api/v1/productDetail/updateProductDetail/${productDetailId}`,
        requestOptions1
      );
      if (response1.status === 200) {
        return true;
      }
    }
    return false;
  };

  return (
    <CartContext.Provider
      value={{
        orders,
        setOrders,
        checkout,
        orderDetails,
        setOrderDetails,
        user,
        setUser,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
