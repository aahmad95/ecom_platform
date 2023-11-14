import React, { useEffect, useState } from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import categoryContext from "../../context/cart/cartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Buffer } from "buffer";
import Sidebar from "../admin/Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { Link, useNavigate, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";

// import closeButton from "react-bootstrap/ModalHeader";

const ProductsOfSeller = () => {
  // const params = useParams();

  const [load, setLoad] = useState(false);

  // const [priority, setPriority] = useState(false);
  const [sellerName, setSellerName] = useState();
  const [seller, setSeller] = useState();

  // const [edit, setEdit] = useState(false);
  // const [idEdit, setIdEdit] = useState("");
  // const [nameEdit, setNameEdit] = useState("");
  // const [imageEdit, setImageEdit] = useState("");
  // const [priorityEdit, setPriorityEdit] = useState();

  // const [doneEdit, setDoneEdit] = useState(false);

  const [products, setProducts] = useState([]);

  // Add Product

  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [warranty, setWarranty] = useState("");
  const [status, setStatus] = useState("");

  const [modal, setModal] = useState(false);

  // Delete Product:
  const [cancel, setCancel] = useState(false);
  const [del, setDel] = useState(false);
  const [productId, setProductId] = useState();

  // Edit Product:
  const [edit, setEdit] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editBrand, setEditBrand] = useState("");
  const [editCategoryId, setEditCategoryId] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editWarranty, setEditWarranty] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [doneEdit, setDoneEdit] = useState(false);

  // Search:
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

      setSeller(decoded.user);
      setSellerName(decoded.user.username);
      // getSeller();

      if (decoded.user.role === "seller") {
        // setUserId(decoded.user.id);
        getProducts(decoded.user.id);
        getCategories();
        // getSeller(seller.id);
      } else navigate("/404");
    }
    setLoad(false);

    // eslint-disable-next-line
  }, [load]);
  // useEffect(()=>{
  //   console.log('Ads', ads);
  // }, [ads])

  const getProducts = async (sellerId) => {
    // console.log("get Products");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/product/getProductsOfUser/${sellerId}`,
      requestOptions
    );
    // console.log(response);
    if (response.status === 401) {
      setProducts([]);
    } else if (response.status === 200) {
      const json = await response.json();
      const categoryNamePromises = json.map(async (j) => {
        j["category"] = await getCategoryName(j.categoryId);
        j["soldProductCount"] = await getSoldProductCount(j.id);
        return j;
      });
      await Promise.all(categoryNamePromises);
      setProducts(json);
      console.log("json response", json);
      // setAds(json);
      console.log("products:    ", products);
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

  const getSoldProductCount = async (productId) => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/orderItem/getOrderItemsByProductId/${productId}`,
      requestOptions
    );
    if (response.status === 204) {
      return 0;
    } else if (response.status === 200) {
      const json = await response.json();
      return json.length;
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      userId: seller.id,
      categoryId: categoryId,
      brand: brand,
      description: description,
      image: image,
      price: price,
      warranty: warranty,
      status: status,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/product/createProduct",
      requestOptions
    );
    // console.log("response-------", response);
    if (response.status === 200) {
      setModal(true);
      setLoad(true);
    }
    const json = await response.json();
    // console.log("json------", json);
  };

  const handleSearch = (event) => {
    setIsSearch(true);
    //  const value = `${document.getElementById("validationCustom03").value}`;
    const value = event.target.value;
    console.log(value);
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
    console.log(filteredProducts);
  };

  const getCategories = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    // const category = [];
    const response = await fetch(
      "http://localhost:5000/api/v1/category/getAllCategory",
      requestOptions
    );
    // console.log(response);
    if (response.status === 200) {
      const json = await response.json();
      // json.map((category) => {
      //   const cat = { category.id: `${category.name}` }
      //   category.push(cat);
      // })
      setCategories(json);
      // console.log("categories", json);
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: editName,
      // userId: seller.id,
      categoryId: editCategoryId,
      brand: editBrand,
      description: editDescription,
      image: editImage,
      price: editPrice,
      warranty: editWarranty,
      status: editStatus,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/product/updateProduct/${editId}`,
      requestOptions
    );
    if (response.status === 200) {
      setDoneEdit(true);
      setLoad(true);
    }
  };

  const handleDelete = async (productId) => {
    console.log(productId);
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/deleteProductDetailsOfProduct/${productId}`,
      requestOptions
    );
    if (response !== 500) {
      const response1 = await fetch(
        `http://localhost:5000/api/v1/product/deleteProduct/${productId}`,
        requestOptions
      );
      if (response1 !== 500) {
        setDel(true);
        setLoad(true);
      }
    }
  };
  return (
    <>
      {/* <Stack direction="horizontal"> */}

      <Stack style={{ paddingLeft: "80px" }}>
        <div className="mx-3">
          <div className="mx-3 my-5">
            <h1 className="text-center " style={{ color: "#9b32e0" }}>
              <b>{sellerName}'s Products</b>
            </h1>
            <hr style={{ border: "3px solid purple" }} className="mx-auto" />
          </div>

          <div className="container text-center">
            <Button
              variant="outline-dark py-2 px-3 my-5 fw-bold shadow-lg fs-5"
              onClick={() => {
                setShow(true);
              }}
            >
              Add New Product
            </Button>
          </div>

          <div className="d-flex justify-content-center align-items-center my-4">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="validationCustom03"
            >
              <Form.Label column sm="2" className="mx-3">
                <Stack direction="horizontal" className="text-info mb-1 fs-4">
                  <i class="fa-solid fa-magnifying-glass fa-beat-fade mx-1"></i>
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
                  // onClick={handleSearch}
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
                        {/* <Link
                        className="text-decoration-none"
                        to={`/Product/${product.id}`}
                      > */}
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
                            <Card.Text className="fs-5">
                              {/* <Stack direction="horizontal"> */}
                              {/* <div>
                                  Brand:{" "}
                                  <b className="text-dark">{product.brand}</b>
                                </div> */}

                              <div className="mx-auto">
                                No of Products Sold:{" "}
                                <b className="text-dark">{`${product.soldProductCount}`}</b>
                              </div>
                              {/* </Stack> */}
                            </Card.Text>
                            <hr />
                            {/* <Stack direction="horizontal" className=" px-5 text-primary"> */}

                            <div className="text-center">
                              {/* Edit */}

                              <Button
                                variant="info fw-bold shadow-lg mb-2 mx-2"
                                onClick={() => {
                                  // navigate(`/seller/product/${product.id}`);
                                  setEditId(product.id);
                                  setEditName(product.name);
                                  setEditBrand(product.brand);
                                  setEditCategoryId(product.categoryId);
                                  setEditDescription(product.description);
                                  setEditImage(product.image);
                                  setEditPrice(product.price);
                                  setEditStatus(product.status);
                                  setEditWarranty(product.warranty);
                                  setEdit(true);
                                }}
                              >
                                <i class="fa-solid fa-pen-to-square fa-beat-fade"></i>
                              </Button>
                              <Button
                                variant="info fw-bold shadow-lg mb-2 mx-2"
                                onClick={() => {
                                  navigate(`/seller/product/${product.id}`);
                                  // setAdId(ad.id);
                                  // setCancel(true);
                                }}
                              >
                                Product Details
                              </Button>
                              {/* Delete */}
                              <Button
                                variant="info fw-bold shadow-lg mb-2 mx-2"
                                onClick={() => {
                                  setProductId(product.id);
                                  setCancel(true);
                                }}
                              >
                                <i class="fa-solid fa-trash-can fa-beat-fade"></i>
                              </Button>
                            </div>
                            {/* </Stack> */}
                          </Card.Body>
                        </Card>
                        {/* </Link> */}
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
                      {/* <Link
                        className="text-decoration-none"
                        to={`/Product/${product.id}`}
                      > */}
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
                          <Card.Text className="fs-5">
                            {/* <Stack direction="horizontal"> */}
                            {/* <div>
                                  Brand:{" "}
                                  <b className="text-dark">{product.brand}</b>
                                </div> */}

                            <div className="mx-auto">
                              No of Products Sold:{" "}
                              <b className="text-dark">{`${product.soldProductCount}`}</b>
                            </div>
                            {/* </Stack> */}
                          </Card.Text>
                          <hr />
                          {/* <Stack direction="horizontal" className=" px-5 text-primary"> */}

                          <div className="text-center">
                            {/* Edit */}

                            <Button
                              variant="info fw-bold shadow-lg mb-2 mx-2"
                              onClick={() => {
                                // navigate(`/seller/product/${product.id}`);
                                setEditId(product.id);
                                setEditName(product.name);
                                setEditBrand(product.brand);
                                setEditCategoryId(product.categoryId);
                                setEditDescription(product.description);
                                setEditImage(product.image);
                                setEditPrice(product.price);
                                setEditStatus(product.status);
                                setEditWarranty(product.warranty);
                                setEdit(true);
                              }}
                            >
                              <i class="fa-solid fa-pen-to-square fa-beat-fade"></i>
                            </Button>
                            <Button
                              variant="info fw-bold shadow-lg mb-2 mx-2"
                              onClick={() => {
                                navigate(`/seller/product/${product.id}`);
                                // setAdId(ad.id);
                                // setCancel(true);
                              }}
                            >
                              Product Details
                            </Button>
                            {/* Delete */}
                            <Button
                              variant="info fw-bold shadow-lg mb-2 mx-2"
                              onClick={() => {
                                setProductId(product.id);
                                setCancel(true);
                              }}
                            >
                              <i class="fa-solid fa-trash-can fa-beat-fade"></i>
                            </Button>
                          </div>
                          {/* </Stack> */}
                        </Card.Body>
                      </Card>
                      {/* </Link> */}
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
      <div
      //  style={{width: "55px"}}
      >
        <Sidebar />
      </div>
      {/* </Stack> */}

      <div>
        {/* Add new Product */}
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={handleAdd}>
            <Modal.Header className="mx-2" closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="fs-1">
                Add new Product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-2">
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Name:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  // value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Category:</Form.Label>

                <div key={`inline-radio`} className="mb-3">
                  {categories.map((category) => {
                    return (
                      <Form.Check
                        required
                        inline
                        label={category.name}
                        name="category"
                        type="radio"
                        id={category.id}
                        onClick={(e) => {
                          console.log(e);
                          if (e.target.checked) {
                            // console.log(e.target.id);
                            setCategoryId(e.target.id);
                            // console.log("category", categoryId);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Description:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  // value={name}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>

              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="fs-4">Product Image:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  type="file"
                  size="md"
                  required
                  onChange={(event) => {
                    //   setImage(e.target.files[0]);

                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        const imageDataURL = e.target.result;

                        // console.log("Base 64 -> ", base64);
                        // You can use imageDataURL as a base64-encoded image string.
                        // console.log(imageDataURL);
                        setImage(imageDataURL);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Brand:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  // value={name}
                  onChange={(e) => setBrand(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Warranty:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  // value={name}
                  onChange={(e) => setWarranty(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Price:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  // value={name}
                  onChange={(e) =>
                    e.target.value > 0
                      ? setPrice(e.target.value)
                      : (e.target.value = "")
                  }
                  type="number"
                  min="0"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label className="fs-4">Product Status:</Form.Label>
                <Form.Check // prettier-ignore
                  className="mx-3 fs-5"
                  type="switch"
                  id="custom-switch"
                  // defaultChecked={priority}
                  label="Active"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStatus("Active");
                    } else {
                      setStatus("Not Active");
                    }
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="mx-3">
              <Button
                variant="secondary shadow-lg fw-bold p-2 px-4"
                onClick={() => {
                  setShow(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="success shadow-lg fw-bold p-2"
                // onClick={handleAdd}
                type="submit"
              >
                Add new Product
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        {/* Successfully Added the Product */}
        <Modal
          show={modal}
          onHide={() => {
            setModal(false);
            setShow(false);
          }}
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
              Successfully Added the Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              <i class="fa-solid fa-circle-check fa-bounce"></i> 1 new Product
              has been added successfully.
            </div>
            <Button
              variant="outline-danger shadow-lg fs-5 fw-bold px-2 my-4"
              onClick={() => {
                setModal(false);
                setShow(false);
              }}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>

        {/* Handle Delete  */}
        <Modal
          show={cancel}
          onHide={() => {
            setCancel(false);
          }}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="text-center"
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter "
              className="fw-bold text-center fs-2"
            >
              Delete Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="fs-2 text-danger">
            All the product details related to this product will be deleted. Are
            you sure?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="info shadow-lg fw-bold px-4"
              onClick={() => {
                // if(orderId)
                handleDelete(productId);
                setCancel(false);
              }}
            >
              Yes
            </Button>
            <Button
              variant="danger shadow-lg fw-bold px-4"
              onClick={() => {
                setCancel(false);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Successfully deleted the Product. */}
        <Modal
          show={del}
          onHide={() => {
            setDel(false);
          }}
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
              Successfully Deleted the Product and
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              <i class="fa-solid fa-circle-check fa-bounce"></i> 1 Product and
              its ProductDetails has been deleted successfully.
            </div>
            <Button
              variant="outline-danger shadow-lg fs-5 fw-bold px-2 my-4"
              onClick={() => {
                setDel(false);
              }}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>

        {/* Edit Product */}
        <Modal
          show={edit}
          onHide={() => {
            setEdit(false);
          }}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={handleEdit}>
            <Modal.Header className="mx-2" closeButton>
              <Modal.Title id="contained-modal-title-vcenter" className="fs-1">
                Edit Product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-2">
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Name:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  type="text"
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Category:</Form.Label>

                <div key={`inline-radio`} className="mb-3">
                  {categories.map((category) => {
                    return (
                      <Form.Check
                        required
                        inline
                        label={category.name}
                        name="category"
                        type="radio"
                        id={category.id}
                        defaultChecked={category.id === editCategoryId}
                        onClick={(e) => {
                          console.log(e);
                          if (e.target.checked) {
                            // console.log(e.target.id);
                            setEditCategoryId(e.target.id);
                            // console.log("category", categoryId);
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Description:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>

              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="fs-4">Product Image:</Form.Label>
                <div className="text-center">
                  <Image
                    className="shadow-lg mb-2"
                    height="160px"
                    width="320px"
                    alt={`${editName} Image`}
                    src={editImage}
                    rounded
                  />
                </div>
                <Form.Control
                  className="shadow-lg"
                  type="file"
                  size="md"
                  onChange={(event) => {
                    //   setImage(e.target.files[0]);

                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        const imageDataURL = e.target.result;

                        // console.log("Base 64 -> ", base64);
                        // You can use imageDataURL as a base64-encoded image string.
                        // console.log(imageDataURL);
                        setEditImage(imageDataURL);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Brand:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editBrand}
                  onChange={(e) => setEditBrand(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Warranty:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editWarranty}
                  onChange={(e) => setEditWarranty(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-4">Product Price:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={editPrice}
                  onChange={(e) =>
                    e.target.value > 0
                      ? setEditPrice(e.target.value)
                      : (e.target.value = "")
                  }
                  type="number"
                  min="0"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label className="fs-4">Product Status:</Form.Label>
                <Form.Check // prettier-ignore
                  checked={editStatus === "Active"}
                  className="mx-3 fs-5"
                  type="switch"
                  id="custom-switch"
                  // defaultChecked={priority}
                  label="Active"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setEditStatus("Active");
                    } else {
                      setEditStatus("Not Active");
                    }
                  }}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer className="mx-3">
              <Button
                variant="secondary shadow-lg fw-bold p-2 px-4"
                onClick={() => {
                  setEdit(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="success shadow-lg fw-bold p-2"
                // onClick={handleAdd}
                type="submit"
              >
                Edit Product
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Successfully edited the Product. */}
        <Modal
          show={doneEdit}
          onHide={() => {
            setDoneEdit(false);
          }}
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
              Successfully Edited the Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              <i class="fa-solid fa-circle-check fa-bounce"></i> 1 Product has
              been updated successfully.
            </div>
            <Button
              variant="outline-danger shadow-lg fs-5 fw-bold px-2 my-4"
              onClick={() => {
                setDoneEdit(false);
                setEdit(false);
              }}
            >
              Close
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ProductsOfSeller;
