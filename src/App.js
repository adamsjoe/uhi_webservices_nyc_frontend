import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
// import { BrowserRouter, Link } from "react-router-dom";
import axios from "axios";

import "./App.css";

const baseAPIURL = "http://localhost:4000";

export default function App() {
  const [boroughs, setBoroughs] = useState([]);
  const [chosenBorough, setChosenBorough] = useState("None");

  useEffect(() => {
    axios
      .get(baseAPIURL + "/historic/boroughs")
      .then((response) => {
        setBoroughs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSelectChange = (event) => {
    setChosenBorough(event.target.value);
  };

  return (
    <div className="container">
      New York City Accident Visualiser
      <div className="row">
        <div className="col-md-2">
          Select a borough from the list below:
          <select onChange={handleSelectChange} value={chosenBorough}>
            <option key="NULL" value="NULL">
              Pick from me :)
            </option>
            {boroughs.map((borough) => (
              <option key={borough} value={borough}>
                {borough}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-10">You picked the {chosenBorough} borough</div>
      </div>
    </div>
  );
}
