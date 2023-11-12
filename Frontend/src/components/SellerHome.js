import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/esm/Stack";
import Sidebar from "./admin/Sidebar";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
const SellerHome = () => {
  const navigate = useNavigate();

  const [seller, setSeller] = useState("");
  const [products, setProducts] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      var decoded = jwt_decode(authToken);
      setSeller(decoded.user);
      decoded.user.role === "seller"
        ? getProducts(seller.id)
        : navigate("/404");
    }
    // eslint-disable-next-line
  }, []);
  const getProducts = async (id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/product/getProductsOfUser/1",
      requestOptions
    );
    const json = await response.json();
    setProducts(json);
    console.log(json);
  };
  return (
    <>
      <Stack style={{ paddingLeft: "80px" }}>Hello!</Stack>
      <div
      //  style={{width: "55px"}}
      >
        <Sidebar />
      </div>
      {/* </Stack> */}
    </>
  );
};

export default SellerHome;
