import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const Sidebar = () => {
    const token=localStorage.getItem("token")
  const decoded=jwt_decode(token);
    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
          <CDBSidebar textColor="#fff" backgroundColor="purple">
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href="/" className="text-decoration-none fs-3" style={{ color: 'inherit' }}>
                Hello {decoded.user.username}!
              </a>
            </CDBSidebarHeader>
    
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <NavLink exact to="/admin/ads" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="rectangle-ad">Ads</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/category" target="_blank" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="icons">Categories</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/customers" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="users-gear">Customers</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/sellers" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="shop">Shopkeepers</CDBSidebarMenuItem>
                </NavLink>
                <NavLink exact to="/admin/analytics" activeClassName="activeClicked">
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
                Sidebar Footer
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
      );
    };
    

export default Sidebar;