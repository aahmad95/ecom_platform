import ShowCarousel from "./ShowCarousel";
import React, { useContext, useEffect, useRef, useState } from "react";
import categoryContext from "../context/category/categoryContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Ads from "./admin/Ads";
import { Link } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  //  const ref = useRef(null);
  //  const refClose = useRef(null);
  // const [category, setCategory] = useState({
  //   id: "",
  //   name: "",
  //   image: "",
  //   userId: "",
  // });
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

        <div className="container">
          <div className="row my-4">
            {categories.length
              ? categories.map((category) => {
                  return (
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
                            {/* <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text> */}
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
                  );
                })
              : "No Categories to display."}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
