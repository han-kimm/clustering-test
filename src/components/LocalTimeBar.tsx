"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// Sort time strings considering 15-minute intervals
const sortTimeStrings = (a: string, b: string) => {
  const timeA = new Date(`2024-01-01 ${a.padStart(5, "0")}`);
  const timeB = new Date(`2024-01-01 ${b.padStart(5, "0")}`);
  return timeA.getTime() - timeB.getTime();
};

// Format time string to ensure consistent format (HH:MM)
const formatTimeString = (time: string): string => {
  const [hours, minutes] = time.split(":");
  return `${hours.padStart(2, "0")}:${(minutes || "0").padStart(2, "0")}`;
};

const generateSortedData = () => {
  const group1Data: Record<string, number> = {
    "09:30": 13,
    "08:15": 1,
    "10:00": 14,
    "10:30": 24,
    "11:00": 9,
    "11:15": 12,
    "10:45": 17,
    "12:30": 10,
    "14:00": 16,
    "14:15": 17,
    "16:00": 11,
    "16:15": 16,
    "16:30": 16,
    "16:45": 17,
    "14:30": 14,
    "13:45": 8,
    "14:45": 14,
    "15:00": 18,
    "09:00": 6,
    "09:45": 17,
    "11:45": 17,
    "12:15": 10,
    "10:15": 16,
    "11:30": 18,
    "12:00": 18,
    "09:15": 11,
    "15:15": 15,
    "15:30": 15,
    "15:45": 25,
    "08:30": 7,
    "08:45": 2,
    "13:00": 11,
    "13:15": 9,
    "12:45": 6,
    "13:30": 6,
    "17:00": 2,
    "17:45": 3,
    "17:15": 7,
    "17:30": 2,
  };

  const group2Data: Record<string, number> = {
    "09:30": 20,
    "09:45": 23,
    "10:00": 21,
    "10:30": 23,
    "10:45": 21,
    "11:00": 27,
    "11:30": 29,
    "11:45": 28,
    "12:00": 18,
    "12:30": 16,
    "12:45": 21,
    "13:00": 25,
    "13:45": 19,
    "15:30": 19,
    "16:00": 33,
    "16:30": 14,
    "16:45": 10,
    "12:15": 23,
    "13:15": 29,
    "09:00": 11,
    "15:45": 15,
    "09:15": 17,
    "10:15": 22,
    "16:15": 22,
    "11:15": 21,
    "13:30": 16,
    "15:00": 18,
    "14:45": 15,
    "15:15": 25,
    "17:15": 8,
    "17:45": 5,
    "17:30": 5,
    "14:00": 16,
    "14:30": 18,
    "14:15": 12,
    "17:00": 2,
    "08:30": 1,
  };

  const group3Data: Record<string, number> = {
    "10:30": 27,
    "10:45": 11,
    "14:00": 14,
    "14:15": 19,
    "14:45": 13,
    "15:45": 11,
    "15:00": 12,
    "16:15": 9,
    "15:15": 15,
    "10:15": 15,
    "12:45": 13,
    "13:15": 8,
    "13:30": 13,
    "08:45": 1,
    "09:00": 4,
    "09:30": 5,
    "10:00": 23,
    "11:00": 18,
    "12:00": 13,
    "12:15": 13,
    "12:30": 14,
    "13:45": 16,
    "16:30": 11,
    "16:45": 5,
    "09:15": 6,
    "11:30": 12,
    "13:00": 8,
    "17:00": 9,
    "14:30": 13,
    "11:15": 19,
    "17:30": 9,
    "17:15": 4,
    "11:45": 13,
    "15:30": 7,
    "18:45": 2,
    "18:30": 1,
    "09:45": 6,
    "16:00": 8,
  };

  // Calculate total counts for each group
  const group1Count = Object.values(group1Data).reduce(
    (acc, val) => acc + val,
    0
  );
  const group2Count = Object.values(group2Data).reduce(
    (acc, val) => acc + val,
    0
  );
  const group3Count = Object.values(group3Data).reduce(
    (acc, val) => acc + val,
    0
  );

  // Get all unique times and sort them
  const times = new Set([
    ...Object.keys(group1Data),
    ...Object.keys(group2Data),
    ...Object.keys(group3Data),
  ]);

  return Array.from(times)
    .map((time) => formatTimeString(time))
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

const LocalTimeBar = () => {
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
                text: "Call Distribution by Lead's Time zone",
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
                  text: "Time(Quarter Hour)",
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
                ticks: {
                  maxRotation: 45,
                  minRotation: 45,
                },
              },
              y: {
                min: 0,
                max: 7,
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
      <p className="text-base bg-gray-100 rounded-md text-center whitespace-pre-line mb-4 p-2">
        Peak times:{"\n"}
        Group 1: 15:45 (25%), 10:30 (24%){"\n"}
        Group 2: 16:00 (33%), 11:30 (29%){"\n"}
        Group 3: 10:30 (27%), 10:00 (23%)
      </p>
    </div>
  );
};

export { LocalTimeBar };
