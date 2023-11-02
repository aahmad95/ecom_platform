import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import icon from "../../logo.svg";

const Sidebar = () => {
    const token=localStorage.getItem("token")
  const decoded=jwt_decode(token);
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
          <CDBSidebar textColor="#1ab5e9" backgroundColor="linear-gradient( 160.1deg,  rgba(151, 17, 172, 0.94) 10.2%, rgb(26, 93, 194) 77.3% )" >
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <Link to="/admin" className="text-decoration-none fs-3" style={{ color: 'inherit' }}>
                Hello {decoded.user.username}!
              </Link>
            </CDBSidebarHeader>
    
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact as={Link} to="/admin/ads" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="rectangle-ad">Ads</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact as={Link} to="/admin/category" target="_blank" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="icons">Categories</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact as={Link} to="/admin/customers" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="users-gear">Customers</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact as={Link} to="/admin/sellers" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="shop">Shopkeepers</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact as={Link} to="/admin/analytics" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
                </NavLink>
    
                
              </CDBSidebarMenu>
            </CDBSidebarContent>
    
            <CDBSidebarFooter style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '20px 5px',
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