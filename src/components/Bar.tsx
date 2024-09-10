"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  AMStatus: "Regular" | "Temporary";
  stage:
    | "GKConnected"
    | "DMConnected"
    | "DealCreated"
    | "Quoted"
    | "Docusigned"
    | "Contracted"
    | "ARS"
    | "unknown";
  assessment: "good" | "neutral" | "bad";
}

interface BarChartProps {
  data: DataPoint[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const [assessment, setAssessment] = useState(false);
  const [divisionFactor, setDivisionFactor] = useState("AMStatus");
  const stages = [
    "unknown",
    "ARS",
    "GKConnected",
    "DMConnected",
    "DealCreated",
    "Quoted",
    "Docusigned",
    "Contracted",
  ];

  const assessments = ["good", "neutral", "bad"];
  const amStatuses = ["Regular", "Temporary"];

  const datasets = amStatuses.map((status) => {
    const regularCount = data.filter((d) => d.AMStatus === "Regular").length;
    const temporaryCount = data.filter(
      (d) => d.AMStatus === "Temporary"
    ).length;
    return {
      label: status,
      data: assessment
        ? assessments.map(
            (ass) =>
              data.filter((d) => d.AMStatus === status && d.assessment === ass)
                .length /
              (divisionFactor === "AMStatus"
                ? status === "Regular"
                  ? regularCount
                  : temporaryCount
                : data.filter((d) => d.assessment === ass).length)
          )
        : stages.map(
            (stage) =>
              data.filter((d) => d.AMStatus === status && d.stage === stage)
                .length /
              (divisionFactor === "AMStatus"
                ? status === "Regular"
                  ? regularCount
                  : temporaryCount
                : data.filter((d) => d.stage === stage).length)
          ),
      backgroundColor:
        status === "Regular" ? "hsl(0, 100%, 50%)" : "hsl(100, 100%, 50%)",
      borderWidth: 1,
    };
  });

  const chartData = {
    labels: assessment ? assessments : stages,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "AMStatus and Stage Bar Chart",
      },
    },
  };

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setAssessment((prev) => !prev)}
        className="border border-white"
      >
        {assessment ? "assessment" : "stage"}
      </button>
      <button
        onClick={() =>
          setDivisionFactor((prev) => (prev === "AMStatus" ? "" : "AMStatus"))
        }
        className="border border-white"
      >
        {divisionFactor === "AMStatus"
          ? "Divide By Entire Row Count"
          : "Divide by Same Stage Count"}
      </button>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
