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
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      const authToken = localStorage.getItem("token");
      const decoded = jwt_decode(authToken);
      if (!user) {
        setUser(decoded.user);
      }
    }
    setLocation(window.location.pathname);

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
        <CDBSidebarHeader prefix={<i className="fa-solid fa-bars fa-flip"></i>}>
          <h4 className="fa-beat-fade mt-2 fw-bold">Hello {user.username}!</h4>
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
          {user.role === "admin" ? (
            <CDBSidebarMenu>
              <NavLink exact={"true"} as={Link} to="/admin">
                <CDBSidebarMenuItem
                  className={
                    location === "/admin"
                      ? "text-light fw-bold fa-beat-fade"
                      : "fa-beat-fade"
                  }
                  icon="house-user"
                >
                  Admin Home
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact={"true"} as={Link} to="/admin/ads">
                <CDBSidebarMenuItem
                  className={
                    location === "/admin/ads"
                      ? "text-light fw-bold fa-beat-fade"
                      : "fa-beat-fade"
                  }
                  icon="rectangle-ad"
                >
                  Ads
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact={"true"} as={Link} to="/admin/category">
                <CDBSidebarMenuItem
                  icon="icons"
                  className={
                    location === "/admin/category"
                      ? "text-light fw-bold fa-beat-fade"
                      : "fa-beat-fade"
                  }
                >
                  Categories
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact={"true"} as={Link} to="/admin/sellers">
                <CDBSidebarMenuItem
                  icon="shop"
                  className={
                    location?.toString().includes("/admin/sellers")
                      ? "text-light fw-bold fa-beat-fade"
                      : "fa-beat-fade"
                  }
                >
                  Sellers
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact={"true"} as={Link} to="/admin/customers">
                <CDBSidebarMenuItem
                  icon="users-gear"
                  className={
                    location?.toString().includes("/admin/customers")
                      ? "text-light fw-bold fa-beat-fade"
                      : "fa-beat-fade"
                  }
                >
                  Customers
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          ) : (
            <CDBSidebarMenu>
              <NavLink exact={"true"} as={Link} to="/seller/products">
                <CDBSidebarMenuItem
                  icon="shop"
                  className={
                    location?.toString().includes("/seller/product")
                      ? "text-light fw-bold fa-beat-fade"
                      : "fa-beat-fade"
                  }
                >
                  Products
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact={"true"} as={Link} to="/seller/categories">
                <CDBSidebarMenuItem
                  icon="icons"
                  className={
                    location?.toString().includes("/seller/categor")
                      ? "text-light fw-bold fa-beat-fade"
                      : "fa-beat-fade"
                  }
                >
                  Categories
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact={"true"} as={Link} to="/seller/profile">
                <CDBSidebarMenuItem
                  icon="id-card"
                  className={
                    location === "/seller/profile"
                      ? "text-light fw-bold fa-beat-fade"
                      : "fa-beat-fade"
                  }
                >
                  Profile
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          )}
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
