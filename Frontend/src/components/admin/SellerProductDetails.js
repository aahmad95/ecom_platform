import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";

const SellerProductDetails = (props) => {
  const param = useParams();

  const [product, setProduct] = useState("");
  const [productDetails, setProductDetails] = useState(null);
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);
      if (decoded.user.role === "admin") {
        getProduct();
        getProductDetails();
      }
    }

    // eslint-disable-next-line
  }, []);
  const getProduct = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/api/v1/product/getProduct/${param.productId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => console.log("error", error));
  };

  const getProductDetails = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/getProductDetailsByProduct/${param.productId}`,
      requestOptions
    );

    const json = await response.json();
    setProductDetails(json);

    const imageArr = [];
    json.forEach(async (productDetail) => {
      productDetail.image.forEach(async (i) => {
        if (!imageArr.includes(i)) {
          imageArr.push(i);
        }
      });
    });

    setImages(imageArr);
  };

  return (
    <>
      <Stack style={{ paddingLeft: "80px" }}>
        <div className="mx-3">
          <div className="mx-3 my-5">
            <h1 className="text-center " style={{ color: "#9b32e0" }}>
              <b>{product.name}</b>
            </h1>
            <hr style={{ border: "3px solid purple" }} className="mx-auto" />
          </div>

          <Container>
            <Row>
              <Col className="gx-5 col-4">
                <Carousel className="border border-info shadow-lg mb-5">
                  {images.length ? (
                    images.map((image) => {
                      return (
                        <div key={image}>
                          <img
                            className="shadow-lg"
                            width="50%"
                            height="70%"
                            alt="Product"
                            src={image}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div>No Images to show.</div>
                  )}
                </Carousel>
              </Col>

              <Col className="mx-3">
                <h2>{product.description}</h2>
                <Stack direction="horizontal" gap={1}>
                  <div className="p-2 fs-5 text-muted">Warranty:</div>
                  <div className="p-2 fs-5 text-info">{product.warranty}</div>
                </Stack>
                <Stack direction="horizontal" gap={1}>
                  <div className="p-2 fs-5 text-muted">Brand:</div>
                  <div className="p-2 fs-5 text-info">{product.brand}</div>
                </Stack>

                <hr />
                <Stack direction="horizontal" gap={1}>
                  <h2> Price: </h2>
                  <h2 className="text-danger"> {product.price} Rs</h2>
                </Stack>
                <hr />
                <div className="p-2 fs-2 fw-bold text-dark">
                  Product Options:
                </div>

                <div className="mx-4 my-3">
                  {productDetails &&
                    productDetails.map((product, index) => {
                      return (
                        <Stack
                          direction="horizontal"
                          className="my-3 text-wrap"
                          gap={2}
                        >
                          <Button variant="info" size="sm" disabled>
                            {index + 1}
                          </Button>
                          {Object.keys(product).map((key, index) => {
                            if (
                              ![
                                "createdAt",
                                "updatedAt",
                                "id",
                                "productId",
                              ].includes(key)
                            ) {
                              if (key === "stock" || product[key]) {
                                if (key === "image") {
                                  return (
                                    <img
                                      className="border border-dark shadow-lg mx-2"
                                      width="50px"
                                      height="50px"
                                      alt="Ad"
                                      src={product[key]}
                                    />
                                  );
                                } else {
                                  return (
                                    <>
                                      <Stack
                                        key={index}
                                        direction="horizontal"
                                        gap={1}
                                      >
                                        <div className="p-2 fs-5">{key}: </div>
                                        <div className="p-2 fs-5 text-success">
                                          {product[key]}
                                        </div>
                                      </Stack>
                                    </>
                                  );
                                }
                              }
                            }
                            return false;
                          })}
                        </Stack>
                      );
                    })}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Stack>
      <div>
        <Sidebar />
      </div>
    </>
  );
};

export default SellerProductDetails;
