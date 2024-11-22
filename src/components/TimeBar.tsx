// components/TimeBar.tsx
"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// 시간대 순서대로 정렬하기 위한 함수
const sortTimeStrings = (a: string, b: string) => {
  const timeA = new Date(`2024-01-01 ${a}`);
  const timeB = new Date(`2024-01-01 ${b}`);
  return timeA.getTime() - timeB.getTime();
};

// 데이터 정렬 및 구성
const generateSortedData = () => {
  const times = new Set([
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
  ]);

  const group1Data: Record<string, number> = {
    "8:00": 19,
    "8:30": 64,
    "9:00": 52,
    "9:30": 74,
    "10:00": 71,
    "10:30": 77,
    "11:00": 52,
    "11:30": 58,
    "12:00": 28,
    "12:30": 22,
    "13:00": 56,
    "13:30": 58,
    "14:00": 67,
    "14:30": 70,
    "15:00": 50,
    "15:30": 55,
  };

  const group2Data: Record<string, number> = {
    "8:00": 45,
    "8:30": 64,
    "9:00": 66,
    "9:30": 71,
    "10:00": 53,
    "10:30": 71,
    "11:00": 85,
    "11:30": 69,
    "12:00": 33,
    "12:30": 25,
    "13:00": 57,
    "13:30": 60,
    "14:00": 72,
    "14:30": 54,
    "15:00": 84,
    "15:30": 64,
  };

  const group3Data: Record<string, number> = {
    "8:00": 55,
    "8:30": 62,
    "9:00": 62,
    "9:30": 69,
    "10:00": 78,
    "10:30": 59,
    "11:00": 31,
    "11:30": 47,
    "12:00": 48,
    "12:30": 50,
    "13:00": 27,
    "13:30": 59,
    "14:00": 58,
    "14:30": 46,
    "15:00": 50,
    "15:30": 27,
  };

  const group1Count = Object.values(group1Data).reduce(
    (acc, value) => acc + value,
    0
  );
  const group2Count = Object.values(group2Data).reduce(
    (acc, value) => acc + value,
    0
  );
  const group3Count = Object.values(group3Data).reduce(
    (acc, value) => acc + value,
    0
  );

  return Array.from(times)
    .sort(sortTimeStrings)
    .map((time) => {
      return {
        time,
        group1Percent: group1Count
          ? Number((((group1Data[time] || 0) / group1Count) * 100).toFixed(1))
          : 0,
        group2Percent: group2Count
          ? Number((((group2Data[time] || 0) / group2Count) * 100).toFixed(1))
          : 0,
        group3Percent: group3Count
          ? Number((((group3Data[time] || 0) / group3Count) * 100).toFixed(1))
          : 0,
      };
    });
};

const TimeBar = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      const sortedData = generateSortedData();

      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: sortedData.map((item) => item.time),
            datasets: [
              {
                label: "Group 1",
                data: sortedData.map((item) => item.group1Percent),
                borderColor: "#8884d8",
                backgroundColor: "rgba(136, 132, 216, 0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#8884d8",
              },
              {
                label: "Group 2",
                data: sortedData.map((item) => item.group2Percent),
                borderColor: "#82ca9d",
                backgroundColor: "rgba(130, 202, 157, 0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#82ca9d",
              },
              {
                label: "Group 3",
                data: sortedData.map((item) => item.group3Percent),
                borderColor: "#ffc658",
                backgroundColor: "rgba(255, 198, 88, 0.1)",
                borderWidth: 2,
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointBackgroundColor: "#ffc658",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Call Distribution by Half Hour",
                font: {
                  size: 28,
                  weight: "bold",
                },
                padding: 20,
              },
              legend: {
                position: "top" as const,
                labels: {
                  padding: 20,
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function (context) {
                    return `${
                      context.dataset.label
                    }: ${context.parsed.y.toFixed(1)}%`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time(Half Hour)",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                  padding: { top: 10 },
                },
                grid: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.05)",
                },
              },
              y: {
                min: 0,
                max: 10,
                title: {
                  display: true,
                  text: "Occupied (%)",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                  padding: { bottom: 10 },
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                  callback: function (value) {
                    return value + "%";
                  },
                },
              },
            },
            interaction: {
              mode: "nearest",
              axis: "x",
              intersect: false,
            },
            maintainAspectRatio: false,
          },
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="h-[500px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export { TimeBar };
