import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // unused, but need this included or "linear" won't be recognised as a valid scale - google fu for this

const BarChart = ({ data }) => {
  // Extract data for the chart
  //   const labels = data.map((item) => `${item.year}-${item.month}`);
  const labels = data.map((item) => `${item.MONTH}-${item.YEAR}`);
  const numColsData = data.map((item) => item.NUM_COLS);

  //why you not showing?
  const numMotoKilled = data.map((item) => item.MOTO_KILL);
  const numCycKilled = data.map((item) => item.CYC_KILL);
  const pedKilled = data.map((item) => item.PEDS_KILL);

  // Chart data configuration
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Collisions",
        data: numColsData,
        yAxisID: "y",
        backgroundColor: "rgba(52, 152, 212, 0.2)",
        borderColor: "rgba(52, 152, 212, 1)",
        borderWidth: 1,
      },
      {
        label: "Number of Motorists Killed",
        data: numMotoKilled,
        yAxisID: "y1",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        borderColor: "rgba(231, 76, 60, 1)",
        borderWidth: 1,
      },
      {
        label: "Number of Cyclists Killed",
        data: numCycKilled,
        yAxisID: "y1",
        backgroundColor: "rgba(46, 204, 113, 0.2)",
        borderColor: "rgba(46, 204, 113, 1)",
        borderWidth: 1,
      },
      {
        label: "Number of Pedestrians Killed",
        data: pedKilled,
        yAxisID: "y1",
        backgroundColor: "rgba(241, 196, 15, 0.2)",
        borderColor: "rgba(241, 196, 15, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true, // Start y-axis at 0 for the first dataset
        title: {
          display: true,
          text: "Number of Collisions", // Y-axis label for the first dataset
        },
      },
      y1: {
        beginAtZero: true, // Start y-axis at 0 for the second dataset
        position: "right", // Position the second y-axis on the right side
        title: {
          display: true,
          text: "Number of Motorists / Peds / Cyclists Killed", // Y-axis label for the second dataset
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
