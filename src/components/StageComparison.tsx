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

const StageComparison = () => {
  const data = [
    {
      stage: "unknown",
      "Group 1 Percentage": 4.5,
      "Group 1 Count": 124,
      "Group 2 Percentage": 3.6,
      "Group 2 Count": 81,
      "Group 3 Percentage": 9.6,
      "Group 3 Count": 221,
    },
    {
      stage: "ARS",
      "Group 1 Percentage": 64.7,
      "Group 1 Count": 1777,
      "Group 2 Percentage": 53.9,
      "Group 2 Count": 1222,
      "Group 3 Percentage": 55.7,
      "Group 3 Count": 1278,
    },
    {
      stage: "GKConnected",
      "Group 1 Percentage": 28.0,
      "Group 1 Count": 769,
      "Group 2 Percentage": 40.1,
      "Group 2 Count": 910,
      "Group 3 Percentage": 30.4,
      "Group 3 Count": 697,
    },
    {
      stage: "DMConnected",
      "Group 1 Percentage": 2.0,
      "Group 1 Count": 55,
      "Group 2 Percentage": 1.7,
      "Group 2 Count": 39,
      "Group 3 Percentage": 3.1,
      "Group 3 Count": 70,
    },
    {
      stage: "DealCreated",
      "Group 1 Percentage": 0.3,
      "Group 1 Count": 7,
      "Group 2 Percentage": 0.3,
      "Group 2 Count": 6,
      "Group 3 Percentage": 0.3,
      "Group 3 Count": 8,
    },
    {
      stage: "Quoted",
      "Group 1 Percentage": 0.1,
      "Group 1 Count": 2,
      "Group 2 Percentage": 0,
      "Group 2 Count": 0,
      "Group 3 Percentage": 0.3,
      "Group 3 Count": 7,
    },
    {
      stage: "Docusigned",
      "Group 1 Percentage": 0.3,
      "Group 1 Count": 7,
      "Group 2 Percentage": 0.2,
      "Group 2 Count": 5,
      "Group 3 Percentage": 0.2,
      "Group 3 Count": 5,
    },
    {
      stage: "Contracted",
      "Group 1 Percentage": 0.3,
      "Group 1 Count": 7,
      "Group 2 Percentage": 0.2,
      "Group 2 Count": 4,
      "Group 3 Percentage": 0.4,
      "Group 3 Count": 9,
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean;
    payload: any[];
    label: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded">
          <p className="font-bold mb-2">{label}</p>
          {payload.map((entry) => {
            const groupName =
              entry.name.split(" ")[0] + " " + entry.name.split(" ")[1];
            const countKey = `${groupName} Count`;
            // @ts-ignore
            const count = data.find((item) => item.stage === label)[countKey];
            return (
              <p
                key={entry.name}
                style={{ color: entry.color }}
                className="whitespace-nowrap"
              >
                {`${groupName}: ${entry.value}% (${count}건)`}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[600px] p-4">
      <h2 className="text-xl font-bold text-center mb-4">
        Sales Funnel별 분포
      </h2>
      <span>분석 모델: gpt-4o-mini</span>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid />
          <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} />
          <YAxis
            label={{
              value: "Percentage (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="Group 1 Percentage"
            name="Group 1(Deal은 많이 가져오지만 Docusign Conversion은 유독 낮은 인원)"
            fill="#8884d8"
          />
          <Bar
            dataKey="Group 2 Percentage"
            name="Group 2(근무 일수 대비 Deal을 못가져오는 유형)"
            fill="#82ca9d"
          />
          <Bar
            dataKey="Group 3 Percentage"
            name="Group 3(Docusign Conversion은 유독 높은 인원)"
            fill="#ffc658"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StageComparison;
