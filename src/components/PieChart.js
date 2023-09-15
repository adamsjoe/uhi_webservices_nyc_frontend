import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

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
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const { totalInjuries, totalFatalities } =
      calculateInjuriesAndFatalities(data);

    const pieData = {
      labels: ["Injuries", "Fatalities"],
      datasets: [
        {
          data: [totalInjuries, totalFatalities],
          backgroundColor: ["#36A2EB", "#FF6384"],
        },
      ],
    };

    new Chart(ctx, {
      type: "pie",
      data: pieData,
    });
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PieChart;
