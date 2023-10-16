import React from "react";
import ShowCarousel from "./ShowCarousel";

// import ShowCarousel from "./ShowCarousel";

const Home = () => {
  var result;
  const getCategory = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/category/getAllCategory", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div>
        <ShowCarousel />
      </div>
      <div className="mt-2 mx-2">
        <h1 style={{ fontSize: "50px", color: "#9b32e0" }}>
          <b>Categories:</b>
        </h1>
      </div>
    </>
  );
};

export default Home;
