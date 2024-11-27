"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SentenceComparison = () => {
  const TOTAL_GROUP1 = 22810;
  const TOTAL_GROUP2 = 21598;
  const TOTAL_GROUP3 = 26371;

  const prepareData = (
    data: { size: number; text: string }[],
    total: number
  ) => {
    return data
      .map((item) => ({
        text: item.text,
        percentage: ((item.size / total) * 100).toFixed(1),
        size: item.size,
      }))
      .sort((a, b) => parseFloat(b.percentage) - parseFloat(a.percentage));
  };

  const group1Data = prepareData(
    [
      { size: 602, text: "May I speak with the manager?" },
      { size: 519, text: "Calling about trash pickup" },
      { size: 448, text: "Hello, good afternoon" },
      { size: 372, text: "Hello, good morning" },
      { size: 126, text: "Call back later" },
      { size: 101, text: "Company introduction" },
      { size: 81, text: "Help save on trash bill" },
      { size: 65, text: "Active dumpster service?" },
    ],
    TOTAL_GROUP1
  );

  const group2Data = prepareData(
    [
      { size: 936, text: "Calling about trash pickup" },
      { size: 748, text: "May I speak with the manager?" },
      { size: 363, text: "Hi, good afternoon" },
      { size: 313, text: "Hi, good morning" },
      { size: 223, text: "Company introduction" },
      { size: 121, text: "Call back later" },
      { size: 85, text: "Dumpster provider?" },
      { size: 81, text: "Service savings offer" },
    ],
    TOTAL_GROUP2
  );

  const group3Data = prepareData(
    [
      { size: 381, text: "Hi, good afternoon" },
      { size: 324, text: "May I speak with the manager?" },
      { size: 317, text: "Calling about trash pickup" },
      { size: 196, text: "Hi, good morning" },
      { size: 154, text: "Call back later" },
      { size: 120, text: "Availability check" },
      { size: 115, text: "Service benefits" },
      { size: 76, text: "Company introduction" },
    ],
    TOTAL_GROUP3
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded shadow">
          <p className="text-sm">크기: {data.size}</p>
          <p className="text-sm">비율: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const BarChartComponent = ({ data, color, title }: any) => (
    <div className="flex-1 border rounded p-4">
      <h3 className="text-base font-semibold mb-2">{title}</h3>
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 10, left: 80, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 5]}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey="text"
              tick={{ fontSize: 12 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="percentage" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-bold mb-4">대화 패턴 분석</h2>
      <div className="flex gap-4">
        <BarChartComponent
          data={group1Data}
          color="#8884d8"
          title={`Group 1 (${TOTAL_GROUP1.toLocaleString()})`}
        />
        <BarChartComponent
          data={group2Data}
          color="#82ca9d"
          title={`Group 2 (${TOTAL_GROUP2.toLocaleString()})`}
        />
        <BarChartComponent
          data={group3Data}
          color="#ffc658"
          title={`Group 3 (${TOTAL_GROUP3.toLocaleString()})`}
        />
      </div>
    </div>
  );
};

export default SentenceComparison;
