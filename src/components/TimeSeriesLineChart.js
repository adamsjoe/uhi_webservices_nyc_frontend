import React from "react";
import { Line } from "react-chartjs-2";

const TimeSeriesLineChart = ({ data }) => {
  const labels = data.map((item) => `${item.DAY}-${item.MONTH}-${item.YEAR}`);
  const fogPresence = data.map((item) => item.FOG); // 0 for no fog, 1 for fog
  const visibility = data.map((item) => item.VISIB); // Visibility in meters

  const chartData = {
    labels: labels,
    datasets: [
      {
        type: "bar",
        label: "Fog",
        data: fogPresence,
        yAxisID: "y2",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderColor: "rgba(0, 255, 0, 1)",
      },
      {
        type: "line",
        tension: 0.4,
        label: "Visibilty",
        data: visibility,
        yAxisID: "y1",
        fill: false,
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
    ],
  };

  const options = {
    scales: {
      y1: {
        type: "linear",
        position: "left",
      },
      y2: {
        // Custom y-axis for the bar chart
        type: "linear",
        position: "right",
        suggestedMin: 0,
        suggestedMax: 1,
        ticks: {
          callback: (value) => (value === 0 ? "No Fog" : "Fog recorded"),
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default TimeSeriesLineChart;
