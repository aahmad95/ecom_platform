import React from 'react'
import SidebarMenu from "react-bootstrap-sidebar-menu";
import icon from "../logo.svg";



const SideMenu = () => {
  return (
    <div>
      <SidebarMenu>
  <SidebarMenu.Header>
    <SidebarMenu.Brand>
      {/* Your brand icon */}
       <img
                src={icon}
                width="70"
                height="50"
                className="img-fluid"
                alt="E-commerce website logo"
              />
    </SidebarMenu.Brand>

    <SidebarMenu.Toggle />
  </SidebarMenu.Header>

  <SidebarMenu.Body>
    <SidebarMenu.Nav>
      <SidebarMenu.Nav.Link>
        <SidebarMenu.Nav.Icon>
          {/* Menu item icon */}
          
        </SidebarMenu.Nav.Icon>
        <SidebarMenu.Nav.Title>
          {/* Menu item title */}
        </SidebarMenu.Nav.Title>
      </SidebarMenu.Nav.Link>
    <SidebarMenu.Nav/>
    <SidebarMenu.Sub>
      <SidebarMenu.Sub.Toggle>
        <SidebarMenu.Nav.Icon />
        <SidebarMenu.Nav.Title>
          {/* Submenu title */}
        </SidebarMenu.Nav.Title>
      </SidebarMenu.Sub.Toggle>
      <SidebarMenu.Sub.Collapse>
        <SidebarMenu.Nav></SidebarMenu.Nav>
        <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              {/* Submenu item icon */}
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>
              {/* Submenu item title */}
            </SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
      </SidebarMenu.Sub.Collapse>
    </SidebarMenu.Sub>
  </SidebarMenu.Body>
</SidebarMenu>
    </div>
  )
}

export default SideMenu
