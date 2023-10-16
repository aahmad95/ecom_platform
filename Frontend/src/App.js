import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <div className="conatiner">
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route exact path="/navbar" element={<Navbar />} />

            {/* <Route exact path="/login" element={<Login />} />

            <Route exact path="/signup" element={<Signup />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
