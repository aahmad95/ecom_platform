import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../admin/Sidebar";
import jwt_decode from "jwt-decode";

const ProductDetailsOfSeller = (props) => {
  const param = useParams();
  // console.log([param]);

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
      if (decoded.user.role === "seller") {
        // setUserId(decoded.user.id);
        getProduct();
        getProductDetails();
        // getSeller(params.sellerId);
      } else navigate("/404");
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
    // console.log(product);
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
    if (response.status === 200) {
      const json = await response.json();
      // console.log(json);

      const imageArr = [];
      const soldProductCount = json.map(async (productDetail) => {
        // console.log(productDetail);
        productDetail["SoldProducts"] = await getSoldProductCount(
          productDetail.id
        );
        productDetail.image.forEach(async (i) => {
          if (!imageArr.includes(i)) {
            imageArr.push(i);
          }
        });
        return productDetail;
      });
      await Promise.all(soldProductCount);
      setImages(imageArr);
      setProductDetails(json);
    }
    // if (response.status === 204) {
    //   setImages
    // }
  };
  const getSoldProductCount = async (productDetailId) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/orderItem/getOrderItemOfProductDetail/${productDetailId}`,
      requestOptions
    );

    if (response.status === 204) {
      return 0;
    } else if (response.status === 200) {
      const json = await response.json();
      return json.length;
    }
  };

  return (
    <>
      {/* <Stack direction="horizontal"> */}

      <Stack style={{ paddingLeft: "80px" }}>
        <div className="mx-3 mb-5">
          <div className="mx-3 my-5">
            <h1 className="text-center " style={{ color: "#9b32e0" }}>
              <b>{product.name}</b>
            </h1>
            <hr style={{ border: "3px solid purple" }} className="mx-auto" />
          </div>

          <Container>
            <Row>
              <Col className="gx-3 mx-3">
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

                <div className="mx-4 mt-3">
                  {productDetails?.length ? (
                    productDetails.map((product, index) => {
                      return (
                        <Stack
                          direction="horizontal"
                          className="my-5 text-wrap"
                          gap={2}
                        >
                          <Button
                            variant="info"
                            size="sm"
                            // className="shadow-lg"
                            disabled
                          >
                            {index + 1}
                          </Button>

                          {Object.keys(product).map((key) => {
                            if (
                              ![
                                "createdAt",
                                "updatedAt",
                                "id",
                                "productId",
                              ].includes(key)
                            ) {
                              // console.log(`/////////${key}: ${product[key]}`);
                              if (product[key]) {
                                // console.log(`${key}: ${product[key]}`);
                                if (key === "image") {
                                  return (
                                    <img
                                      className="border border-dark shadow-lg mx-2"
                                      width="60px"
                                      height="60px"
                                      // className="d-inline-block align-top mx-4"
                                      alt="Ad"
                                      src={product[key]}
                                    />
                                  );
                                } else {
                                  return (
                                    // <img src={product[key]}></img>
                                    <>
                                      <Stack direction="horizontal" gap={1}>
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
                          })}
                          <Button
                            variant="info fw-bold shadow-lg mb-2 mx-2"
                            // onClick={() => {
                            //   // navigate(`/seller/product/${product.id}`);
                            //   setEditId(product.id);
                            //   setEditName(product.name);
                            //   setEditBrand(product.brand);
                            //   setEditCategoryId(product.categoryId);
                            //   setEditDescription(product.description);
                            //   setEditImage(product.image);
                            //   setEditPrice(product.price);
                            //   setEditStatus(product.status);
                            //   setEditWarranty(product.warranty);
                            //   setEdit(true);
                            // }}
                          >
                            <i class="fa-solid fa-pen-to-square fa-beat-fade"></i>
                          </Button>
                          <Button
                            variant="info fw-bold shadow-lg mb-2 mx-2"
                            // onClick={() => {
                            //   setProductId(product.id);
                            //   setCancel(true);
                            // }}
                          >
                            <i class="fa-solid fa-trash-can fa-beat-fade"></i>
                          </Button>
                        </Stack>
                      );
                    })
                  ) : (
                    <div className="text-center fs-3 text-danger">
                      You haven't added any ProductDetails of this product yet.
                    </div>
                  )}
                  {/* <Stack direction="horizontal" gap={1}>
                    <div className="p-2 fs-5">Sold : </div>
                    <div className="p-2 fs-5 text-success">{0}</div>
                  </Stack> */}
                </div>
                <div className="text-center my-5">
                  <Button
                    // disabled={!(quantity && productDetailId)}
                    variant="outline-success shadow-lg fs-4 fw-bold p-2 px-3"
                    // onClick={handleAddToCart}
                  >
                    Add Product Details
                  </Button>
                </div>
              </Col>
            </Row>
            {/* <Row>
              <Col className="gx-3 col-4">
                <Carousel className="border border-info shadow-lg mb-5">
                  {images?.length ? (
                    images.map((image) => {
                      return (
                        <div key={image}>
                          <img
                            className="shadow-lg"
                            width="50%"
                            height="70%"
                            // className="d-inline-block align-top mx-4"
                            alt="Product Image"
                            src={image}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center fw-bold fs-3 text-danger mt-5">
                      No Images to show.
                    </div>
                  )}
                </Carousel>
              </Col>
            </Row> */}
          </Container>
        </div>
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

export default ProductDetailsOfSeller;
