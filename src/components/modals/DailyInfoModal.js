import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Map from "../Map";
import { translateDay } from "../../helpers/translateDay";
import { translateMonth } from "../../helpers/translateMonth";
import { getLargest, getLowest } from "../../helpers/getMaxMinFromData";

// import SunnyAnimation from "../weatherAnims/sunny/sunny";
// import FogAnimation from "../weatherAnims/fog/fog";

const DailyInfoModal = ({ open, onClose, clickedData, maxTemp, minTemp }) => {
  const [foggy, setFoggy] = useState(false);
  const [goodDay, setGoodDay] = useState(true);
  const [isWarmest, setIsWarmest] = useState(false);
  const [isColdest, setIsColdest] = useState(false);

  useEffect(() => {
    if (clickedData) {
      setFoggy(clickedData.FOG === 1);
    }
  }, [clickedData]);

  useEffect(() => {
    if (clickedData) {
      if (
        clickedData.CYC_KILL === 0 &&
        clickedData.MOTO_KILL === 0 &&
        clickedData.PEDS_KILL === 0 &&
        clickedData.PERS_KILL === 0
      ) {
        setGoodDay(true);
      } else {
        setGoodDay(false);
      }
    }
  }, [clickedData]);

  useEffect(() => {
    if (maxTemp && clickedData) {
      clickedData.TEMP === maxTemp ? setIsWarmest(true) : setIsWarmest(false);
    }
  }, [clickedData, maxTemp]);

  useEffect(() => {
    if (minTemp && clickedData) {
      clickedData.TEMP === minTemp ? setIsColdest(true) : setIsColdest(false);
    }
  }, [clickedData, minTemp]);

  if (!open || clickedData === null) {
    // Modal is not open or clickedData is null, do not show the modal
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="Detailed Information for day"
      aria-describedby="Contains specific information for the day"
      sx={{
        "& .MuiModal-backdrop": {
          backgroundColor: "rgba(0, 0, 0, 0.75);",
        },
      }}
    >
      <div className="modal-container">
        <Typography id="modal-title" variant="h1">
          Information for {clickedData.COLLISION_DATE}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div style={{ paddingRight: "80px" }}>
                <p style={{ paddingLeft: "20px" }}>
                  {foggy === true ? "Foggy" : "No fog"}
                  <br />
                  During {translateDay(clickedData.WEEKDAY)}, &nbsp;
                  {translateMonth(clickedData.MONTH)} {clickedData.DAY},{" "}
                  {clickedData.YEAR} in {clickedData.BOROUGH} there were: <br />
                  <ul>
                    <li>{clickedData.NUM_COLS} Collisions</li>
                    <li>{clickedData.CYC_KILL} Cyclists Killed</li>
                    <li>{clickedData.CYC_INJD} Cyclists Injured</li>
                    <li>{clickedData.MOTO_KILL} Motorists Killed</li>
                    <li>{clickedData.MOTO_INJD} Motorists Injured</li>
                    <li>{clickedData.PEDS_KILL} Pedestrians Killed</li>
                    <li>{clickedData.PEDS_INJD} Pedestrians Injured</li>
                    <li>{clickedData.PERS_KILL} Persons Killed</li>
                    <li>{clickedData.PERS_INJD} Persons Injured</li>
                  </ul>
                  {goodDay === true ? "No deaths today!!" : "People died"}
                  {isWarmest === true
                    ? "Today was the warmest day this month"
                    : ""}
                  {isColdest === true
                    ? "Today was the coldest day this month"
                    : ""}
                  {/* <div className="weather">
                    <SunnyAnimation />
                  </div> */}
                </p>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Map pathId={clickedData.BOROUGH} />
            </Grid>
          </Grid>
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default DailyInfoModal;
