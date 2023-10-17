import React from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  let navigate = useNavigate();
  const handleCategory = () => {
    navigate("/admin/category");
  };
  const handleAds = () => {
    navigate("/admin/ads");
  };
  const handleDashboard = () => {
    navigate("/admin/dashboard");
  };
  const handleUsers = () => {
    navigate("/admin/users");
  };
  const handleSellers = () => {
    navigate("/admin/sellers");
  };

  return (
    <>
      <div className="mt-2 mx-3 ">
        <h1 style={{ fontSize: "50px", color: "#9b32e0" }}>
          <b>Admin Page:</b>
        </h1>
      </div>
      {/* <div className="mt-2 mx-3 "></div> */}
      <Stack gap={4} className="mt-5 col-md-5 mx-auto">
        <Button onClick={handleDashboard} variant="outline-info">
          Dashboard
        </Button>

        <Button onClick={handleCategory} variant="outline-info">
          Categories
        </Button>

        <Button onClick={handleUsers} variant="outline-info">
          Users
        </Button>
        <Button onClick={handleSellers} variant="outline-info">
          Sellers
        </Button>
        <Button onClick={handleAds} variant="outline-info">
          Ads
        </Button>
      </Stack>
    </>
  );
};

export default AdminPage;
