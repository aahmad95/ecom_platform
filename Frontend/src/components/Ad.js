import React from "react";
import { useEffect } from "react";
const Ad = () => {
  const [ads, setAds] = useState("");
  useEffect(() => {
    //  getCategories();
    // eslint-disable-next-line
  }, []);
  const getAds = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/ads/getAllAds",
      requestOptions
    );
    const json = response.json();
  };

  return <div></div>;
};

export default Ad;
