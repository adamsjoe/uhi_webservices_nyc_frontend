import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
// import { baseAPIURL } from "./config/server";

import "./App.css";

import Map from "./components/Map";
import BarsLoader from "./components/BarsLoader";
import BarChart from "./components/BarChart";
import RainBarChart from "./components/RainBarChart";
import TemperatureLineChart from "./components/TemperatureLine";
import WindSpeedScatter from "./components/WindSpeedScatter";
import FogPieChart from "./components/FogPieChart";
import TimeSeriesLineChart from "./components/TimeSeriesLineChart";
import Datablock from "./components/Datablock";
import Footer from "./components/Footer";

const baseAPIURL = "http://localhost:4000";

function App({ children }) {
  const [boroughs, setBoroughs] = useState([]); // this stores the list of boroughs
  const [selectedBorough, setSelectedBorough] = useState("MANHATTAN"); // this is the borough selected by the dropdown
  const [earliestDate, setEarliestDate] = useState(null); // holds the latest and earliest data in the db
  const [latestDate, setLatestDate] = useState(null); // holds the date we select
  const [selectedDate, setSelectedDate] = useState(null); // holds the date we picked on the datepicker
  const [openModal, setOpenModal] = useState(false); // track if the modal is open

  // will need the dates in a number format for use with the API, so let's set these up
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  // const [selectedDay, setSelectedDay] = useState(null);

  // loading state for the live data endpoint - which is a tad slow
  const [isLoadingLiveData, setIsLoadingLiveData] = useState(false);

  // holds the data
  const [summaryData, setSummaryData] = useState(null);

  const handleBoroughChange = (event) => {
    setSelectedBorough(event.target.value);
  };

  const handleDateChange = async (date) => {
    setSelectedDate(date);

    // Check if selected date is after the latestDate, and decide whether to fetch live or historic data
    if (date && latestDate && date.isAfter(latestDate)) {
      if (!isLoadingLiveData) {
        // Set isLoadingLiveData to true when fetching live data
        setIsLoadingLiveData(true);

        // Fetch live data
        try {
          const response = await axios.get(
            baseAPIURL +
              `/liveData/borough/${selectedBorough}/${selectedYear}/${selectedMonth}`
          );
          setSummaryData(response.data);
        } catch (error) {
          console.error(error);
        } finally {
          // Close the modal and set isLoadingLiveData to false
          setOpenModal(false);
          setIsLoadingLiveData(false);
        }
      }
    } else {
      // Fetch historic data
      try {
        const response = await axios.get(
          baseAPIURL +
            `/historic/borough/${selectedBorough}/${selectedYear}/${selectedMonth}`
        );
        setSummaryData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const collatedAvailableDates = {
    first: earliestDate,
    last: latestDate,
  };

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
    axios
      .get(baseAPIURL + "/historic/getMinDate")
      .then((response) => {
        setEarliestDate(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(baseAPIURL + "/historic/getMaxDate")
      .then((response) => {
        setLatestDate(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Ensure selectedYear and selectedMonth are not null
    if (selectedYear !== null && selectedMonth !== null) {
      // Check if selected date is after the latestDate
      if (selectedDate && latestDate && selectedDate.isAfter(latestDate)) {
        // Set isLoadingLiveData to true while fetching /liveData
        setIsLoadingLiveData(true);
      } else {
        // Set isLoadingLiveData to false since we're not fetching /liveData
        setIsLoadingLiveData(false);
      }

      // Fetch data based on the selected date
      if (openModal === true) {
        // this is the data which is outside the mongo stored data
        axios
          .get(
            baseAPIURL +
              `/liveData/borough/${selectedBorough}/${selectedYear}/${selectedMonth}`
          )
          .then((response) => {
            setSummaryData(response.data);
            setIsLoadingLiveData(false); // Data has been fetched, set isLoadingLiveData to false
          })
          .catch((error) => {
            console.error(error);
            setIsLoadingLiveData(false); // Error occurred, set isLoadingLiveData to false
          });
      } else {
        axios
          .get(
            baseAPIURL +
              `/historic/borough/${selectedBorough}/${selectedYear}/${selectedMonth}`
          )
          .then((response) => {
            setSummaryData(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [selectedBorough, selectedMonth, selectedYear, selectedDate, openModal]);

  // Render a loading message if earliestDate is still null
  if (earliestDate === null) {
    return (
      <div className="loading">
        <BarsLoader />
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="x1">
        <Typography variant="h4" gutterBottom>
          <div className="heading">New York Accident Data visualizer</div>
          <hr></hr>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <div className="selectorContainer">
              <div className="boroughSelector">
                <InputLabel id="boroughSelectLabel">
                  Select a borough from the dropdown:
                </InputLabel>
                <Select
                  label="Selected"
                  value={selectedBorough}
                  onChange={handleBoroughChange}
                >
                  {boroughs.map((borough) => (
                    <MenuItem key={borough} value={borough}>
                      {borough}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              {selectedBorough.length > 0 && (
                <>
                  <div className="datePicker">
                    <DatePicker
                      inputFormat="yyyy-MM"
                      views={["year", "month"]}
                      label="Month and Year"
                      minDate={dayjs(earliestDate)}
                      value={selectedDate}
                      onChange={handleDateChange}
                      renderInput={(params) => (
                        <TextField {...params} helperText={null} />
                      )}
                    />
                  </div>
                </>
              )}
            </div>
          </Grid>

          <Grid item xs={9}>
            <Typography variant="body1">
              {isLoadingLiveData ? (
                <div className="loading">
                  {/* You can customize this loading indicator */}
                  <BarsLoader />
                  <p>Loading live data...</p>
                </div>
              ) : selectedDate && summaryData ? (
                <>
                  <Grid xs={12} md={12}>
                    <div id="datablock">
                      <Datablock data={summaryData} />
                    </div>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <div
                        id="summaryBorough"
                        style={{ width: "100%", height: "400px" }}
                      >
                        <BarChart data={summaryData} />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        id="rainSummary"
                        style={{ width: "100%", height: "400px" }}
                      >
                        <RainBarChart data={summaryData} />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        id="tempData"
                        style={{ width: "100%", height: "400px" }}
                      >
                        <TemperatureLineChart data={summaryData} />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        id="windSpeed"
                        style={{ width: "100%", height: "400px" }}
                      >
                        <WindSpeedScatter data={summaryData} />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        id="fogTime"
                        style={{ width: "100%", height: "400px" }}
                      >
                        <TimeSeriesLineChart data={summaryData} />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div
                        id="fogChart"
                        style={{ width: "100%", height: "400px" }}
                      >
                        <FogPieChart data={summaryData} />
                      </div>
                    </Grid>
                  </Grid>
                </>
              ) : (
                <div>No data available</div>
              )}
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Modal to display if selected date is greater than latestDate */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Selected Date Exceeds Latest Date</DialogTitle>
        <DialogContent>
          The date you selected is greater than the latest available date.{" "}
          <br />
          We will need to do some more <b>fancy</b> data picking for you, this
          may take a moment.
          <br />
          <br /> Hang on
        </DialogContent>
      </Dialog>
      <Footer data={collatedAvailableDates} />
    </LocalizationProvider>
  );
}

export default App;
