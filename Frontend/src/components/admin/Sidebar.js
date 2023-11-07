import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link, NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import icon from "../../logo.svg";
import Image from "react-bootstrap/Image";

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [location, setLocation] = useState();

  useEffect(() => {
    // console.log(localStorage.getItem("token"))
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);
      if (decoded.user.role !== "admin") {
        navigate("/404");
      } else {
        if (!user) {
          setUser(decoded.user);
        }
      }
    }
    setLocation(window.location.href);
    console.log(location);
    // eslint-disable-next-line
  }, [user]);

  return (
    <div
      style={{
        position: "fixed",
        top: "77px",
        left: 0,
        display: "flex",
        height: "90vh",
        overflow: "scroll initial",
      }}
    >
      <CDBSidebar
        textColor="#1ab5e9"
        backgroundColor="linear-gradient( 160.1deg,  rgba(151, 17, 172, 1) 45.8%, rgb(26, 93, 194,1) 70.2% )"
      >
        <CDBSidebarHeader
          prefix={<i class="fa-solid fa-bars fa-flip"></i>}
          // {<i class="fa-solid fa-greater-than fa-flip"></i>}
        >
          {/* <Link
            to="/admin"
            className="text-decoration-none fs-3 fa-beat-fade"
            style={{ color: "inherit" }}
          > */}
          <h4 className="fa-beat-fade mt-2 fw-bold">Hello {user.username}!</h4>
          {/* </Link> */}
          <div className="text-center" opacity="1">
            <Image
              className="shadow-lg mt-1"
              height="150px"
              width="130px"
              alt="Profile Image"
              src={user.image}
              roundedCircle
            />
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              exact
              as={Link}
              to="/admin"
              // activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                className={
                  location === "http://localhost:3000/admin"
                    ? "text-light fw-bold fa-beat-fade"
                    : "fa-beat-fade"
                }
                icon="house-user"
                // className="fa-beat"
              >
                Admin Home
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              as={Link}
              to="/admin/ads"
              // activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                className={
                  location === "http://localhost:3000/admin/ads"
                    ? "text-light fw-bold fa-beat-fade"
                    : "fa-beat-fade"
                }
                icon="rectangle-ad"
                // className="fa-beat"
              >
                Ads
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              as={Link}
              to="/admin/category"
              // target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="icons"
                className={
                  location === "http://localhost:3000/admin/category"
                    ? "text-light fw-bold fa-beat-fade"
                    : "fa-beat-fade"
                }
              >
                Categories
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              as={Link}
              to="/admin/sellers"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="shop"
                className={
                  location === "http://localhost:3000/admin/sellers" ||
                  location === "http://localhost:3000/admin/sellers/"
                    ? "text-light fw-bold fa-beat-fade"
                    : "fa-beat-fade"
                }
              >
                Shopkeepers
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              as={Link}
              to="/admin/customers"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="users-gear"
                className={
                  location === "http://localhost:3000/admin/customers"
                    ? "text-light fw-bold fa-beat-fade"
                    : "fa-beat-fade"
                }
              >
                Customers
              </CDBSidebarMenuItem>
            </NavLink>

            {/* <NavLink
              exact
              as={Link}
              to="/admin/analytics"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="chart-line"
                className={
                  location === "http://localhost:3000/admin/analytics"
                    ? "text-light fw-bold fa-beat-fade"
                    : "fa-beat-fade"
                }
              >
                Analytics
              </CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "right" }}>
          <div
            style={{
              padding: "20px 1px",
            }}
          >
            <img
              src={icon}
              width="60"
              height="55"
              className="d-inline-block align-top mx-2"
              alt="E-commerce website logo"
            />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
