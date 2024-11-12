import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDashBoard from "./pages/userDashBoard";
import AdmindashBoard from "./pages/admindashBoard";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserDashBoard />} />
        <Route exact path="/admin" element={<AdmindashBoard />} />
      </Routes>
    </Router>
  );
}
