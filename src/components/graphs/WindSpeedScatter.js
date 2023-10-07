import React from "react";
import { Scatter } from "react-chartjs-2";

const WindSpeedScatter = ({ data }) => {
  const scatterData = data.map((item) => ({
    x: item.TEMP,
    y: item.WDSP,
    label: `${item.DAY}-${item.YEAR}`,
  }));

  const chartData = {
    datasets: [
      {
        label: "Temperature vs Wind Speed",
        data: scatterData,
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "rgba(0, 255, 0, 0.7)",
        pointBorderColor: "rgba(0, 255, 0, 1)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Temperature (°F)",
        },
      },
      y: {
        type: "linear",
        title: {
          display: true,
          text: "Wind Speed (mph)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.data[context.dataIndex].label;
            return label;
          },
        },
      },
    },
  };

  return <Scatter data={chartData} options={chartOptions} />;
};

export default WindSpeedScatter;
