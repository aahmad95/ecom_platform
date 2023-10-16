import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const Carousel = () => {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={80}
      totalSlides={3}
    >
      <Slider>
        <Slide index={0}>
          <img src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?w=996&t=st=1696320696~exp=1696321296~hmac=630790db5475041d994ae2120555293841e17039d29b6054cbe177aba01227d9" />
        </Slide>
        <Slide index={1}>
          <img src="https://st2.depositphotos.com/1105977/5461/i/950/depositphotos_54615585-stock-photo-old-books-on-wooden-table.jpg" />
        </Slide>
        <Slide index={2}>
          <img src="https://thumbs.dreamstime.com/z/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg?w=992" />
        </Slide>
      </Slider>
      <ButtonBack>&lt; Previous</ButtonBack>
      <ButtonNext>Next &gt;</ButtonNext>
    </CarouselProvider>
  );
};

export default Carousel;
