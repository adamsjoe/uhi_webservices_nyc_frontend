import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const FogPieChart = ({ data }) => {
  // get the elements where fog === 1 or fog === 0
  const noFog = data.filter((item) => item.FOG === 0).length;
  const fogPresent = data.filter((item) => item.FOG === 1).length;

  // get the total of the elements
  const totalCount = data.length;

  // work out percentages
  const noFogPercent = ((noFog / totalCount) * 100).toFixed(2);
  const fogPercent = ((fogPresent / totalCount) * 100).toFixed(2);

  const chartData = {
    labels: ["No Fog", "Fog Recorded"],
    datasets: [
      {
        label: "Percent",
        data: [noFogPercent, fogPercent],
        backgroundColor: [
          "rgba(255, 182, 193, 0.2)",
          "rgba(173, 216, 230, 0.2)",
        ],
        borderColor: ["rgba(255, 182, 193, 1)", "rgba(173, 216, 230, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} key={Math.random()} />;
};

export default FogPieChart;
