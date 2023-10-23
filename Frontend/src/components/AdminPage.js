// import "./AdminPage.css";
import React from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";

import { Link, useNavigate } from "react-router-dom";

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
      <div class="container">
        {/* <div className="mt-2 mx-3 ">
        <h1 style={{ fontSize: "50px", color: "#9b32e0" }}>
          <b>Admin Page:</b>
        </h1>
      </div>
      {/* <div className="mt-2 mx-3 "></div> 
      <Stack gap={4} className="mt-5 col-md-4 mx-auto">
        <Button
          onClick={handleDashboard}
          variant="outline-info p-2 fw-bold fs-2 shadow-lg"
        >
          Dashboard
        </Button>

        <Button
          onClick={handleCategory}
          variant="outline-info p-2 fw-bold fs-2 shadow-lg"
        >
          Categories
        </Button>

        <Button
          onClick={handleUsers}
          variant="outline-info p-2 fw-bold fs-2 shadow-lg"
        >
          Users
        </Button>
        <Button
          onClick={handleSellers}
          variant="outline-info p-2 fw-bold fs-2 shadow-lg"
        >
          Sellers
        </Button>
        <Button
          onClick={handleAds}
          variant="outline-info p-2 fw-bold fs-2 shadow-lg"
        >
          Ads
        </Button>
      </Stack> */}

        <div class="sidebar1">
          <ul>
            <li>
              <a href="#">
                <i class="fas fa-clinic-medical"></i>
                <div class="title">Virtual Therapy</div>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fas fa-th-large "></i>
                <div class="title">Dashboard</div>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fas fa-stethoscope "></i>
                <div class="title">Appointements</div>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fas fa-user-md "></i>
                <div class="title">Doctors</div>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fas fa-puzzle-piece "></i>
                <div class="title">Departments</div>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fas fa-cog "></i>
                <div class="title">Settings</div>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fas fa-question"></i>
                <div class="title">Help</div>
              </a>
            </li>
          </ul>
        </div>

        <div class="main1">
          <div class="topbar1">
            <div class="search1">
              <input type="search" name="search" placeholder="search here" />
              <label for="search">
                <i class="fas fa-search "></i>
              </label>
            </div>
            <div class="notification1">
              <i class="fas fa-bell "></i>

              <div class="profilepic1">
                <img src="/download.jpeg" alt="profile" />
              </div>
            </div>
          </div>

          <div class="cards">
            <div class="card">
              <div class="card-content">
                <div class="number1">67</div>
                <div class="card-name">Appointements</div>
              </div>
              <div class="icon-box1">
                <i class="fas fa-briefcase-medical "></i>
              </div>
            </div>

            <div class="card">
              <div class="card-content">
                <div class="number1">105</div>
                <div class="card-name">New Patients</div>
              </div>
              <div class="icon-box1">
                <i class="fas fa-frown"></i>
              </div>
            </div>
            <div class="card">
              <div class="card-content">
                <div class="number1">8</div>
                <div class="card-name">Consultants</div>
              </div>
              <div class="icon-box1">
                <i class="fas fa-user"></i> <i class="fas fa-user"></i>
              </div>
            </div>
          </div>

          <div class="tables">
            <div class="last-appointments">
              <div class="heading">
                <h2>Last Appointements</h2>
                <a href="#" class="btn">
                  View All
                </a>
              </div>

              <table class="appointments">
                <thead>
                  <td>Name</td>
                  <td>Psychologist</td>
                  <td>Condition</td>
                  <td>Actions</td>
                </thead>

                <tbody>
                  <tr>
                    <td>Daniel</td>
                    <td>Dr.Qasim</td>
                    <td>depression</td>
                    <td>
                      <i class="fas fa-eye"></i>
                      <i class="fas fa-edit"></i>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>

                  <tr>
                    <td>Daniel</td>
                    <td>Dr.Qasim</td>
                    <td>depression</td>
                    <td>
                      <i class="fas fa-eye"></i>
                      <i class="fas fa-edit"></i>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>

                  <tr>
                    <td>Daniel</td>
                    <td>Dr.Qasim</td>
                    <td>depression</td>
                    <td>
                      <i class="fas fa-eye"></i>
                      <i class="fas fa-edit"></i>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>

                  <tr>
                    <td>Daniel</td>
                    <td>Dr.Qasim</td>
                    <td>depression</td>
                    <td>
                      <i class="fas fa-eye"></i>
                      <i class="fas fa-edit"></i>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>Daniel</td>
                    <td>Dr.Qasim</td>
                    <td>depression</td>
                    <td>
                      <i class="fas fa-eye"></i>
                      <i class="fas fa-edit"></i>
                      <i class="fas fa-trash-alt"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="doctor-visiting">
              <div class="heading">
                <h2>Doctor Visiting</h2>
                <a href="#" class="btn">
                  View All
                </a>
              </div>

              <table class="visiting">
                <thead>
                  <td>Photo</td>
                  <td>Name</td>
                  <td>Visit time</td>
                  <td>Detail</td>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="img-box-small">
                        <img src="/download (1).jpeg" alt="doctor-profile" />
                      </div>
                    </td>
                    <td>Momina</td>
                    <td>16.00</td>
                    <td>
                      {" "}
                      <i class="fas fa-eye"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="img-box-small">
                        <img src="/download (2).jpeg" alt="doctor-profile" />
                      </div>
                    </td>
                    <td>Momina</td>
                    <td>16.00</td>
                    <td>
                      {" "}
                      <i class="fas fa-eye"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="img-box-small">
                        <img src="/OIP.jpeg" alt="doctor-profile" />
                      </div>
                    </td>
                    <td>Momina</td>
                    <td>16.00</td>
                    <td>
                      {" "}
                      <i class="fas fa-eye"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="img-box-small">
                        <img src="/OIP (1).jpeg" alt="doctor-profile" />
                      </div>
                    </td>
                    <td>Momina</td>
                    <td>16.00</td>
                    <td>
                      {" "}
                      <i class="fas fa-eye"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
