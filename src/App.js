import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Link } from "react-router-dom";

import "./App.css";

export default function App() {
  const [boroughs, setBoroughs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/historic/boroughs", {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBoroughs(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      New York City Accident Visualiser
      <div className="row">
        <div className="col-md-4">Select a borough from the list below:</div>
        <div className="col-md-8">DATA</div>
      </div>
    </div>
  );
}
