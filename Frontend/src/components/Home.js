import React from "react";
import ShowCarousel from "./ShowCarousel";

// import ShowCarousel from "./ShowCarousel";

const Home = () => {
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
