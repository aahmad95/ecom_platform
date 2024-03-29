import ShowCarousel from "./ShowCarousel";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import jwt from "jsonwebtoken";
// import jwt from "jsonwebtoken-browser";
const Home = () => {
  const data = "your data";
  const encodedData = Buffer.from(data).toString("base64");
  console.log(encodedData);

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const [filteredCategories, setFilteredCategories] = useState([]);
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);
  const handleSearch = (event) => {
    setIsSearch(true);
    const value = event.target.value;
    // console.log(value);
    const searchCategory = categories.filter((category) => {
      return category.name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredCategories(searchCategory);
  };

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
    console.log(json);
    setCategories(json);
  };
  return (
    <>
      <div>
        <ShowCarousel />
      </div>
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
          <Form.Group as={Row} className="mb-3" controlId="validationCustom03">
            <Form.Label column sm="3">
              <Stack direction="horizontal" className="text-info mb-1 fs-4 ">
                <i className="fa-solid fa-magnifying-glass fa-beat-fade mx-1"></i>
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
                    <Link
                      className="text-decoration-none"
                      to={`/Category/${category.id}`}
                    >
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

                          <Button
                            variant="info shadow-lg mb-3"
                            onClick={() => {
                              navigate(`/Category/${category.id}`);
                            }}
                          >
                            Products
                          </Button>
                        </Card.Body>
                      </Card>
                    </Link>
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
                  <Link
                    className="text-decoration-none"
                    to={`/Category/${category.id}`}
                  >
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

                        <Button
                          variant="info shadow-lg mb-3"
                          onClick={() => {
                            navigate(`/Category/${category.id}`);
                          }}
                        >
                          Products
                        </Button>
                      </Card.Body>
                    </Card>
                  </Link>
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
    </>
  );
};

export default Home;
