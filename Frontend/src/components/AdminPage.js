// import "./AdminPage.css";
import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';


import Col from "react-bootstrap/Col";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./admin/Sidebar";
// import Sidebar from "cdbreact/dist/components/Sidebar";

const AdminPage = () => {
  // let navigate = useNavigate();
  const [users,setUsers]=useState([]);
  const [searchValue, setSearchValue] = useState("Search Filter");
  
  useEffect(() => {
   getUsers()
    // eslint-disable-next-line
  }, []);


  const getUsers=async ()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    

const response=await fetch("http://localhost:5000/api/v1/users/getUsers", requestOptions)
  const json=await response.json();
  await setUsers(json);
  console.log(json);
  console.log(users);
  
  }
  

  return (
    <div>
    <Stack direction="horizontal">
      <div><Sidebar/></div>
      {/* <Row> */}
      <div className="container vh-100 p-0" 
      // style={{height:"100vh"}}
      >
      <div className="mt-5 mx-3 my-5">
        <h1
          className="text-center "
          style={{ color: "#9b32e0" }}
        >
          <b>Admin Page</b>
        </h1>
        <hr
          style={{ border: "3px solid purple" }}
          className="mx-auto"
        />
       </div>
       <h2
          className="text-center "
          style={{ color: "#9b32e0" }}
        >
           <b>Users</b>
        </h2>
        <div className="d-flex justify-content-center align-items-center my-3">
       <Form.Group as={Row} className="mb-3" controlId="validationCustom03">
    
    
              <Form.Label column sm="2">
              <Stack direction="horizontal" className="text-info mb-1 fs-4">
              <i class="fa-solid fa-magnifying-glass fa-beat-fade mx-1"></i><b>Search:</b>
                </Stack>
              </Form.Label>
              
              <Col sm="6" className="py-2">
              <Form.Control
            style={{ width: "350px", border: "1px solid skyBlue" }}
            type="text"
            placeholder="Type to search user."
            className="text-center shadow-lg" 
            aria-label="Search"
            // onChange={handleSearch}
          />
</Col>
<Col sm="2" className="py-2">
           <Dropdown className="mr-2">
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        {searchValue}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>{setSearchValue("Name")}}>Name</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setSearchValue("Email")}}>Email</Dropdown.Item>
        <Dropdown.Item onClick={()=>{setSearchValue("Role")}}>Role</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </Col>       
              
            </Form.Group>
       
    </div>
        <div className="mx-2 overflow-auto">
       <Table striped bordered hover >
      <thead >
        <tr>
          <th>ID</th>
          <th>Role</th>
          <th>Image</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user)=>{
        return(
          <tr>
          <td>{user.id}</td>
          <td>{user.role}</td>
          <td>{user.image ? <img width="40px"
                            height="35px"
                            
                            src={user.image}
                            alt={`Profile Pic`}
          />:"No Image"}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.address}</td>
        </tr>
        )
      })}
      </tbody>
    </Table>
    </div>
    
      </div>
      {/* </Row> */}
      </Stack>
    </div>
  );
};

export default AdminPage;
