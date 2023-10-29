import React, { useContext, useEffect, useState } from "react";
import cartContext from "../context/cart/cartContext";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import icon from "../logo.svg";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from 'react-bootstrap/Table';
import Form from "react-bootstrap/Form";
import jwt_decode from "jwt-decode";


const Checkout = () => {
  // console.log("props.order:    ",props.orderItems)
  
  const context = useContext(cartContext);
  const { orderDetails, checkout } = context;
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  // {product:{},productDetails:{},quantity:0}
  // const [orderItems, setOrderItems] = useState([]);
  const authToken=localStorage.getItem("token")
    var decoded =jwt_decode(authToken);
  const [address, setAddress] = useState(decoded.user.address);

  const deliveryFee=100;
  let subtotal=0;

  
  useEffect(() => {
    // console.log("props:    ",props.orderItems)
    console.log("orderDetails: ",orderDetails);

    // setOrderItems(ordersDetails);
    // console.log("orderItems:  ",orderItems)
    // fetchOrderItems();
    // console.log("OrderItems------->", orderItems);
  }, [orderDetails]);

const handlePlaceOrder=(event)=>{
  event.preventDefault();
  setModal(true);
checkout(subtotal,deliveryFee, address);




setTimeout(() => {
  navigate("/home")
}, 4000);


}


  return (
    <Container>
      <Form onSubmit={handlePlaceOrder}>
  
    {/* <div className="mt-5 mx-3 my-5">
        <h1
          className="text-center "
          style={{ fontSize: "50px", color: "#9b32e0" }}
        >
          <b>Checkout</b>
        </h1>
        <hr
          style={{ width: "220px", border: "3px solid purple" }}
          className="mx-auto"
        />
      </div> */}
      
      
  {/* <div class=""> */}
  
        <Row>
        <div className="mt-5 mb-4 mx-auto">
        <h1
          className="text-center fs-1"
          style={{  color: "#9b32e0" }}
        >
          <b>Place Order</b>
        </h1>
        <hr
          style={{ width: "203px", border: "3px solid purple" }}
          className="mx-auto"
        />
      </div>
          


          
    <Col>
    {/* <Stack gap={2} direction="horizontal" > */}
    <div class="d-flex justify-content-center align-items-center bg-white shadow-lg mt-2">
    <Stack>
      
      <div className="mt-4 mb-2">
        <h1
          className="text-center fs-2"
          style={{  color: "#9b32e0" }}
        >
          <b>Order Address </b>
        </h1>
        <hr
          style={{ width: "212px", border: "3px solid purple" }}
          className="mx-auto"
        />
      </div>
      {/* <div class="row g-3 align-items-center">   */}
      <div>
      
    <Form.Group as={Row} className="mb-3" controlId="validationCustom03">
    
    {/* <div class="col-auto"> */}
              <Form.Label column sm="3">
              <Stack direction="horizontal" className="mx-4 mb-1 fs-4">
                <i class="fa-solid fa-location-dot fa-beat-fade mx-1"></i><b>Address:</b>
                </Stack>
              </Form.Label>
              {/* </div> */}
              {/* <div class="col-auto"> */}
              <Col sm="8" className="p-2">
              <Form.Control
                // name="email"
                className="text-center"
                variant="outlined"
                type="text"
                placeholder="Enter your address here."
                required
                value={address}
                // value={values.email}
                // isInvalid={!!errors.city}
                onChange={(e) => setAddress(e.target.value)}
              />
              </Col>
               {/* </div>  */}
              {/* <Form.Control.Feedback type="invalid">
                Please provide a valid address.
              </Form.Control.Feedback> */}
            </Form.Group>
            
            </div>
            {/* </div>  */}
            </Stack>   
    </div>
    {/* </Stack > */}
    
          <div class="d-flex justify-content-center align-items-center bg-white shadow-lg my-5">
          <Stack >
      <div className="mt-4 mb-2">
        <h1
          className="text-center fs-2"
          style={{  color: "#9b32e0" }}
        >
          <b>Order Items Details</b>
        </h1>
        <hr
          style={{ width: "286px", border: "3px solid purple" }}
          className="mx-auto"
        />
      </div>
      <div className="m-2 fs-5">
      <Table bordered hover >
      <thead >
        <tr >
          <th>Name</th>
          <th colSpan={2}>Products </th>
          <th>Price</th>
          <th>Quantity </th>
          <th>Total Price</th>

        </tr>
      </thead>
      <tbody>
      {orderDetails.map((p)=>{
        subtotal=subtotal+(p.product.price * p.quantity);
return(
  <tr>
  <td>{p.product.name}</td>
  <td><img
                  width="50px"
                  height="60px"
                  // className="d-inline-block align-top mx-4"
                  alt="ProductImage"
                  src={p.productDetails.image}
      /></td>
  <td>{p.product.description}</td>
  <td>{p.product.price}</td>
  <td>{p.quantity}</td>
  <td>{p.product.price * p.quantity}</td>
</tr>
)
      })}
      
       
      </tbody>
    </Table>
    </div>
     </Stack>
    </div>
          </Col>
          <Col className="gx-0 col-4">
          

          <div class="d-flex justify-content-center align-items-center bg-white shadow-lg m-2 mb-5">

          <Stack  gap={1}>
      <div className="mx-3 my-4">
        <h1
          className="text-center fs-2"
          style={{ color: "#9b32e0" }}
        >
          <b>Order Summary</b>
        </h1>
        <hr
          style={{ width: "236px", border: "3px solid purple" }}
          className="mx-auto"
        />
      </div>
      
      {/* <Stack direction="horizontal"  className="fs-4">
      <div className="px-3 text-muted">Subtotal:</div>
      <div className="px-3 ms-auto">Rs. </div>
      </Stack>
      <Stack direction="horizontal"  className="fs-4">
      <div className="px-3 text-muted">Delivery Fee:</div>
      <div className="px-3 ms-auto">Rs. </div>
      </Stack>
      <hr/>
      <Stack direction="horizontal"  className="fs-4">
      <div className="px-3 ">Total:</div>
      <div className="px-3 ms-auto">Rs. </div>
      </Stack> */}
      <div className="m-2 fs-4">
      <Table hover>
     
      <tbody>
        <tr>
        <td className="text-muted">Subtotal: </td>
        <td>Rs. {subtotal}</td>
        </tr>
        <tr>
        <td className="text-muted">Delivery Fee: </td>
        <td>Rs. {deliveryFee}</td>
        </tr>
        <tr>
        <td>Total: </td>
        <td>Rs. {subtotal+deliveryFee}</td>
          
        </tr>
       
        
        
       
        
       
      </tbody>
    </Table>
    </div>
      <div className="text-center m-5">
              <Button
                // disabled={!(quantity && productDetailId)}
                variant="outline-success shadow-lg fs-4 fw-bold p-1 px-2"
                onClick={()=>{setShow(true)}}
              >
                Place Order
              </Button>
              <Button
                // disabled={!(quantity && productDetailId)}
                variant="outline-info shadow-lg fs-4 fw-bold mt-3 p-1 px-3"
                onClick={()=>{navigate("/cart")}}
              >
                Edit Order
              </Button>
            </div>
      
    
    </Stack> 
     
    </div>
   
    </Col>

    </Row>
  
    <Modal
        show={show}
        onHide={()=>{setShow(false)}}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="fw-bold text-center fs-2"
          >
            Place Order
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <div className="text-danger fs-2">
        Are you sure?
          </div>
          
       
          
          <Button
            variant="outline-secondary shadow-lg fs-5 fw-bold px-4 my-4 mx-2"
            onClick={() => {
              setShow(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="outline-warning shadow-lg fs-5 fw-bold px-2 my-4 mx-2"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
          </Modal.Body>
      </Modal>



       
</Form> 

<Modal
        show={modal}
        onHide={()=>{setModal(false)}}
        // size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            className="fw-bold text-center fs-3"
          >
            Order Placed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="text-success fs-4">
            Your order has been placed Successfully.
          </div>
          <Button
            variant="outline-secondary shadow-lg fs-5 fw-bold px-3 my-3"
            onClick={() => {
              setModal(false);
            }}
          >
            Close
          </Button>
        </Modal.Body>
      </Modal>
</Container>

  )
};

export default Checkout;
