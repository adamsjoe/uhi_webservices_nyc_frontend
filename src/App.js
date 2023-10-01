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
import SendIcon from "@mui/icons-material/Send";
import { DatePicker } from "@mui/x-date-pickers";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
// import { baseAPIURL } from "./config/server";

import "./App.css";

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

function App() {
  const [boroughs, setBoroughs] = useState([]); // this stores the list of boroughs
  const [selectedBorough, setSelectedBorough] = useState("MANHATTAN"); // this is the borough selected by the dropdown, use MANHATTAN as default
  const [earliestDate, setEarliestDate] = useState(null); // holds the earliest date in the mongo db
  const [latestDate, setLatestDate] = useState(null); // holds the latest date in the mongo db
  const [selectedDate, setSelectedDate] = useState(null); // holds the date we picked on the datepicker
  const [openModal, setOpenModal] = useState(false); // track if the modal is open

  const [lookForLiveData, setLookForLiveData] = useState(false); // do we need to go look for live data?

  // will need the month and year in a number format for use with the API, so let's set these up
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // holds the data
  const [summaryData, setSummaryData] = useState(null);

  // handle when the user changes the borough via the dropdown
  const handleBoroughChange = (event) => {
    setSelectedBorough(event.target.value);
  };

  // handle changing the date - this is where we decide which endpoint to hit
  const handleDateChange = async (date) => {
    setSelectedDate(date);
    setSelectedMonth(date.month() + 1); // Month is 0-based, so add 1
    setSelectedYear(date.year());
  };

  const collatedAvailableDates = {
    first: earliestDate,
    last: latestDate,
  };

  // update the date whenever selectedDate changes
  useEffect(() => {
    console.log(`selectedDate has changed to: ${selectedDate}`);
    setSelectedDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    // Define an array of API endpoints to fetch data from
    const endpoints = [
      "/historic/boroughs",
      "/historic/getMinDate",
      "/historic/getMaxDate",
    ];

    // Define an array to store the corresponding state setters
    const stateSetters = [setBoroughs, setEarliestDate, setLatestDate];

    // Loop through the endpoints and make API requests
    endpoints.forEach((endpoint, index) => {
      axios
        .get(baseAPIURL + endpoint)
        .then((response) => {
          // Use the appropriate state setter based on the index
          stateSetters[index](response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }, []);

  // Render a loading message if earliestDate is still null
  if (earliestDate === null) {
    return (
      <div className="loading">
        <BarsLoader />
      </div>
    );
  }

  const handleFetchingData = async () => {
    console.log("fetch data");
    if (selectedDate && latestDate && selectedDate.isAfter(latestDate)) {
      console.log("we will use live data");
      setOpenModal(true);
      const response = await axios
        .get(
          baseAPIURL +
            `/liveData/borough/${selectedBorough}/${selectedYear}/${selectedMonth}`
        )
        .then((response) => {
          // Hide the modal after the data is fetched
          setOpenModal(false);
          setSummaryData(response.data);
        });
    } else {
      console.log("we will use historic data");
      const response = await axios
        .get(
          baseAPIURL +
            `/historic/borough/${selectedBorough}/${selectedYear}/${selectedMonth}`
        )
        .then((response) => {
          setSummaryData(response.data);
        });
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="x1">
        <Typography variant="h4" gutterBottom>
          <div className="heading">New York Accident Data visualiser</div>
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
                  // labelId="boroughSelectLabel"
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
                  <div className="getData">
                    <Button
                      variant="outlined"
                      endIcon={<SendIcon />}
                      disabled={selectedMonth === null} // disable if month is not set
                      onClick={handleFetchingData}
                    >
                      Get Data
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Grid>

          <Grid item xs={9}>
            <Typography variant="body1">
              {selectedDate && summaryData ? (
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
