"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CityComparisonChart = () => {
  const data = [
    {
      city: "Dallas",
      Group1: 16.7,
      Group2: 15.3,
      Group3: 15.1,
    },
    {
      city: "San Antonio",
      Group1: 19.5,
      Group2: 20.6,
      Group3: 17.7,
    },
    {
      city: "Denver",
      Group1: 22.7,
      Group2: 23.6,
      Group3: 3.4,
    },
    {
      city: "Miami",
      Group1: 42.8,
      Group2: 0,
      Group3: 7.4,
    },
    {
      city: "Louisville",
      Group1: 0,
      Group2: 4.6,
      Group3: 0,
    },
    {
      city: "Pittsburgh",
      Group1: 36.5,
      Group2: 16.2,
      Group3: 0,
    },
    {
      city: "Austin",
      Group1: 0,
      Group2: 14.2,
      Group3: 0,
    },
    {
      city: "Houston",
      Group1: 29.1,
      Group2: 9.5,
      Group3: 40,
    },
    {
      city: "Phoenix",
      Group1: 16.6,
      Group2: 0,
      Group3: 12.5,
    },
    {
      city: "Orlando",
      Group1: 14.2,
      Group2: 0,
      Group3: 16.6,
    },
  ].filter((city) => city.Group1 > 0 || city.Group2 > 0 || city.Group3 > 0); // Filter out cities with all zeros

  return (
    <div className="w-full h-96">
      <h1 className="text-[28px] font-semibold mb-8">
        Not Interested Pattern by City
      </h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 100,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="city"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={100}
          />
          <YAxis
            label={{ value: "Percentage", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="Group1" fill="#8884d8" name="Group 1" />
          <Bar dataKey="Group2" fill="#82ca9d" name="Group 2" />
          <Bar dataKey="Group3" fill="#ffc658" name="Group 3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CityComparisonChart;
