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
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";

// import closeButton from "react-bootstrap/ModalHeader";

const SellerCategories = () => {
  const [load, setLoad] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const [userId, setUserId] = useState();

  const [edit, setEdit] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");

  const [doneEdit, setDoneEdit] = useState(false);

  const [categories, setCategories] = useState([]);

  const [show, setShow] = useState(false);

  const [modal, setModal] = useState(false);

  const [cancel, setCancel] = useState(false);
  const [del, setDel] = useState(false);

  const [categoryId, setCategoryId] = useState();

  const [searchValue, setSearchValue] = useState("Search Filter");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);
      if (decoded.user.role === "seller") {
        setUserId(decoded.user.id);
        getCategories();
      }
    }
    setLoad(false);

    // eslint-disable-next-line
  }, [load, userId]);
  // useEffect(()=>{
  //   console.log('Ads', ads);
  // }, [ads])

  const getCategories = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/category/getAllCategory",
      requestOptions
    );

    const json = await response.json();

    // json.map(async (j) => {
    //   // let username
    //   // let name = await getUserName(j.userId);
    //   return (j["user"] = await getUserName(j.userId));
    // });
    const userNamePromises = json.map(async (j) => {
      j["user"] = await getUserName(j.userId);

      return j;
    });
    await Promise.all(userNamePromises);

    setCategories(json);

    console.log(json);
    // setAds(json);
    console.log(categories);
  };
  const handleSearch = (event) => {
    setIsSearch(true);
    const value = event.target.value;
    console.log(value);
    const searchCategory = categories.filter((category) => {
      return category.name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCategories(searchCategory);
  };

  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleAdd = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: name,
      image: image,
      userId: userId,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/category/createCategory",
      requestOptions
    );

    if (response.status === 201) {
      setModal(true);
      setLoad(true);
    }
  };

  const getUserName = async (id) => {
    console.log(id);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/users/getUser/${id}`,
      requestOptions
    );
    const json = await response.json();
    // console.log('Usename ---->>>', json)
    return json.username;
  };

  const handleDelete = async (categoryId) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/category/deleteCategory/${categoryId}`,
      requestOptions
    );

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
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/category/updateCategory/${idEdit}`,
      requestOptions
    );

    if (response.status === 204) {
      setDoneEdit(true);
      setLoad(true);
    }
  };

  return (
    <>
      {/* <Stack direction="horizontal"> */}

      <Stack style={{ paddingLeft: "80px" }}>
        <div className="mx-3">
          {/* <div className="mx-3 my-5">
            <h1 className="text-center " style={{ color: "#9b32e0" }}>
              <b>Categories</b>
            </h1>
            <hr style={{ border: "3px solid purple" }} className="mx-auto" />
          </div> */}
          <div className="mt-5 mx-2 my-5">
            <h1
              className="text-center "
              style={{ fontSize: "50px", color: "#9c49d4" }}
            >
              <b>Categories</b>
            </h1>
            <hr
              style={{ width: "223px", border: "3px solid", color: "#1ab5e9" }}
              className="mx-auto shadow-lg"
            />

            <div className="d-flex justify-content-center align-items-center my-5">
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="validationCustom03"
              >
                <Form.Label column sm="3">
                  <Stack
                    direction="horizontal"
                    className="text-info mb-1 fs-4 "
                  >
                    <i class="fa-solid fa-magnifying-glass fa-beat-fade mx-1"></i>
                    <b>Search:</b>
                  </Stack>
                </Form.Label>

                <Col sm="8" className="p-2">
                  <Form.Control
                    style={{ width: "350px", border: "1px solid skyBlue" }}
                    type="text"
                    placeholder="Type to search category."
                    className="mx-3 text-center shadow-lg"
                    aria-label="Search"
                    onChange={handleSearch}
                  />
                </Col>
              </Form.Group>
            </div>
            <div className="container">
              <div className="row my-4">
                {isSearch && filteredCategories ? (
                  filteredCategories.length ? (
                    filteredCategories.map((category) => (
                      <div className="my-4 col-md-4" key={category.id}>
                        <Card
                          style={{ width: "19rem" }}
                          className="text-center shadow-lg mx-auto"
                        >
                          <Card.Img
                            width="19rem"
                            height="250px"
                            variant="top"
                            src={category.image}
                            alt={`${category.name} Image`}
                          />
                          <Card.Body>
                            <Card.Title className=" fs-3 mb-3">
                              {category.name}
                            </Card.Title>
                            {/* <Card.Text>
              Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </Card.Text> */}
                            <Button
                              variant="info shadow-lg mb-3"
                              onClick={() => {
                                navigate(`/seller/category/${category.id}`);
                              }}
                            >
                              Products
                            </Button>
                          </Card.Body>
                        </Card>
                      </div>
                    ))
                  ) : (
                    <div className="text-center fw-bold fs-3 text-danger">
                      No Categories to display.
                    </div>
                  )
                ) : categories.length ? (
                  categories.map((category) => (
                    <div className="my-4 col-md-4" key={category.id}>
                      <Card
                        style={{ width: "19rem" }}
                        className="text-center shadow-lg mx-auto"
                      >
                        <Card.Img
                          width="19rem"
                          height="250px"
                          variant="top"
                          src={category.image}
                          alt={`${category.name} Image`}
                        />
                        <Card.Body>
                          <Card.Title className=" fs-3 mb-3">
                            {category.name}
                          </Card.Title>
                          {/* <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text> */}
                          <Button
                            variant="info shadow-lg mb-3"
                            onClick={() => {
                              navigate(`/seller/category/${category.id}`);
                            }}
                          >
                            Products
                          </Button>
                        </Card.Body>
                      </Card>
                    </div>
                  ))
                ) : (
                  <div className="text-center fw-bold fs-3 text-danger">
                    No Categories to display.
                  </div>
                )}
              </div>
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
    </>
  );
};

export default SellerCategories;
