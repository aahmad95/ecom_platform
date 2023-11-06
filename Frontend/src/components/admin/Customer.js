import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Stack from 'react-bootstrap/Stack';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
const Customer = () => {

  const navigate=useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
    else{
      const authToken=localStorage.getItem("token")
    var decoded =jwt_decode(authToken);
    decoded.user.role==="admin" ? 
      
    console.log("Customers")
    
      :
      navigate("/404")

    }
    
   

    
    // eslint-disable-next-line
  }, []);
  return (
    <>
    <Stack direction="horizontal">
      <div><Sidebar/></div>
      <div>
        Customers
      </div>
      </Stack>
    </>
  )
}

export default Customer
