import ShowCarousel from "./ShowCarousel";
import React, { useContext, useEffect, useRef, useState } from "react";
import categoryContext from "../context/category/categoryContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Home = () => {
  const context = useContext(categoryContext);
  const { categories, getCategories } = context;
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
  return (
    <>
      <div>
        <ShowCarousel />
      </div>
      <div className="mt-2 mx-2 row my-5">
        <h1 style={{ fontSize: "50px", color: "#9b32e0" }}>
          <b>Categories:</b>
        </h1>
        <div className="container mx-3">
          {categories.length === 0 && "No Categories to display."}
        </div>

        {categories.map((category) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={category.image} />
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                {/* <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text> */}
                <Button variant="primary">Show Products</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Home;
