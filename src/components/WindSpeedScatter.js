import React from "react";
import { Scatter } from "react-chartjs-2";

const WindSpeedScatter = ({ data }) => {
  const labels = data.map((item) => `${item.MONTH}-${item.YEAR}`);
  const temp = data.map((item) => item.TEMP);
  const windspeed = data.map((item) => item.WDSP);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        data: temp,
        yAxisID: "y",
        fill: false,
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderColor: "rgba(0, 255, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Windspeed",
        data: windspeed,
        yAxisID: "y",
        fill: false,
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
      },
    ],
  };
  return <Scatter data={chartData} />;
};

export default WindSpeedScatter;
