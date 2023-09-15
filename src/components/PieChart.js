import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function calculateInjuriesAndFatalities(data) {
  let totalInjuries = 0;
  let totalFatalities = 0;

  data.forEach((item) => {
    totalInjuries +=
      item.CYC_INJD + item.MOTO_INJD + item.PEDS_INJD + item.PERS_INJD;
    totalFatalities +=
      item.CYC_KILL + item.MOTO_KILL + item.PEDS_KILL + item.PERS_KILL;
  });

  return { totalInjuries, totalFatalities };
}

const PieChart = ({ data }) => {
  const { totalInjuries, totalFatalities } =
    calculateInjuriesAndFatalities(data);

  const chartData = {
    labels: ["Fatalities", "Injuries"],
    datasets: [
      {
        label: "No. of victims",
        data: [totalFatalities, totalInjuries],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
