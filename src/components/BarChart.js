import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // unused, but need this included or "linear" won't be recognised as a valid scale - google fu for this

const BarChart = ({ data }) => {
  // Extract data for the chart
  const labels = data.map((item) => `${item.MONTH}-${item.YEAR}`);
  const numColsData = data.map((item) => item.NUM_COLS);
  const temp = data.map((item) => item.TEMP);

  const numMotoKilled = data.map((item) => item.MOTO_KILL);
  const numCycKilled = data.map((item) => item.CYC_KILL);
  const pedKilled = data.map((item) => item.PEDS_KILL);
  const persKilled = data.map((item) => item.PERS_KILL);

  const cyclistsInjured = data.map((item) => item.CYC_INJD);
  const motoristsInjured = data.map((item) => item.MOTO_INJD);
  const pedestriansInjured = data.map((item) => item.PEDS_INJD);
  const personsInjured = data.map((item) => item.PERS_INJD);

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
        stack: "Stack 0",
      },
      {
        label: "Number of Motorists Killed",
        data: numMotoKilled,
        yAxisID: "y",
        backgroundColor: "rgba(193, 186, 207, 0.2)",
        borderColor: "rgba(193, 186, 207, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Number of Cyclists Killed",
        data: numCycKilled,
        yAxisID: "y",
        backgroundColor: "rgba(216, 182, 184, 0.2)",
        borderColor: "rgba(216, 182, 184, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Number of Pedestrians Killed",
        data: pedKilled,
        yAxisID: "y",
        backgroundColor: "rgba(189, 207, 182, 0.2)",
        borderColor: "rgba(189, 207, 182, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Number of Persons Killed",
        data: persKilled,
        yAxisID: "y",
        backgroundColor: "rgba(207, 191, 182, 0.2)",
        borderColor: "rgba(207, 191, 182, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Number of Cyclists Injured",
        data: cyclistsInjured,
        yAxisID: "y",
        backgroundColor: "rgba(84, 197, 216, 0.2)",
        borderColor: "rgba(84, 197, 216, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Number of Motorists Injured",
        data: motoristsInjured,
        yAxisID: "y",
        backgroundColor: "rgba(207, 182, 193, 0.2)",
        borderColor: "rgba(207, 182, 193, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Number of Pedestrians Injured",
        data: pedestriansInjured,
        yAxisID: "y",
        backgroundColor: "rgba(182, 207, 199, 0.2)",
        borderColor: "rgba(182, 207, 199, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        label: "Number of Persons Injured",
        data: personsInjured,
        yAxisID: "y",
        backgroundColor: "rgba(207, 187, 182, 0.2)",
        borderColor: "rgba(207, 187, 182, 1)",
        borderWidth: 1,
        stack: "Stack 1",
      },
      {
        type: "line",
        label: "Temperature",
        data: temp,
        backgroundColor: "rgba(107, 187, 182, 0.2)",
        // borderColor: "rgba(107, 187, 182, 1)",
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
          text: "Count", // Y-axis label for the first dataset
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default BarChart;
