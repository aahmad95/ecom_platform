import React from "react";
import icon from "../logo.svg";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter className="bg-dark text-center text-white shadow-lg">
      <MDBContainer className="p-4 pb-0">
        <section className="mb-4">
          <MDBBtn
            floating
            className="m-1 border-info"
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1 border-info"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1 border-info"
            style={{ backgroundColor: "#dd4b39" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>
          <MDBBtn
            floating
            className="m-1 border-info"
            style={{ backgroundColor: "#ac2bac" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1 border-info"
            style={{ backgroundColor: "#0082ca" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1 border-info"
            style={{ backgroundColor: "#333333" }}
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        <div>
          <img
            src={icon}
            width="60"
            height="55"
            className="d-inline-block align-top"
            alt="E-commerce website logo"
          />
          <span className="text-info fs-2 mb-2 fw-bold mx-2">
            E-Commerce Website
          </span>
        </div>
        <div className="text-success">
          &copy; E-Commerce Website, 2023. All rights reserved.
          {/* <a className="text-white" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a> */}
        </div>
      </div>
    </MDBFooter>
  );
}
export default Footer;
