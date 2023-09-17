import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function calculateInjuriesAndFatalities(data) {
  let totalCyclistsInjuries = 0;
  let totalMotoristInjuries = 0;
  let totalPedestrianInjuries = 0;
  let totalPersonInjuries = 0;

  let totalCyclistsFatalities = 0;
  let totalMotoristFatalities = 0;
  let totalPedestrianFatalities = 0;
  let totalPersonFatalities = 0;

  data.forEach((item) => {
    totalCyclistsInjuries += item.CYC_INJD;
    totalMotoristInjuries += item.MOTO_INJD;
    totalPedestrianInjuries += item.PEDS_INJD;
    totalPersonInjuries += item.PERS_INJD;

    totalCyclistsFatalities += item.CYC_KILL;
    totalMotoristFatalities += item.MOTO_KILL;
    totalPedestrianFatalities += item.PEDS_KILL;
    totalPersonFatalities += item.PERS_KILL;
  });

  return {
    totalCyclistsInjuries,
    totalMotoristInjuries,
    totalPedestrianInjuries,
    totalPersonInjuries,
    totalCyclistsFatalities,
    totalMotoristFatalities,
    totalPedestrianFatalities,
    totalPersonFatalities,
  };
}

const PieChart = ({ data }) => {
  const {
    totalCyclistsInjuries,
    totalMotoristInjuries,
    totalPedestrianInjuries,
    totalPersonInjuries,
    totalCyclistsFatalities,
    totalMotoristFatalities,
    totalPedestrianFatalities,
    totalPersonFatalities,
  } = calculateInjuriesAndFatalities(data);

  const chartData = {
    labels: [
      "Cyclists Injuries",
      "Motorist Injuries",
      "Pedestrian Injuries",
      "Person Injuries",
      "Cyclists Fatalities",
      "Motorist Fatalities",
      "Pedestrian Fatalities",
      "Person Fatalities",
    ],
    datasets: [
      {
        label: "Number",
        data: [
          totalCyclistsInjuries,
          totalMotoristInjuries,
          totalPedestrianInjuries,
          totalPersonInjuries,
          totalCyclistsFatalities,
          totalMotoristFatalities,
          totalPedestrianFatalities,
          totalPersonFatalities,
        ],
        backgroundColor: [
          "rgba(255, 182, 193, 0.2)",
          "rgba(173, 216, 230, 0.2)",
          "rgba(152, 251, 152, 0.2)",
          "rgba(221, 160, 221, 0.2)",
          "rgba(255, 255, 224, 0.2)",
          "rgba(255, 218, 185, 0.2)",
          "rgba(230, 230, 250, 0.2)",
          "rgba(189, 252, 201, 0.2)",
        ],
        borderColor: [
          "rgba(255, 182, 193, 1)",
          "rgba(173, 216, 230, 1)",
          "rgba(152, 251, 152, 1)",
          "rgba(221, 160, 221, 1)",
          "rgba(255, 255, 224, 1)",
          "rgba(255, 218, 185, 1)",
          "rgba(230, 230, 250, 1)",
          "rgba(189, 252, 201, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie
      data={chartData}
      key={Math.random()}
      width={"50px"}
      // height={"50px"}
      // options={{ maintainAspectRatio: true }}
    />
  );
};

export default PieChart;
