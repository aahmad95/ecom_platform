import Carousel from "react-bootstrap/Carousel";
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
  }, []);
  return (
    <Carousel>
      {ads.length ? (
        ads
          .filter((ad) => ad.priority)
          .map((ad) => {
            return (
              <Carousel.Item interval={2000} key={ad.id}>
                {/* <Image1 text="Second slide" /> */}
                <img src={ad.image} width="100%" height="430px" alt={ad.name} />
              </Carousel.Item>
            );
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
