import React, { useContext, useEffect, useRef, useState } from "react";
import categoryContext from "../context/cart/cartContext";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import jwt_decode from "jwt-decode";
const Products = () => {
  const param = useParams();
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;

  const [isSearch, setIsSearch] = useState(false);

  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // if (localStorage.getItem("token")) {
    //   const authToken = localStorage.getItem("token");
    //   var decoded = jwt_decode(authToken);
    //   decoded.user.role !== "customer" && navigate("/404");
    // }

    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/api/v1/category/getCategory/${param.categoryId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setCategory(result.name))
      .catch((error) => console.log("error", error));
    getProducts();
    // eslint-disable-next-line
  }, []);

  const handleSearch = (event) => {
    setIsSearch(true);
    const value = event.target.value;
    const searchProduct = products.length
      ? products.filter((product) => {
          return product.name.toLowerCase().includes(value.toLowerCase());
        })
      : "";
    setFilteredProducts(searchProduct);
  };

  //  const ref = useRef(null);
  //  const refClose = useRef(null);
  // const [category, setCategory] = useState({
  //   id: "",
  //   name: "",
  //   image: "",
  //   userId: "",
  // });
  const getProducts = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    // console.log(categoryId);
    // console.log(category);
    // await setCategory(categoryId);
    // console.log(category.categoryId);
    const response = await fetch(
      `http://localhost:5000/api/v1/product/getProductsByCategory/${param.categoryId}`,
      requestOptions
    );
    const json = await response.json();
    console.log(json);
    setProducts(json);
  };

  //   console.log(categoryId);
  return (
    <>
      <div className="mt-5 mx-3 my-5">
        <h1
          className="text-center "
          style={{ fontSize: "50px", color: "#9b32e0" }}
        >
          <b>{category}</b>
        </h1>
        <hr
          style={{ width: "220px", border: "3px solid purple" }}
          className="mx-auto"
        />

        <div className="d-flex justify-content-center align-items-center my-5">
          <Form.Group as={Row} className="mb-3" controlId="validationCustom03">
            <Form.Label column sm="3">
              <Stack direction="horizontal" className="text-info mb-1 fs-4 ">
                <i class="fa-solid fa-magnifying-glass fa-beat-fade mx-1"></i>
                <b>Search:</b>
              </Stack>
            </Form.Label>

            <Col sm="8" className="p-2">
              <Form.Control
                style={{ width: "350px", border: "1px solid skyBlue" }}
                type="text"
                placeholder="Type to search product."
                className="mx-3 text-center shadow-lg"
                aria-label="Search"
                onChange={handleSearch}
              />
            </Col>
          </Form.Group>
        </div>

        <div className="container mt-5 mr-5">
          <div className="row my-4">
            {isSearch && filteredProducts ? (
              filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <div className="my-4 col-md-4 " key={product.id}>
                    <Link
                      className="text-decoration-none"
                      to={`/Product/${product.id}`}
                    >
                      <Card
                        style={{ width: "19rem" }}
                        className="text-center shadow-lg mx-auto"
                      >
                        <Card.Img
                          width="19rem"
                          height="260px"
                          variant="top"
                          src={product.image}
                          alt={`${product.name} Image`}
                        />
                        <Card.Body>
                          <Card.Title className="fs-2">
                            {product.name}
                          </Card.Title>
                          <Card.Text
                            className="text-wrap text-primary text-truncate"
                            style={{ "max-width": "550px" }}
                          >
                            ${product.description}
                          </Card.Text>

                          {/* <Button
                            variant="success shadow-lg mb-3"
                            onClick={() => {
                              //   navigate(`/Category/${category.id}`);
                            }}
                          >
                            Product Details
                          </Button> */}
                          <div className="mx-3 text-start">
                            <small className="text-muted ">
                              {product.brand}
                            </small>
                          </div>
                          <div className="text-end">
                            <Badge bg="warning fs-6 mx-2 p-2 shadow-lg">
                              {product.price} Rs
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center fw-bold fs-3 text-danger">
                  No Products to display.
                </div>
              )
            ) : products.length ? (
              products.map((product) => {
                return (
                  <div className="my-4 col-md-4 " key={product.id}>
                    <Link
                      className="text-decoration-none"
                      to={`/Product/${product.id}`}
                    >
                      <Card
                        style={{ width: "19rem" }}
                        className="text-center shadow-lg mx-auto"
                      >
                        <Card.Img
                          width="19rem"
                          height="260px"
                          variant="top"
                          src={product.image}
                          alt={`${product.name} Image`}
                        />
                        <Card.Body>
                          <Card.Title className="fs-2">
                            {product.name}
                          </Card.Title>
                          <Card.Text
                            className="text-wrap text-primary text-truncate"
                            style={{ "max-width": "550px" }}
                          >
                            ${product.description}
                          </Card.Text>

                          {/* <Button
                            variant="success shadow-lg mb-3"
                            onClick={() => {
                              //   navigate(`/Category/${category.id}`);
                            }}
                          >
                            Product Details
                          </Button> */}
                          <div className="mx-3 text-start">
                            <small className="text-muted ">
                              {product.brand}
                            </small>
                          </div>
                          <div className="text-end">
                            <Badge bg="warning fs-6 mx-2 p-2 shadow-lg">
                              {product.price} Rs
                            </Badge>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="text-center fw-bold fs-3 text-danger">
                No Products to display.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
