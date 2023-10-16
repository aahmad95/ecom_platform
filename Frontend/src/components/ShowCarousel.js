import Image1 from "./CarouselImages/Image1.jpg";
import Image2 from "./CarouselImages/Image2.jpeg";
import Image3 from "./CarouselImages/Image3.jpeg";
import Image4 from "./CarouselImages/Image4.jpeg";
import Image5 from "./CarouselImages/Image5.jpeg";

import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from "components/ExampleCarouselImage";

function ShowCarousel() {
  return (
    <Carousel>
      <Carousel.Item interval={2000}>
        {/* <Image1 text="Second slide" /> */}
        <img
          src={Image1}
          width="100%"
          height="350px"
          // className="d-inline-block align-top mx-4"
          alt="Ad"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        {/* <Image1 text="Second slide" /> */}
        <img
          src={Image2}
          width="100%"
          height="350px"
          // className="d-inline-block align-top mx-4"
          alt="Ad"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        {/* <Image1 text="Second slide" /> */}
        <img
          src={Image3}
          width="100%"
          height="350px"
          // className="d-inline-block align-top mx-4"
          alt="Ad"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        {/* <Image1 text="Second slide" /> */}
        <img
          src={Image4}
          width="100%"
          height="350px"
          // className="d-inline-block align-top mx-4"
          alt="Ad"
        />
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        {/* <Image1 text="Second slide" /> */}
        <img
          src={Image5}
          width="100%"
          height="350px"
          // className="d-inline-block align-top mx-4"
          alt="Ad"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ShowCarousel;
