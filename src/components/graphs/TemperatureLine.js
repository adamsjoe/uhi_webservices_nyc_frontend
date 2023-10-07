import React from "react";
import { Line } from "react-chartjs-2";

const TemperatureLineChart = ({ data }) => {
  const labels = data.map((item) => `${item.DAY}-${item.MONTH}-${item.YEAR}`);
  const temp = data.map((item) => item.TEMP);
  const maxTemp = data.map((item) => item.MAX);
  const minTemp = data.map((item) => item.MIN);

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
        label: "Max Temperature",
        data: maxTemp,
        yAxisID: "y",
        fill: false,
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "Min Temperature",
        data: minTemp,
        yAxisID: "y",
        fill: false,
        backgroundColor: "rgba(0, 128, 255, 0.2)",
        borderColor: "rgba(0, 128, 255, 1)",
        borderWidth: 1,
      },
    ],
  };
  return <Line data={chartData} />;
};

export default TemperatureLineChart;
