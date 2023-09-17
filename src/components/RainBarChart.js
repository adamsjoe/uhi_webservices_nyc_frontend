import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"; // unused, but need this included or "linear" won't be recognised as a valid scale - google fu for this

const RainBarChart = ({ data }) => {
  // Extract data for the chart
  //   const labels = data.map((item) => `${item.year}-${item.month}`);
  const labels = data.map((item) => `${item.DAY}-${item.MONTH}-${item.YEAR}`);
  const rain = data.map((item) => item.PRCP);

  // Chart data configuration
  const chartData = {
    title: "hello",
    labels: labels,
    datasets: [
      {
        label: "Rainfall in inches",
        data: rain,
        yAxisID: "y",
        backgroundColor: "rgba(52, 152, 212, 0.2)",
        borderColor: "rgba(52, 152, 212, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Rain",
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default RainBarChart;
