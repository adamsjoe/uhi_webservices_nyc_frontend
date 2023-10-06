import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { translateDay } from "../helpers/translateDay";
import { translateMonth } from "../helpers/translateMonth";

const BarChartModal = ({ open, onClose, clickedData }) => {
  if (!open || clickedData === null) {
    // Modal is not open or clickedData is null, do not render the modal
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
          backgroundColor: "rgba(255, 255, 255, 0.75);",
        },
      }}
    >
      <div className="modal-container">
        <Typography id="modal-title" variant="h1">
          Information for {clickedData.COLLISION_DATE}
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          <div>
            <p>
              During {translateDay(clickedData.WEEKDAY)}, &nbsp;
              {translateMonth(clickedData.MONTH)} {clickedData.DAY},{" "}
              {clickedData.YEAR} in {clickedData.BOROUGH} there were: <br />
            </p>
            {/* For example, clickedData.DAY, clickedData.NUM_COLS, etc. */}
          </div>
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default BarChartModal;
