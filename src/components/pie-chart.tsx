import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
      labels: {
        boxWidth: 10,
        boxHeight: 10,
      },
    },
  },
};
export interface ChartData {
  labels: Array<string>;
  datasets: Array<{
    label: string;
    data: string[];
    backgroundColors: string[];
  }>;
}

export default function DoughnutChart({ data }: { data: ChartData }) {
  return <Doughnut data={data} options={options} />;
}
