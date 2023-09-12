import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

import Map2 from "./components/Map";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Stepper from "./components/Stepper";

import "./App.css";
import NavBar from "./components/Navbar";

export default function App() {
  return (
    <div id="App">
      <div id="page-wrap">
        <NavBar />
        <Stepper />
        <Map2 />
        <Footer />
      </div>
    </div>
  );
}
