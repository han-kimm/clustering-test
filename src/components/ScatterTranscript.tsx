"use client";

import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend);

function ScatterTranscript({
  data,
}: {
  data: {
    x: number;
    y: number;
    group: string;
    text: string;
  }[];
}) {
  if (!data) {
    return null;
  }

  // 그룹별로 데이터 정리
  const groupedData = data.reduce((acc, curr) => {
    if (!acc[curr.group]) {
      acc[curr.group] = [];
    }
    acc[curr.group].push({
      x: curr.x,
      y: curr.y,
      text: curr.text,
    });
    return acc;
  }, {} as Record<string, { x: number; y: number; text: string }[]>);

  // datasets 구조 생성
  const datasets = {
    datasets: Object.entries(groupedData).map(([group, points]) => ({
      label: group,
      data: points,
      backgroundColor:
        group === "group1"
          ? "rgba(255, 99, 132, 0.5)"
          : "rgba(53, 162, 235, 0.5)", // 그룹별 다른 색상
      borderColor:
        group === "group1" ? "rgba(255, 99, 132, 1)" : "rgba(53, 162, 235, 1)",
      pointRadius: 6,
    })),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "white",
          lineWidth: 0.5,
        },
        ticks: {
          color: "white", // x축 눈금 텍스트 색상
        },
      },
      y: {
        grid: {
          color: "white",
          lineWidth: 0.5,
        },
        ticks: {
          color: "white", // y축 눈금 텍스트 색상
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        bodyFont: {
          size: 16,
        },
        callbacks: {
          label: function (context: any) {
            const point = context.raw;
            return [`Transcript: ${point.text}`];
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Scatter data={datasets} options={options} />
    </div>
  );
}

export { ScatterTranscript };
