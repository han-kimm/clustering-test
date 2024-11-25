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
    "09:30": 9,
    "08:15": 1,
    "10:00": 8,
    "10:30": 12,
    "11:00": 9,
    "16:00": 5,
    "16:15": 11,
    "16:30": 7,
    "16:45": 12,
    "14:30": 8,
    "15:00": 8,
    "14:45": 8,
    "09:45": 9,
    "11:45": 8,
    "12:15": 5,
    "10:15": 7,
    "10:45": 7,
    "12:00": 11,
    "09:15": 5,
    "11:15": 2,
    "12:30": 6,
    "15:15": 8,
    "15:30": 8,
    "15:45": 15,
    "09:00": 2,
    "11:30": 6,
    "14:00": 7,
    "14:15": 8,
    "08:30": 1,
    "13:00": 4,
    "13:15": 3,
    "12:45": 2,
    "13:45": 3,
    "13:30": 3,
    "17:45": 1,
  };

  const group2Data: Record<string, number> = {
    "09:30": 11,
    "12:00": 5,
    "12:30": 9,
    "12:45": 9,
    "13:00": 10,
    "15:30": 10,
    "16:00": 12,
    "16:30": 7,
    "16:45": 8,
    "12:15": 10,
    "13:15": 13,
    "15:45": 8,
    "16:15": 11,
    "09:00": 8,
    "09:15": 6,
    "09:45": 12,
    "11:30": 12,
    "10:00": 13,
    "10:15": 12,
    "10:30": 7,
    "11:15": 12,
    "11:00": 14,
    "17:45": 5,
    "17:30": 5,
    "10:45": 11,
    "11:45": 9,
    "13:30": 7,
    "14:00": 8,
    "13:45": 7,
    "14:30": 12,
    "15:15": 15,
    "17:15": 6,
    "14:15": 8,
    "14:45": 6,
    "15:00": 13,
    "17:00": 2,
  };

  const group3Data: Record<string, number> = {
    "14:45": 5,
    "15:45": 3,
    "14:00": 6,
    "15:00": 7,
    "16:15": 3,
    "15:15": 2,
    "13:30": 2,
    "11:30": 2,
    "12:30": 3,
    "12:45": 1,
    "12:00": 1,
    "15:30": 2,
    "13:45": 6,
    "11:15": 3,
    "10:00": 5,
    "10:15": 2,
    "12:15": 3,
    "14:15": 4,
    "09:00": 1,
    "09:15": 1,
    "10:45": 1,
    "10:30": 5,
    "09:30": 3,
    "09:45": 2,
    "16:00": 3,
    "14:30": 3,
    "11:45": 2,
    "13:15": 1,
    "13:00": 1,
    "16:30": 1,
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

const NewTimeBar = () => {
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
                text: "Call Distribution by Lead's Time zone (New Lead)",
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
      <p className="text-base bg-gray-100 rounded-md text-center whitespace-pre-line mb-4 p-2">
        Peak times:{"\n"}
        Group 1: 15:45 (7.6%), 16:45 (6.1%), 10:30 (6.1%){"\n"}
        Group 2: 15:15 (5.7%), 11:00 (5.3%), 13:15 (4.9%){"\n"}
        Group 3: 15:00 (9.2%), 14:00 (7.9%), 14:45 (6.6%)
      </p>
    </div>
  );
};

export { NewTimeBar };
