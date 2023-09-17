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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
// import { baseAPIURL } from "./config/server";

import "./App.css";

import Map from "./components/Map";
import BarsLoader from "./components/BarsLoader";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Footer from "./components/Footer";

const baseAPIURL = "http://localhost:4000";

function App({ children }) {
  // holds the latest and earlies data in the db
  const [earliestDate, setEarliestDate] = useState(null);
  const [latestDate, setLatestDate] = useState(null);
  // holds the date we select
  const [selectedDate, setSelectedDate] = useState(null);
  // track if the modal is open
  const [openModal, setOpenModal] = useState(false);

  // will need the dates in a number format for use with the API, so let's set these up
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  // holds the data
  const [summaryData, setSummaryData] = useState(null);

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
      setSelectedDay(date.date());
    }
  };

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
      selectedMonth !== null &&
      selectedDay !== null
    ) {
      axios
        .get(
          baseAPIURL +
            `/historic/borough/MANHATTAN/${selectedYear}/${selectedMonth}/${selectedDay}`
        )
        .then((response) => {
          setSummaryData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedDay, selectedMonth, selectedYear]);

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
            Please select a date using the picker:
            <div className="datePicker">
              <DatePicker
                minDate={dayjs(earliestDate)}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>
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
