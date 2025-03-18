import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/DashBoard";
import Budgets from "./pages/Budgets";
import Expenses from "./pages/Expenses";
import Balance from "./pages/Balance";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
