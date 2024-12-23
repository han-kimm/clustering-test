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

const StageComparison = ({ data }: { data: any[] }) => {
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
      <div className="flex gap-4">
        <p className="text-[12px] bg-[#8884d8] rounded-lg p-2 inline-block">
          Group 1(Deal은 많이 가져오지만 Docusign Conversion은 유독 낮은 인원)
        </p>
        <p className="text-[12px] bg-[#82ca9d] rounded-lg p-2 inline-block">
          Group 2(근무 일수 대비 Deal을 못가져오는 유형)
        </p>
        <p className="text-[12px] bg-[#ffc658] rounded-lg p-2 inline-block">
          Group 3(Docusign Conversion은 유독 높은 인원)
        </p>
      </div>
      <span className="text-[12px]">분석 모델: gpt-4o-mini</span>
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
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{
              paddingBottom: "20px",
            }}
          />
          <Bar dataKey="Group 1 Percentage" name="Group 1" fill="#8884d8" />
          <Bar dataKey="Group 2 Percentage" name="Group 2" fill="#82ca9d" />
          <Bar dataKey="Group 3 Percentage" name="Group 3" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StageComparison;
