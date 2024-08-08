"use client";

import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend);

function ScatterPlot({
  data,
}: {
  data: {
    x: number;
    y: number;
    cluster: number;
    callId: string;
    text: string;
  }[];
}) {
  const datasets = {
    datasets: Array(
      data.reduce((acc, point) => Math.max(acc, point.cluster), 0) + 1
    )
      .fill("")
      .map((_, i) => i)
      .map((cluster) => {
        const points = data.filter((point) => point.cluster === cluster);
        return {
          label: `Cluster ${cluster}`,
          data: points.map((point) => ({
            x: point.x,
            y: point.y,
            callId: point.callId,
            text: point.text,
          })),
          backgroundColor: `hsl(${cluster * 60}, 100%, 50%)`,
        };
      }),
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: "white", // x축 그리드 라인 색상을 흰색으로 설정
          lineWidth: 0.5, // x축 그리드 라인 굵기 설정
        },
      },
      y: {
        grid: {
          color: "white", // y축 그리드 라인 색상을 흰색으로 설정
          lineWidth: 0.5, // y축 그리드 라인 굵기 설정
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // 레이블 색상을 흰색으로 설정
        },
      },
      tooltip: {
        bodyFont: {
          size: 16, // 툴팁 폰트 크기를 16으로 설정
        },
        callbacks: {
          label: function (context: any) {
            const point = context.raw;
            const { text } = point;
            return [
              `Call ID: ${point.callId}`,
              `Text: ${text.slice(0, 80)}`,
              text.slice(80, 160),
              text.slice(160, 240),
              text.slice(240, 320),
            ];
          },
        },
      },
    },
  };

  return <Scatter data={datasets} options={options} />;
}

export { ScatterPlot };
