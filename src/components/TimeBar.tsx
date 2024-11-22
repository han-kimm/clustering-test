"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface GroupData {
  time: string;
  group1: number;
  group2: number;
  group3: number;
}

// 시간대 순서대로 정렬하기 위한 함수
const sortTimeStrings = (a: string, b: string) => {
  const timeA = new Date(`2024-01-01 ${a}`);
  const timeB = new Date(`2024-01-01 ${b}`);
  return timeA.getTime() - timeB.getTime();
};

// 데이터 정렬 및 구성
const generateSortedData = () => {
  const times = [
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
  ] as const;

  const group1Data = {
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

  const group2Data = {
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

  const group3Data = {
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

  return Array.from(times)
    .sort(sortTimeStrings)
    .map((time) => ({
      time,
      group1: group1Data[time] || 0,
      group2: group2Data[time] || 0,
      group3: group3Data[time] || 0,
    }));
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
          type: "bar",
          data: {
            labels: sortedData.map((item) => item.time),
            datasets: [
              {
                label: "Group 1",
                data: sortedData.map((item) => item.group1),
                backgroundColor: "rgba(136, 132, 216, 0.6)", // #8884d8
                borderColor: "#8884d8",
                borderWidth: 1,
              },
              {
                label: "Group 2",
                data: sortedData.map((item) => item.group2),
                backgroundColor: "rgba(130, 202, 157, 0.6)", // #82ca9d
                borderColor: "#82ca9d",
                borderWidth: 1,
              },
              {
                label: "Group 3",
                data: sortedData.map((item) => item.group3),
                backgroundColor: "rgba(255, 198, 88, 0.6)", // #ffc658
                borderColor: "#ffc658",
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Call Count (Half Hour)",
                font: {
                  size: 16,
                  weight: "bold",
                },
                padding: 20,
              },
              legend: {
                position: "top" as const,
                labels: {
                  padding: 20,
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.parsed.y}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Time",
                  font: {
                    weight: "bold",
                  },
                  padding: { top: 10 },
                },
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Count",
                  font: {
                    weight: "bold",
                  },
                  padding: { bottom: 10 },
                },
                grid: {
                  color: "rgba(0, 0, 0, 0.1)",
                },
              },
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
