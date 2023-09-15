import React, { useState, useEffect } from "react";
import BarChart from "./components/BarChart";
import Footer from "./components/Footer";

import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

import "./App.css";
import PieChart from "./components/PieChart";

const baseAPIURL = "http://localhost:4000";

export default function App() {
  const [boroughs, setBoroughs] = useState([]);
  const [chosenBorough, setChosenBorough] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [activeYears, setActiveYears] = useState([]); // Initialize as an empty array
  const [activeYear, setActiveYear] = useState("all");

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
      if (activeYear !== "all") {
        console.log("show year specific for the borough");
        axios
          .get(
            `${baseAPIURL}/historic/borough/${chosenBorough}/${activeYear}/summary`
          ) // Enclose activeYear in curly braces
          .then((response) => {
            setSummaryData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("summary query for the borough");
        axios
          .get(`${baseAPIURL}/historic/borough/${chosenBorough}/summary`)
          .then((response) => {
            setSummaryData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      axios
        .get(`${baseAPIURL}/historic/borough/${chosenBorough}/activeYears`)
        .then((response) => {
          setActiveYears(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSummaryData(null); // Reset summaryData if "None" is selected
      setActiveYears([]); // Reset activeYears if "None" is selected
    }
  }, [chosenBorough, activeYear]); // Include activeYear as a dependency

  const handleBoroughChange = (event) => {
    const selectedBorough = event.target.value;
    setChosenBorough(selectedBorough);
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setActiveYear(selectedYear);
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
            onChange={handleBoroughChange}
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
          {chosenBorough !== "NULL" && (
            <select
              className="boroughSelector"
              onChange={handleYearChange}
              value={activeYear}
            >
              <option key="all" value="all">
                All years
              </option>
              {activeYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="col-md-10">
          {chosenBorough !== "NULL" && summaryData !== null ? (
            <>
              <div id="summaryBorough">
                <BarChart data={summaryData} />
              </div>
              <div id="fatalitiesPie">
                <PieChart data={summaryData} />
              </div>
            </>
          ) : (
            <p>PLACEHOLDER</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
