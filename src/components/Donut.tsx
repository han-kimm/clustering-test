import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChart = (props: { count: number; entire: number }) => {
  const { count, entire } = props;
  const data = {
    labels: ["Violated", "Not Violated"],
    datasets: [
      {
        data: [count, entire - count],
        backgroundColor: ["#ef4444", "#10b981"],
        hoverBackgroundColor: ["#dc2626", "#059669"],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 20,
        },
        formatter: (value: number) => `${value}`,
      },
    },
  };

  // @ts-ignore
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
