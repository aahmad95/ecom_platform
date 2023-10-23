import React, { useContext, useEffect, useRef, useState } from "react";
import Image1 from "./CarouselImages/Image1.jpg";
import { Carousel } from "react-responsive-carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";
const ProductDetails = () => {
  const param = useParams();
  const [product, setProduct] = useState("");
  const [productDetails, setProductDetails] = useState([]);
  const [images, setImages] = useState([]);
  const images1 = [];
  //   console.log(param);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://localhost:5000/api/v1/product/getProduct/${param.productId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => console.log("error", error));
    // console.log(product);
    getProductDetails();

    // eslint-disable-next-line
  }, []);

  const getProductDetails = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/getProductDetailsByProduct/${param.productId}`,
      requestOptions
    );
    const json = await response.json();
    setProductDetails(json);
    console.log(json);
    console.log(productDetails);

    await json.map(async (productDetail) => {
      console.log(productDetail);
      await productDetail.image.map(async (i) => {
        console.log(i);
        await images1.push(i);
      });
    });
    console.log(images1);
    await setImages(images1);
    // console.log(images);
  };
  return (
    <div>
      <div className="mt-5 mx-3 my-5">
        <h1
          className="text-center "
          style={{ fontSize: "50px", color: "#9b32e0" }}
        >
          <b>{product.name}</b>
        </h1>
        <hr
          style={{ width: "220px", border: "3px solid purple" }}
          className="mx-auto"
        />
      </div>
      <Container>
        <Row>
          <Col className="gx-5 col-5">
            <Carousel>
              {images.length ? (
                images.map((image) => {
                  return (
                    <div key={image}>
                      <img
                        width="50%"
                        height="70%"
                        // className="d-inline-block align-top mx-4"
                        alt="Product Image"
                        src={image}
                      />
                    </div>
                  );
                })
              ) : (
                <div>No Images to show </div>
              )}

              {/* <div>
                <img
                  width="50%"
                  height="70%"
                  // className="d-inline-block align-top mx-4"
                  alt="Ad"
                  src="https://st2.depositphotos.com/1105977/5461/i/950/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg"
                />
                <p className="legend">Books 2</p>
              </div>
              <div>
                <img
                  width="50%"
                  height="70%"
                  // className="d-inline-block align-top mx-4"
                  alt="Ad"
                  src="https://thumbs.dreamstime.com/z/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg?w=992"
                />
                <p className="legend">Books 3</p>
              </div> */}
            </Carousel>
          </Col>

          <Col className="mx-3">
            <h2>{product.description}</h2>
            <Stack direction="horizontal" gap={2}>
              <div className="p-2 text-muted">Brand:</div>
              <div className="p-2 text-info">{product.brand}</div>
            </Stack>
          </Col>
        </Row>
        <Row></Row>
      </Container>
      {/* <div className="horizontal">
        <img
          src={Image1}
          width="50%"
          height="430px"
          // className="d-inline-block align-top mx-4"
          alt="Ad"
        />
        <div></div>
      </div> */}
      {/* <div className="container">{/* <CarouselProvider> </div> */}
    </div>
  );
};

export default ProductDetails;
