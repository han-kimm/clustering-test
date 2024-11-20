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

const PatternComparison = (props: {
  title: string;
  data: any;
  description?: string;
  domain?: number[];
}) => {
  const { title, data, description, domain } = props;
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
            const count = data.find((item) => item.stage === label)?.[countKey];
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
    <div className="w-full h-[1000px] p-4 bg-white pb-[300px]">
      <h2 className="text-[28px] font-bold text-center mb-4">{title}</h2>
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
      <ResponsiveContainer width="100%" height="90%">
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
          <XAxis dataKey="stage" angle={-45} textAnchor="end" height={100} />
          <YAxis
            label={{
              value: "Percentage (%)",
              angle: -90,
              position: "insideLeft",
            }}
            domain={domain}
          />
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Group 1 Percentage" name="Group 1" fill="#8884d8" />
          <Bar dataKey="Group 2 Percentage" name="Group 2" fill="#82ca9d" />
          <Bar dataKey="Group 3 Percentage" name="Group 3" fill="#ffc658" />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{
              paddingBottom: "20px",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      {!!description && (
        <p className="text-[20px] bg-gray-100 rounded-md text-center whitespace-pre-line mb-4 p-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default PatternComparison;
