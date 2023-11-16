import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import jwt_decode from "jwt-decode";
import Sidebar from "./Sidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { useNavigate, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

const SellerProducts = () => {
  const params = useParams();

  const [load, setLoad] = useState(false);

  const [sellerName, setSellerName] = useState();

  const [products, setProducts] = useState([]);

  const [searchValue, setSearchValue] = useState("Search Filter");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);
      if (decoded.user.role === "admin") {
        getProducts();
        getSeller(params.sellerId);
      }
    }
    setLoad(false);

    // eslint-disable-next-line
  }, [load]);

  const getProducts = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/product/getProductsOfUser/${params.sellerId}`,
      requestOptions
    );
    if (response.status === 401) {
      setProducts([]);
    } else if (response.status === 200) {
      const json = await response.json();
      const categoryNamePromises = json.map(async (j) => {
        j["category"] = await getCategoryName(j.categoryId);
        return j;
      });
      await Promise.all(categoryNamePromises);
      setProducts(json);
    }
  };
  const getCategoryName = async (id) => {
    console.log(id);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/category/getCategory/${id}`,
      requestOptions
    );
    const json = await response.json();
    return json.name;
  };

  const handleSearch = (event) => {
    setIsSearch(true);
    const value = event.target.value;
    const searchProduct = products.filter((product) => {
      for (const key in product) {
        if (searchValue === "price" && key === searchValue) {
          return product[key] === value;
        } else if (key === searchValue) {
          return product[key].toLowerCase().includes(value.toLowerCase());
        }
      }
      return false;
    });
    setFilteredProducts(searchProduct);
  };

  const getSeller = async (id) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/users/getUser/${id}`,
      requestOptions
    );
    const json = await response.json();
    setSellerName(json.username);
  };

  return (
    <>
      <Stack style={{ paddingLeft: "80px" }}>
        <div className="mx-3">
          <div className="mx-3 my-5">
            <h1 className="text-center " style={{ color: "#9b32e0" }}>
              <b>{sellerName}'s Products</b>
            </h1>
            <hr style={{ border: "3px solid purple" }} className="mx-auto" />
          </div>

          <div className="d-flex justify-content-center align-items-center my-4">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom03"
            >
              <Form.Label column sm="2" className="mx-3">
                <Stack direction="horizontal" className="text-info mb-1 fs-4">
                  <i className="fa-solid fa-magnifying-glass fa-beat-fade mx-1"></i>
                  <b>Search:</b>
                </Stack>
              </Form.Label>

              <Col sm="6" className="py-2 mx-1">
                <Form.Control
                  disabled={searchValue === "Search Filter"}
                  style={{ width: "350px", border: "1px solid skyBlue" }}
                  type="text"
                  placeholder="Type to search Products."
                  className="text-center shadow-lg"
                  aria-label="Search"
                  onChange={handleSearch}
                />
              </Col>
              <Col sm="2" className="py-2 mx-1">
                <Dropdown className="mr-2 ">
                  <Dropdown.Toggle variant="info" id="dropdown-basic">
                    {searchValue}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("name");
                      }}
                    >
                      Name
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("description");
                      }}
                    >
                      Description
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("category");
                      }}
                    >
                      Category
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("price");
                      }}
                    >
                      Price
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("brand");
                      }}
                    >
                      Brand
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("warranty");
                      }}
                    >
                      Warranty
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("status");
                      }}
                    >
                      Status
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        console.log(
                          document.getElementById("validationCustom03").value
                        );
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("Search Filter");
                      }}
                    >
                      Search Filter
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Form.Group>
          </div>

          <div className="mt-5 mr-5">
            <div className="row my-4 mx-5">
              {isSearch && filteredProducts ? (
                filteredProducts.length ? (
                  filteredProducts.map((product) => {
                    return (
                      <div className="my-4 col-md-6" key={product.id}>
                        <Card
                          border="info"
                          style={{ width: "22rem" }}
                          className="text-center shadow-lg mx-auto"
                        >
                          <Card.Header className="fs-3 fw-bold px-0">
                            <Stack direction="horizontal" gap={3}>
                              <div className="text-end col">
                                {" "}
                                {product.name}
                              </div>

                              <div className="text-center col-4">
                                <Badge
                                  pill
                                  bg={
                                    product.status !== "Active"
                                      ? "danger"
                                      : "success"
                                  }
                                >
                                  {product.status}
                                </Badge>
                              </div>
                            </Stack>
                          </Card.Header>
                          <Card.Img
                            width="32rem"
                            height="260px"
                            variant="top"
                            src={product.image}
                            alt={`${product.name} Image`}
                          />

                          <Card.Body className="text-info">
                            <Card.Title className="fs-5">
                              Description:{" "}
                              <b className="text-dark">{product.description}</b>
                            </Card.Title>
                            <hr />
                            <Card.Text className="fs-5">
                              <Stack direction="horizontal">
                                <div>
                                  Category:{" "}
                                  <b className="text-dark">
                                    {product.category}
                                  </b>
                                </div>

                                <div className="ms-auto">
                                  Price:{" "}
                                  <b className="text-dark">{`${product.price} Rs`}</b>
                                </div>
                              </Stack>
                            </Card.Text>
                            <hr />
                            <Card.Text className="fs-5">
                              <Stack direction="horizontal">
                                <div>
                                  Brand:{" "}
                                  <b className="text-dark">{product.brand}</b>
                                </div>

                                <div className="ms-auto">
                                  Warranty:{" "}
                                  <b className="text-dark">{`${product.warranty}`}</b>
                                </div>
                              </Stack>
                            </Card.Text>
                            <hr />

                            <div className="text-center">
                              <Button
                                variant="info fw-bold shadow-lg mb-2 mx-2"
                                onClick={() => {
                                  navigate(
                                    `/admin/sellers/product/${product.id}`
                                  );
                                }}
                              >
                                Product Details
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center fw-bold fs-3 mb-3 text-danger">
                    No Products to display.
                  </div>
                )
              ) : products.length ? (
                products.map((product) => {
                  return (
                    <div className="my-4 col-md-6" key={product.id}>
                      <Card
                        border="info"
                        style={{ width: "22rem" }}
                        className="text-center shadow-lg mx-auto"
                      >
                        <Card.Header className="fs-3 fw-bold px-0">
                          <Stack direction="horizontal" gap={3}>
                            <div className="text-end col"> {product.name}</div>

                            <div className="text-center col-4">
                              <Badge
                                pill
                                bg={
                                  product.status !== "Active"
                                    ? "danger"
                                    : "success"
                                }
                              >
                                {product.status}
                              </Badge>
                            </div>
                          </Stack>
                        </Card.Header>
                        <Card.Img
                          width="32rem"
                          height="260px"
                          variant="top"
                          src={product.image}
                          alt={`${product.name} Image`}
                        />

                        <Card.Body className="text-info">
                          <Card.Title className="fs-5">
                            Description:{" "}
                            <b className="text-dark">{product.description}</b>
                          </Card.Title>
                          <hr />
                          <Card.Text className="fs-5">
                            <Stack direction="horizontal">
                              <div>
                                Category:{" "}
                                <b className="text-dark">{product.category}</b>
                              </div>

                              <div className="ms-auto">
                                Price:{" "}
                                <b className="text-dark">{`${product.price} Rs`}</b>
                              </div>
                            </Stack>
                          </Card.Text>
                          <hr />
                          <Card.Text className="fs-5">
                            <Stack direction="horizontal">
                              <div>
                                Brand:{" "}
                                <b className="text-dark">{product.brand}</b>
                              </div>

                              <div className="ms-auto">
                                Warranty:{" "}
                                <b className="text-dark">{`${product.warranty}`}</b>
                              </div>
                            </Stack>
                          </Card.Text>
                          <hr />

                          <div className="text-center">
                            <Button
                              variant="info fw-bold shadow-lg mb-2 mx-2"
                              onClick={() => {
                                navigate(
                                  `/admin/sellers/product/${product.id}`
                                );
                              }}
                            >
                              Product Details
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
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
      </Stack>
      <div>
        <Sidebar />
      </div>
    </>
  );
};

export default SellerProducts;
