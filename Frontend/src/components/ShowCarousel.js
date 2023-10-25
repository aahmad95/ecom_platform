import Image1 from "./CarouselImages/Image1.jpg";
import Image2 from "./CarouselImages/Image2.jpeg";
import Image3 from "./CarouselImages/Image3.jpeg";
import Image4 from "./CarouselImages/Image4.jpeg";
import Image5 from "./CarouselImages/Image5.jpeg";

import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";
import { useEffect, useState } from "react";
function ShowCarousel() {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    const fetchAds = async () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:5000/api/v1/get/getAll",
        requestOptions
      );
      const data = await response.json();
      console.log("Ads:  ", data);
      setAds(data);
    };
    fetchAds();
    // console.log("OrderItems------->", orderItems);
  }, []);
  return (
    <Carousel>
      {ads.length ? (
        ads.map((ad) => {
          if (ad.priority) {
            return (
              <Carousel.Item interval={2000}>
                {/* <Image1 text="Second slide" /> */}
                <img
                  src={ad.image}
                  width="100%"
                  height="430px"
                  // className="d-inline-block align-top mx-4"
                  alt={ad.name}
                />
              </Carousel.Item>
            );
          }
        })
      ) : (
        <div className="text-center my-5 fw-bold fs-3">
          No Ads to display now.
        </div>
      )}
    </Carousel>
  );
}

export default ShowCarousel;
