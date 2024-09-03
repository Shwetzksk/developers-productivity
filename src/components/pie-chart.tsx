import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartData } from "./type.ts";

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

export default function DoughnutChart({ data }: { data: ChartData }) {
  return <Doughnut data={data} options={options} />;
}
