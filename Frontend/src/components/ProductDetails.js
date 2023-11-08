import React, { useContext, useEffect, useRef, useState } from "react";
// import Image1 from "./CarouselImages/Image1.jpg";
import { Carousel } from "react-responsive-carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import cartContext from "../context/cart/cartContext";
import Login from "./Login";
// import { renderItem } from CarouselProps;
const ProductDetails = (props) => {
  const param = useParams();
  const context = useContext(cartContext);
  const { orders, setOrders } = context;
  const [product, setProduct] = useState("");
  const [productDetails, setProductDetails] = useState(null);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  let q = 0;

  const [productDetailId, setProductDetailId] = useState(0);
  //   console.log(param);
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    setModal(false);
  };

  useEffect(() => {
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
    getProductDetails();

    // eslint-disable-next-line
  }, []);

  const getProductDetails = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/getProductDetailsByProduct/${param.productId}`,
      requestOptions
    );
    // console.group();
    // console.log("Products Details Response => ", response);
    const json = await response.json();
    // console.log(json);
    const available = json.filter((productDetail) => {
      return productDetail.stock > 0;
    });
    setProductDetails(available);

    // console.log("product details====>", productDetails);
    // console.groupEnd();
    const imageArr = [];
    available.forEach(async (productDetail) => {
      // console.log(productDetail);
      productDetail.image.forEach(async (i) => {
        if (!imageArr.includes(i)) {
          imageArr.push(i);
        }
      });
    });
    // console.log(imageArr);
    setImages(imageArr);
    // console.log(images);
    // console.log(productDetails);
  };
  const handleButton = (event) => {
    // setProductDetailId(event.target.id);

    // console.log(event);
    // console.log(event.target.id);
    // console.log(event.target.checked);
    // console.log(productDetails);
    // console.log(productDetails[0].id);
    if (event.target.checked) {
      setProductDetailId(event.target.id);
      for (let i = 0; i < productDetails.length; i++) {
        let element = document.getElementById(productDetails[i].id);
        console.log(element);
        element.checked = false;
      }
      event.target.checked = "true";
    } else if (productDetailId === event.target.id) {
      setProductDetailId(0);
    }
    // console.log(productDetailId);
    // event.target.checked = "true";
  };
  const handleAddToCart = () => {
    q = quantity;
    if (!localStorage.getItem("token")) {
      setShow(true);
    } else if (localStorage.getItem("token")) {
      let addProduct = false;
      const product = orders;
      product.forEach((element) => {
        if (element.productDetailId === productDetailId) {
          element.quantity = element.quantity + quantity;
          addProduct = true;
        }
      });
      if (!addProduct) {
        product.push({ productDetailId, quantity });
      }

      // console.log(q);

      setOrders(product);

      for (let i = 0; i < productDetails.length; i++) {
        let element = document.getElementById(productDetails[i].id);
        console.log(element);
        element.checked = false;
      }
      setQuantity(0);
      setModal(true);

      // setTimeout(() => {

      // }, 1000);
    }

    // var decoded = await jwt_decode(json.authToken);
    // console.log(decoded);
    // await setUser(decoded.user);
    // console.log(user);
  };

  return (
    <div>
      <div className="mt-5 mx-3 my-5">
        <h1
          className="text-center "
          style={{ fontSize: "50px", color: "#9b32e0" }}
        >
          <b>{product.name}</b>
        </h1>
        <hr
          style={{ width: "220px", border: "3px solid purple" }}
          className="mx-auto"
        />
      </div>
      <Container>
        <Row>
          <Col className="gx-5 col-5">
            <Carousel className="border border-info shadow-lg mb-5">
              {images.length ? (
                images.map((image) => {
                  return (
                    <div key={image}>
                      <img
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
                <div>No Images to show.</div>
              )}

              {/* <div>
                <img
                  width="50%"
                  height="70%"
                  // className="d-inline-block align-top mx-4"
                  alt="Ad"
                  src="https://st2.depositphotos.com/1105977/5461/i/950/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg"
                />
                <p className="legend">Books 2</p>
              </div>
              <div>
                <img
                  width="50%"
                  height="70%"
                  // className="d-inline-block align-top mx-4"
                  alt="Ad"
                  src="https://thumbs.dreamstime.com/z/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg?w=992"
                />
                <p className="legend">Books 3</p>
              </div> */}
            </Carousel>
          </Col>

          <Col className="mx-3">
            <h2>{product.description}</h2>
            <Stack direction="horizontal" gap={1}>
              <div className="p-2 fs-5 text-muted">Brand:</div>
              <div className="p-2 text-info">{product.brand}</div>
            </Stack>
            <hr />
            <h2 className="text-danger">Rs. {product.price}</h2>
            <hr />
            {/* <Stack direction="horizontal" gap={1}>
              <div className="p-2 fs-4 text-muted">Color:</div>
              <div className="p-2 text-dark"> */}
            {/* <Stack> */}
            {/* {console.group()} */}
            <div className="p-2 fs-5 text-dark">Please Select the Options:</div>

            <div className="mx-4 my-3">
              {productDetails &&
                productDetails.map((product) => {
                  // console.log("product=========", product);
                  return (
                    <Stack direction="horizontal" className="my-3" gap={1}>
                      <input
                        // checked={productDetailId === product.id}
                        type="checkbox"
                        class="form-check-input mx-3"
                        id={product.id}
                        onClick={handleButton}
                        // console.log("id------", productDetailId);}
                        // onClick={}
                      />
                      {Object.keys(product).map((key) => {
                        if (
                          ![
                            "createdAt",
                            "updatedAt",
                            "id",
                            "productId",
                            "stock",
                          ].includes(key)
                        ) {
                          // console.log(`/////////${key}: ${product[key]}`);
                          if (product[key]) {
                            // console.log(`${key}: ${product[key]}`);
                            if (key === "image") {
                              return (
                                <img
                                  className="border border-dark shadow-lg"
                                  width="50px"
                                  height="50px"
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
                                    <div className="p-2 fs-5 text-muted">
                                      {key}:{" "}
                                    </div>
                                    <div className="p-2 fs-5 text-dark">
                                      {product[key]}
                                    </div>
                                  </Stack>
                                </>
                              );
                            }
                          }
                        }
                      })}
                    </Stack>
                  );
                })}
            </div>
            <div className="m-5 text-center fs-3">
              Quantity:
              <Button
                disabled={!quantity}
                variant="secondary shadow-lg fw-bold p-1  px-2 mx-3"
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                &#8722;
              </Button>
              {quantity}
              <Button
                variant="secondary shadow-lg fw-bold p-1  px-2 mx-3"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                &#43;
              </Button>
            </div>
            {/* {console.groupEnd()} */}
            {/* </Stack> */}
            {/* </div> */}
            {/* </Stack> */}
            <div className="text-center mb-4">
              <Button
                disabled={!(quantity && productDetailId)}
                variant="outline-success shadow-lg fs-4 fw-bold p-2 px-3"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="fw-bold text-center fs-1"
          >
            Add to Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-danger fs-4">
            Please login first for adding this product to cart.
          </div>

          <Login />
          <Button
            variant="danger shadow-lg fs-4 fw-bold px-4"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Body>

        <Modal.Footer>
          {/* <Button
            variant="info shadow-lg fw-bold"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button> */}
        </Modal.Footer>
      </Modal>

      <Modal
        show={modal}
        onHide={handleClose}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="fw-bold text-center fs-3"
          >
            Successfully Added to Cart
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="text-success fs-4">
            1 new item(s) have been added to your cart.
          </div>
          <Button
            variant="outline-secondary shadow-lg fs-5 fw-bold px-2 my-4"
            onClick={() => {
              setModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="outline-success shadow-lg fs-5 fw-bold px-2 my-4 mx-2"
            onClick={() => {
              navigate("/cart");
            }}
          >
            Go to Cart
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductDetails;
