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
import PieChart from "./components/PieChart";
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

  // holds the data
  const [summaryData, setSummaryData] = useState(null);

  const handleBoroughChange = (event) => {
    setSelectedBorough(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date && latestDate && date.isAfter(latestDate)) {
      // Check if selected date is after the latestDate, we will use this to determine which endpoint to hit,
      // for now, display a dialog
      setOpenModal(true);
    } else {
      // the date is in range of what we have available quickly, so let's retrieve it
      setSelectedMonth(date.month() + 1); // Month is 0-based, so add 1
      setSelectedYear(date.year());
      // setSelectedDay(date.date());
    }
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
    if (
      selectedYear !== null &&
      selectedMonth !== null
      // selectedDay !== null
    ) {
      axios
        .get(
          baseAPIURL +
            // `/historic/borough/${selectedBorough}/${selectedYear}/${selectedMonth}/${selectedDay}`
            `/historic/borough/${selectedBorough}/${selectedYear}/${selectedMonth}`
        )
        .then((response) => {
          setSummaryData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedMonth, selectedYear]);

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
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          <div className="heading">New York Accident Data visualiser</div>
          <hr></hr>
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <div className="boroughSelector">
              {/* <InputLabel id="boroughSelectLabel">
                Select a borough from the dropdown:
              </InputLabel> */}
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
              </>
            )}
          </Grid>

          <Grid item xs={8}>
            <Typography variant="body1">
              {/* {!selectedDate && ( // what the hell is this here for??
                <div id="summaryBorough">
                  <BarChart data={summaryData} />
                </div>
              )} */}
              {selectedDate && summaryData ? (
                <>
                  <div id="summaryBorough">
                    <BarChart data={summaryData} />
                  </div>
                  <div id="fatalitiesPie">
                    <PieChart data={summaryData} />
                  </div>
                  <div id="datablock">
                    <Datablock data={summaryData} />
                  </div>
                  <div id="rainSummary">
                    <RainBarChart data={summaryData} />
                  </div>
                  <div id="1">
                    <TemperatureLineChart data={summaryData} />
                  </div>
                  <div id="2">
                    <WindSpeedScatter data={summaryData} />
                  </div>
                  <div id="3">
                    <FogPieChart data={summaryData} />
                  </div>
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
        <Button onClick={() => setOpenModal(false)} color="primary">
          Close
        </Button>
      </Dialog>
    </LocalizationProvider>
  );
}

export default App;
