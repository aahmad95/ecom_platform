import React, { useEffect, useState } from "react";
import ModalHeader from "react-bootstrap/ModalHeader";
import categoryContext from "../../context/cart/cartContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Buffer } from "buffer";
import Sidebar from "./Sidebar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';

// import closeButton from "react-bootstrap/ModalHeader";

const Ads = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [priority, setPriority] = useState(false);
  const [userId, setUserId] = useState(false);
  const [ads, setAds] = useState([]);
  const [show, setShow] = useState(false);



  const [searchValue, setSearchValue] = useState("Search Filter");
  const [filteredAds, setFilteredAds] = useState([])
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    getAds();
    //  getCategories();
    // eslint-disable-next-line
  }, []);

  const getAds=async ()=>{

    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const response=await fetch("http://localhost:5000/api/v1/get/getAll", requestOptions)
     const json=await response.json();
     await setAds(json);
     console.log(json)
     console.log(ads)

  }

  
    const handleSearch = (event) => {
      setIsSearch(true);
      const value = event.target.value;
      console.log(value)
      const searchAd = ads.filter((ad) => {
        return ad.name.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredAds(searchAd);
    };
  
  // const getUserId = async () => {
  //   const token = localStorage.getItem("token");

  //   var decoded = await jwt_decode(token);

  //   await setUserId(decoded.user.id);
  // };
  // const context = useContext(categoryContext);
  // const { categories, getCategories } = context;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    // console.log(e);
    console.log(priority);
    // console.log("image:", image);

    // const authToken = localStorage.getItem("token");
    // var decoded = jwt_decode(authToken);

    // const response = await fetch(
    //   "http://localhost:5000/category/createCategory",
    //   requestOptions
    // );
    // const json = await response.json();
    // console.log(json);
    // handleClose();
  };
  return (
    <>
    {/* <Stack direction="horizontal"> */}
    
      <Stack style={{paddingLeft: "80px"}} >
      <div  className="mx-3">
        
     

    
    
   
      <div className="mx-3 my-5">
      
        <h1
          className="text-center "
          style={{ color: "#9b32e0" }}
        >
          <b>Ads</b>
        </h1>
        <hr
          style={{ border: "3px solid purple" }}
          className="mx-auto"
        />
      </div>

        <div className="container text-center">
          <Button
            variant="outline-dark py-2 px-3 my-5 fw-bold shadow-lg"
            onClick={handleShow}
          >
            Add New Ad
          </Button>
        </div>


        
       
        <div className="d-flex justify-content-center align-items-center my-4">
       <Form.Group as={Row} className="mb-3" controlId="validationCustom03">
    
    
              <Form.Label column sm="2" className="mx-3">
              <Stack direction="horizontal" className="text-info mb-1 fs-4">
              <i class="fa-solid fa-magnifying-glass fa-beat-fade mx-1"></i><b>Search:</b>
                </Stack>
              </Form.Label>
              
              <Col sm="6" className="py-2 mx-1">
              <Form.Control
             
              disabled={searchValue==="Search Filter"}
           
            style={{ width: "350px", border: "1px solid skyBlue" }}
            type="text"
            placeholder="Type to search user."
            className="text-center shadow-lg" 
            aria-label="Search"
            // onClick={handleSearch}
            onChange={handleSearch}
          />
</Col>
<Col sm="2" className="py-2 mx-2">
           <Dropdown className="mr-2">
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        {searchValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{document.getElementById("validationCustom03").value=null;
           setIsSearch(false)
           setSearchValue("Name");
      }}>Name</Dropdown.Item>
        <Dropdown.Item onClick={()=>{document.getElementById("validationCustom03").value=null;
           setIsSearch(false)
          setSearchValue("User Name");
      }}> User Name</Dropdown.Item>
        <Dropdown.Item onClick={()=>{document.getElementById("validationCustom03").value=null;
           setIsSearch(false)
           setSearchValue("Priority");
    }}>Priority</Dropdown.Item>
        
        <Dropdown.Item onClick={()=>{
          console.log(document.getElementById("validationCustom03").value)
           document.getElementById("validationCustom03").value=null;
           setIsSearch(false)
           setSearchValue("Search Filter");
       
      }}>Search Filter</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </Col>       
              
            </Form.Group>
       
    </div>
   
    <div className="mt-5 mr-5">
          <div className="row my-4">
            {isSearch && filteredAds ? 
            (filteredAds.length ?
              filteredAds.map((ad) => (
              <div className="my-4 col-md-5" key={ad.id}>
                      <Link
                        className="text-decoration-none"
                        to={`/Product/${ad.id}`}
                      >
                        <Card
                          style={{ width: "10rem" }}
                          className="text-center shadow-lg mx-auto"
                        >
                          <Card.Img
                            width="10rem"
                            height="200px"
                            variant="top"
                            src={ad.image}
                            alt={`${ad.name} Image`}
                          />
                          <Card.Body>
                            <Card.Title className="fs-2">
                              {ad.name}
                            </Card.Title>
                            <Card.Text
                              className="text-wrap text-primary text-truncate"
                              style={{ "max-width": "550px" }}
                            >
                              ${ad.description}
                            </Card.Text>

                            {/* <Button
                            variant="success shadow-lg mb-3"
                            onClick={() => {
                              //   navigate(`/Category/${category.id}`);
                            }}
                          >
                            Product Details
                          </Button> */}
                            <div className="mx-3 text-start">
                              <small className="text-muted ">
                                {ad.brand}
                              </small>
                            </div>
                            <div className="text-end">
                              {/* <Badge bg="warning fs-6 mx-2 p-2 shadow-lg">
                                {product.price} Rs
                              </Badge> */}
                            </div>
                          </Card.Body>
                        </Card>
                      </Link>
                    </div>
                  ))
                  :<div className="text-center fw-bold fs-3 text-danger">No Products to display.</div>
            )
            :(ads.length
              ? ads.map((ad) => {
                  return (
                    <div className="my-4 col-md-6 " key={ad.id}>
                      {/* <Link
                        className="text-decoration-none"
                        to={`/Product/${product.id}`}
                      > */}
                        <Card
                        border="info"
                          style={{ width: "32rem" }}
                          className="text-center shadow-lg mx-auto"
                        >
                           <Card.Header className="fs-3 fw-bold">{ad.name}</Card.Header>
                          <Card.Img
                            width="32rem"
                            height="260px"
                            variant="top"
                            src={ad.image}
                            alt={`${ad.name} Image`}
                          />


                          <Card.Body>
                            {/* <Card.Title className="fs-3">
                              {ad.name}
                            </Card.Title> */}
                          </Card.Body>
                          <Card.Body>
                          
                          <Card.Text className="fs-4">
                            <Stack direction="horizontal" className="mx-3 text-primary">
                            
                            <div >
                                Priority: <b>{`${ad.priority}`}</b>
                                </div>
                            
                                <div className="ms-auto">
                                Username: <b>{ad.userId}</b>
                                </div>
                                </Stack>
                               
                           
                            </Card.Text>
                            </Card.Body>



                            <Card.Body>
                                <Stack direction="horizontal" className="mx-3 text-primary">
                            
                            <div >
                                Priority: <b>{`${ad.priority}`}</b>
                                </div>
                            
                                <div className="ms-auto">
                                Username: <b>{ad.userId}</b>
                                </div>
                                </Stack>
                                </Card.Body>
                          
                        </Card>
                      {/* </Link> */}
                    </div>
                  )
                })
              : 
              <div className="text-center fw-bold fs-3 text-danger">No Products to display.</div>
                )}
          </div>
          
    </div>

    
    

        <Modal
          show={show}
          onHide={handleClose}
          // size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="fw-bold text-center fs-1"
            >
              Add new Ad
            </Modal.Title>

            {/* <button
              type="button"
              className="btn-close justify-content-end"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button> */}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label className="fw-bold fs-3">Ad Name:</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="priority">
                <Form.Label className="fw-bold fs-3">Set Priority:</Form.Label>
                <Form.Check // prettier-ignore
                  className="mx-3"
                  type="switch"
                  id="custom-switch"
                  // defaultChecked={priority}
                  required
                  onChange={(e) => setPriority(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="fileName" className="mb-3">
                <Form.Label className="fw-bold fs-3">Ad Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  size="lg"
                  required
                  onChange={(event) => {
                    //   setImage(e.target.files[0]);
                    console.clear();
                    console.log();
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();

                      reader.onload = (e) => {
                        const imageDataURL = e.target.result;

                        // console.log("Base 64 -> ", base64);
                        // You can use imageDataURL as a base64-encoded image string.
                        // console.log(imageDataURL);
                        setImage(imageDataURL);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary shadow-lg fw-bold p-2"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="success shadow-lg fw-bold p-2" onClick={handleAdd}>
              Add Category
            </Button>
          </Modal.Footer>
        </Modal>
     
    
      
   
     
        </div>
   </Stack>
   <div 
  //  style={{width: "55px"}}
  ><Sidebar/></div>
   {/* </Stack> */}
    </>
  );
};

export default Ads;
