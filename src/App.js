import React, { useState, useEffect } from "react";
import BarChart from "./components/BarChart";
import Footer from "./components/Footer";

import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

import "./App.css";

const baseAPIURL = "http://localhost:4000";

export default function App() {
  const [boroughs, setBoroughs] = useState([]);
  const [chosenBorough, setChosenBorough] = useState(null);
  const [summaryData, setSummaryData] = useState(null);

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

  useEffect(() => {
    if (chosenBorough !== "NULL") {
      axios
        .get(`${baseAPIURL}/historic/borough/${chosenBorough}/summary`)
        .then((response) => {
          setSummaryData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSummaryData(null); // Reset summaryData if "None" is selected
    }
  }, [chosenBorough]); // Include chosenBorough as a dependency

  const handleSelectChange = (event) => {
    const selectedBorough = event.target.value;
    setChosenBorough(selectedBorough);
  };

  return (
    <div className="container">
      <div className="heading">New York City Accident Visualizer</div>
      <hr></hr>
      <div className="row">
        <div className="col-md-2">
          Select a borough from the list below:
          <select
            className="boroughSelector"
            onChange={handleSelectChange}
            value={chosenBorough}
          >
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

        <div className="col-md-10">
          {chosenBorough !== "NULL" && summaryData !== null ? (
            <BarChart data={summaryData} />
          ) : (
            <p>PLACEHOLDER</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
