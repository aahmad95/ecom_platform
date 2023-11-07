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
import Sidebar from "./Sidebar";
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

const SellerProducts = () => {
  const params = useParams();
  const [load, setLoad] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [priority, setPriority] = useState(false);
  const [sellerName, setSellerName] = useState();

  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [priorityEdit, setPriorityEdit] = useState();

  const [doneEdit, setDoneEdit] = useState(false);

  const [products, setProducts] = useState([]);

  const [show, setShow] = useState(false);

  const [modal, setModal] = useState(false);

  const [cancel, setCancel] = useState(false);
  const [del, setDel] = useState(false);

  const [adId, setAdId] = useState();

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
        // setUserId(decoded.user.id);
        getProducts();
        getSeller(params.sellerId);
      } else navigate("/404");
    }
    setLoad(false);

    // eslint-disable-next-line
  }, [load]);
  // useEffect(()=>{
  //   console.log('Ads', ads);
  // }, [ads])

  const getProducts = async () => {
    // console.log("get Products");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/product/getProductsOfUser/${params.sellerId}`,
      requestOptions
    );
    // console.log(response);
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

  const handleSearch = (event) => {
    setIsSearch(true);
    //  const value = `${document.getElementById("validationCustom03").value}`;
    const value = event.target.value;
    console.log(value);
    const searchProduct = products.filter((ad) => {
      if (searchValue === "Name") {
        return ad.name.toLowerCase().includes(value.toLowerCase());
      }
      if (searchValue === "User") {
        return ad.user.toLowerCase().includes(value.toLowerCase());
      }
      if (searchValue === "Priority") {
        const str = ad.priority.toString();
        // console.log(str);
        return str.toLowerCase().includes(value.toLowerCase());
      } else return false;
    });
    setFilteredProducts(searchProduct);
    console.log(filteredProducts);
  };

  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleAdd = async (e) => {
    e.preventDefault();

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //   name: name,
    //   image: image,
    //   priority: priority,
    //   userId: userId,
    // });

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: "follow",
    // };

    // const response = await fetch(
    //   "http://localhost:5000/api/v1/get/createAds",
    //   requestOptions
    // );
    // if (response.status === 201) {
    //   setModal(true);
    //   setLoad(true);
    // }
  };

  const getSeller = async (id) => {
    // console.log(id);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/users/getUser/${id}`,
      requestOptions
    );
    const json = await response.json();
    // console.log("jsonnnnnnnn", json);
    setSellerName(json.username);
    // console.log(sellerName);
  };

  const handleDelete = async (adId) => {
    // e.preventDefault();

    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/get/deleteAds/${adId}`,
      requestOptions
    );
    console.log(response);
    if (response.status === 204) {
      setDel(true);
      setLoad(true);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: nameEdit,
      image: imageEdit,
      priority: priorityEdit,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/get/updateAds/${idEdit}`,
      requestOptions
    );

    if (response.status === 204) {
      console.log("hello");
      setDoneEdit(true);
      setLoad(true);
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

          {/* <div className="container text-center">
            <Button
              variant="outline-dark py-2 px-3 my-5 fw-bold shadow-lg fs-5"
              onClick={() => {
                setShow(true);
              }}
            >
              Add New Ad
            </Button>
          </div> */}

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
                        setSearchValue("Name");
                      }}
                    >
                      Name
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("User");
                      }}
                    >
                      User
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        document.getElementById("validationCustom03").value =
                          null;
                        setIsSearch(false);
                        setSearchValue("Priority");
                      }}
                    >
                      Priority
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
                  filteredProducts.map((ad) => {
                    //  userName=getUserName(ad.userId)
                    // console.log("ads", ads);
                    console.log("Username", ad, ad.user);
                    return (
                      <div className="my-4 col-md-6 " key={ad.id}>
                        {/* <Link
                        className="text-decoration-none"
                        to={`/Product/${product.id}`}
                      > */}
                        <Card
                          border="info"
                          style={{ width: "30rem" }}
                          className="text-center shadow-lg mx-auto"
                        >
                          <Card.Header className="fs-3 fw-bold">
                            {ad.name}
                          </Card.Header>
                          <Card.Img
                            width="32rem"
                            height="260px"
                            variant="top"
                            src={ad.image}
                            alt={`${ad.name} Image`}
                          />

                          <Card.Body>
                            {/* <Card.Title className="fs-3">
                              {ad.name}
                            </Card.Title> */}

                            <Card.Text className="fs-4">
                              <Stack direction="horizontal" className="mx-3">
                                <div>
                                  {console.log(ad.user)}
                                  Username: <b>{ad.user}</b>
                                </div>

                                <div className="ms-auto">
                                  Priority: <b>{`${ad.priority}`}</b>
                                </div>
                              </Stack>
                            </Card.Text>

                            {/* <Stack direction="horizontal" className=" px-5 text-primary"> */}

                            <div className="text-center">
                              <Button
                                variant="info shadow-lg mb-3 mx-2 px-4"
                                onClick={() => {
                                  //   navigate(`/Category/${category.id}`);
                                }}
                              >
                                Edit Ad
                              </Button>
                              {/* </div>
                            
                                <div className="ms-auto"> */}
                              <Button
                                variant="danger shadow-lg mb-3 mx-2"
                                onClick={() => {
                                  //   navigate(`/Category/${category.id}`);
                                  setAdId(ad.id);
                                  setCancel(true);
                                }}
                              >
                                Delete Ad
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
                  //  userName=getUserName(ad.userId)
                  //   console.log("ads", ads);
                  //   console.log("Username", ad, ad.user);
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
                                  product.status != "Active"
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
                                <b className="text-dark">{`${product.price}`}</b>
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

                          {/* <Stack direction="horizontal" className=" px-5 text-primary"> */}

                          <div className="text-center">
                            {/* <Button
                              variant="info shadow-lg mb-3 mx-2 px-4"
                              onClick={() => {
                                // setIdEdit(ad.id);
                                // setImageEdit(ad.image);
                                // setPriorityEdit(ad.priority);
                                // setNameEdit(ad.name);
                                // setEdit(true);
                              }}
                            >
                              Edit Ad
                            </Button> */}
                            {/* </div>
                            
                                <div className="ms-auto"> */}
                            <Button
                              variant="info fw-bold shadow-lg mb-2 mx-2"
                              onClick={() => {
                                //   navigate(`/Category/${category.id}`);
                                // setAdId(ad.id);
                                // setCancel(true);
                              }}
                            >
                              Product Details
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
                <Modal.Title
                  id="contained-modal-title-vcenter"
                  className="fs-1"
                >
                  Add new Ad
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="mx-2">
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label className="fs-3">Ad Name:</Form.Label>
                  <Form.Control
                    // value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    required
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="priority">
                  <Form.Label className="fs-3">Set Priority:</Form.Label>
                  <Form.Check // prettier-ignore
                    className="mx-3 fs-3"
                    type="switch"
                    id="custom-switch"
                    // defaultChecked={priority}

                    onChange={(e) => {
                      setPriority(e.target.checked);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="fileName" className="mb-3">
                  <Form.Label className="fs-3">Ad Image:</Form.Label>
                  <Form.Control
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
                  Add new Ad
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
        {/* Successfully Added new AD */}
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
              Successfully Created Ad
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              1 new Ad has been created in database.
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
              Delete Ad
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="fs-2 text-danger">Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="info shadow-lg fw-bold px-4"
              onClick={() => {
                // if(orderId)
                handleDelete(adId);
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

        {/* Successfully deleted the AD. */}
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
              Successfully Deleted the Ad
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              1 Ad has been deleted from database.
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

        {/* Edit AD */}
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
                Edit the Ad
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mx-2">
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fs-3">Ad Name:</Form.Label>
                <Form.Control
                  className="shadow-lg"
                  value={nameEdit}
                  onChange={(e) => setNameEdit(e.target.value)}
                  type="text"
                  required
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label className="fs-3">Set Priority:</Form.Label>
                <Form.Check // prettier-ignore
                  className="mx-3 fs-3"
                  type="switch"
                  id="custom-switch"
                  // defaultChecked={priority}
                  checked={priorityEdit}
                  onChange={(e) => {
                    setPriorityEdit(e.target.checked);
                  }}
                />
              </Form.Group>

              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="fs-3">Ad Image:</Form.Label>
                <div className="text-center">
                  <Image
                    className="shadow-lg mb-2"
                    height="160px"
                    width="420px"
                    alt="Profile Image"
                    src={imageEdit}
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
                        setImageEdit(imageDataURL);
                      };
                      reader.readAsDataURL(file);
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
                variant="success shadow-lg fw-bold p-2 px-4"
                // onClick={handleAdd}
                type="submit"
              >
                Edit Ad
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* Successfully edited the AD. */}
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
              Successfully Edited the Ad
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="text-success fs-4">
              1 Ad has been updated in the database.
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

export default SellerProducts;