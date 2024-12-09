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
  Label,
} from "recharts";

const SeniorAMComparison = () => {
  const data = [
    {
      group: "Q1",
      Senior_AM_Deal: 100,
      Senior_AM_Docusign: 50,
      Senior_AM_AQ: 15,
      Senior_AM_DMC: 1104,
      Others_Deal: 36.69,
      Others_Docusign: 9.15,
      Others_AQ: 4.46,
      Others_DMC: 232,
      Senior_AM_Count: 1,
      Others_Count: 13,
    },
    {
      group: "Q2",
      Senior_AM_Deal: 59,
      Senior_AM_Docusign: 43,
      Senior_AM_AQ: 33,
      Senior_AM_DMC: 266,
      Others_Deal: 38.77,
      Others_Docusign: 11.15,
      Others_AQ: 4.92,
      Others_DMC: 372.08,
      Senior_AM_Count: 1,
      Others_Count: 13,
    },
    {
      group: "Q3",
      Senior_AM_Deal: null,
      Senior_AM_Docusign: null,
      Senior_AM_AQ: null,
      Senior_AM_DMC: null,
      Others_Deal: 56.71,
      Others_Docusign: 17.79,
      Others_AQ: 7.29,
      Others_DMC: 532.5,
      Senior_AM_Count: 0,
      Others_Count: 14,
    },
    {
      group: "Q4",
      Senior_AM_Deal: 86.5,
      Senior_AM_Docusign: 39.5,
      Senior_AM_AQ: 25.5,
      Senior_AM_DMC: 358,
      Others_Deal: 60.55,
      Others_Docusign: 16.91,
      Others_AQ: 6.64,
      Others_DMC: 471,
      Senior_AM_Count: 2,
      Others_Count: 11,
    },
  ];

  const metrics = [
    {
      title: "Deals Comparison",
      seniorKey: "Senior_AM_Deal",
      othersKey: "Others_Deal",
      label: "Number of Deals",
    },
    {
      title: "Docusign Comparison",
      seniorKey: "Senior_AM_Docusign",
      othersKey: "Others_Docusign",
      label: "Number of Docusigns",
    },
    {
      title: "AQ Comparison",
      seniorKey: "Senior_AM_AQ",
      othersKey: "Others_AQ",
      label: "Number of AQs",
    },
    {
      title: "DMC Comparison",
      seniorKey: "Senior_AM_DMC",
      othersKey: "Others_DMC",
      label: "Number of DMCs",
    },
  ];

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: string;
  }) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-bold mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value?.toFixed(2) || "N/A"}
            {entry.name.includes("Senior AM") &&
              ` (Count: ${
                data.find((d) => d.group === label)?.Senior_AM_Count
              })`}
            {entry.name.includes("Others") &&
              ` (Count: ${data.find((d) => d.group === label)?.Others_Count})`}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-8">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-white p-6">
          <div className="text-center mb-6">
            <h2 className="text-[24px]">{metric.title}</h2>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="group" interval={0}>
                  <Label offset={-20} position="insideBottom" />
                </XAxis>
                <YAxis>
                  <Label
                    value={metric.label}
                    angle={-90}
                    position="insideLeft"
                    offset={-20}
                  />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{
                    paddingTop: "20px",
                    bottom: 0,
                  }}
                />
                <Bar
                  dataKey={metric.seniorKey}
                  name="Senior AM"
                  fill="#8884d8"
                />
                <Bar dataKey={metric.othersKey} name="Others" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeniorAMComparison;
