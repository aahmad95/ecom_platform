import React, { useEffect } from "react";
import CartContext from "./cartContext";
import { useState } from "react";
import jwt_decode from "jwt-decode";

const CartState = (props) => {
  const [orders, setOrders] = useState([]);
  const[orderDetails, setOrderDetails]=useState([]);
  // let orderId;
  // [{ productDetailId: "", quantity: 0 }]
  const [orderItem, setOrderItem] = useState([]);
  // const [orders, setOrders] = useState([]);
  const host = "http://localhost:5000";
  const [user, setUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const authToken = localStorage.getItem("token");
      var decoded = jwt_decode(authToken);
      setUser(decoded.user);
    }
    // console.log(decoded);
    console.log("user: ",user);
  }, []);

  const checkout = async (payment, deliveryFee, address ,name) => {
    console.log("payment", payment)
    console.log("deliveryFee", deliveryFee)
    console.log("address", address)
   
    
    // let price = 100;
    // console.log(decoded);
    // console.log(user);
    // const orderId =
    const orderId=await createOrder(payment, deliveryFee, address);
    // console.log("data:  ", data);
    console.log("orderDetails:  ", orderDetails);
    console.log("orderId", orderId);
const items=[];
    const orderPromises = orderDetails.map(async (order) => {
      console.log(">>>>>>>>>", order);
      // console.log(order.product.price, order.quantity, order.productDetails.id);
      // price = price + order.product.price * order.quantity;
      const item1={name: order.product.name,
        description: order.product.description,
        price: order.product.price,
        quantity: order.quantity,
        totalPrice: order.product.price* order.quantity}
        items.push(item1);
      await createOrderItem(
        order.product.price,
        order.quantity,
        order.productDetails.id,
        orderId
      );
    });
    await Promise.all(orderPromises);
    console.log("done");
    setOrders([]);
    
// console.log("username",user.username);
console.log("items",items);
// console.log("payment",payment);
// console.log("deliveryFee",deliveryFee);
    // send email for order placed confirmation:
    sendEmail(user.username, items,payment,deliveryFee, user.email)

  };


  const sendEmail=async(name, items, payment ,deliveryFee,email)=>{

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  name,
  items,
  subtotal: payment,
  deliveryFee,
  email
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const response=await fetch("http://localhost:5000/api/v1/users/emailConfirmation", requestOptions)
const data = await response.json();


console.log("Email:  ", data);
}




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
    const data = await response.json();
    // orderId = await data.id;

    console.log("Order:  ", data);
    // console.log("orderId: ", orderId);
    return data.id;
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

  // const updateOrder = async (price) => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({
  //     payment: price,
  //   });

  //   var requestOptions = {
  //     method: "PUT",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

    // const response = await fetch(
    //   `http://localhost:5000/api/v1/order/updateOrder/${orderId}`,
    //   requestOptions
    // );
    // const data = await response.json();
    // console.log("Updated Order: ", data);
  // };

  return (
    <CartContext.Provider value={{ orders, setOrders, checkout, orderDetails,setOrderDetails }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
