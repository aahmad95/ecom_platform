import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import jwt_decode from "jwt-decode";

import Col from "react-bootstrap/Col";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
// import Sidebar from "cdbreact/dist/components/Sidebar";

const Customer = () => {
  // let navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [searchValue, setSearchValue] = useState("Search Filter");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   navigate("/login");
    // } else {
    //   const authToken = localStorage.getItem("token");
    //   var decoded = jwt_decode(authToken);
    //   decoded.user.role === "admin" ? getCustomers() : navigate("/404");
    // }

    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      var decoded = jwt_decode(authToken);
      decoded.user.role === "admin" && getCustomers();
    }

    // eslint-disable-next-line
  }, []);

  const getCustomers = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/users/getUsers",
      requestOptions
    );
    const json = await response.json();
    const customers = json.filter((user) => {
      if (user.role === "customer") return user;
      else return false;
    });
    setCustomers(customers);
    // // console.log(json);
    // console.log(customers);
  };
  const handleSearch = (event) => {
    setIsSearch(true);
    const value = `${document.getElementById("validationCustom03").value}`;
    // const value = event.target.value;
    console.log(value);

    const searchCustomer = customers.filter((user) => {
      if (searchValue === "Name") {
        return user.username.toLowerCase().includes(value.toLowerCase());
      }
      if (searchValue === "Email") {
        return user.email.toLowerCase().includes(value.toLowerCase());
      }
      if (searchValue === "Address") {
        return user.address.toLowerCase().includes(value.toLowerCase());
      } else return false;
    });
    setFilteredCustomers(searchCustomer);
    // console.log(filteredCustomers);
  };

  return (
    <>
      <Stack direction="horizontal">
        <div style={{ width: "55px" }}>
          <Sidebar />
        </div>
        <Stack>
          <div
            className="container vh-100 p-0"
            // style={{height:"100vh"}}
          >
            <div className="mx-5 my-5">
              <h1 className="text-center " style={{ color: "#9b32e0" }}>
                <b>Customers</b>
              </h1>
              <hr style={{ border: "3px solid purple" }} className="mx-auto" />
            </div>

            <div className="d-flex justify-content-center align-items-center my-4">
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="validationCustom03"
              >
                <Form.Label column sm="2" className="mx-3">
                  <Stack direction="horizontal" className="text-info mb-1 fs-4">
                    <i class="fa-solid fa-magnifying-glass fa-fade mx-1"></i>
                    <b>Search:</b>
                  </Stack>
                </Form.Label>

                <Col sm="6" className="py-2 mx-1">
                  <Form.Control
                    disabled={searchValue === "Search Filter"}
                    style={{ width: "350px", border: "1px solid skyBlue" }}
                    type="text"
                    placeholder="Type to search customers."
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
                      <Dropdown.Item
                        onClick={() => {
                          document.getElementById("validationCustom03").value =
                            null;
                          setIsSearch(false);
                          setSearchValue("Name");
                        }}
                      >
                        Name
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          document.getElementById("validationCustom03").value =
                            null;
                          setIsSearch(false);
                          setSearchValue("Email");
                        }}
                      >
                        Email
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          document.getElementById("validationCustom03").value =
                            null;
                          setIsSearch(false);
                          setSearchValue("Address");
                        }}
                      >
                        Address
                      </Dropdown.Item>

                      <Dropdown.Item
                        onClick={() => {
                          console.log(
                            document.getElementById("validationCustom03").value
                          );
                          document.getElementById("validationCustom03").value =
                            null;
                          setIsSearch(false);
                          setSearchValue("Search Filter");
                        }}
                      >
                        Search Filter
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Form.Group>
            </div>

            <div className="mx-2">
              {(!isSearch && customers.length) ||
              (isSearch && filteredCustomers.length) ? (
                // responsive
                <Table striped bordered hover className="shadow-lg">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Image</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isSearch && filteredCustomers ? (
                      filteredCustomers.length ? (
                        filteredCustomers.map((user) => {
                          return (
                            <tr key={user.id}>
                              <td>{user.id}</td>
                              <td>
                                {user.image ? (
                                  <img
                                    width="40px"
                                    height="35px"
                                    src={user.image}
                                    alt={`Profile Pic`}
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>{user.address}</td>
                              <td className="text-center">
                                <Button
                                  variant="info shadow-lg  px-2"
                                  onClick={() => {
                                    navigate(`/admin/customers/${user.id}`);
                                  }}
                                  // type="submit"
                                >
                                  Orders
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <div className="text-center fw-bold fs-3 text-danger">
                          No Customers to display.
                        </div>
                      )
                    ) : customers.length ? (
                      customers.map((user) => {
                        return (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                              {user.image ? (
                                <img
                                  width="40px"
                                  height="35px"
                                  src={user.image}
                                  alt={`Profile Pic`}
                                />
                              ) : (
                                "No Image"
                              )}
                            </td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.address}</td>
                            <td className="text-center">
                              <Button
                                variant="info shadow-lg  px-2"
                                onClick={() => {
                                  navigate(`/admin/customers/${user.id}`);
                                }}
                                // type="submit"
                              >
                                Orders
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className="text-center fw-bold fs-3 text-danger">
                        No Customers to display.
                      </div>
                    )}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center fw-bold fs-3 text-danger">
                  No Customers to display.
                </div>
              )}
            </div>
          </div>

          {/* </div> */}
          {/* </Row> */}
        </Stack>
      </Stack>
    </>
  );
};

export default Customer;
