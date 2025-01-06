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
  LineChart,
  Line,
} from "recharts";

const QuartileComparison = () => {
  const data = [
    {
      group: "Q1 (<39.66%)",
      DMC: 294.29,
      Deal: 41.21,
      Docusign: 12.07,
      AQ: 5.21,
      DealConversion: 13.85,
      DSConversion: 30.97,
    },
    {
      group: "Q2 (39.66-51.06%)",
      DMC: 364.5,
      Deal: 40.21,
      Docusign: 13.43,
      AQ: 6.93,
      DealConversion: 14.83,
      DSConversion: 30.58,
    },
    {
      group: "Q3 (51.06-64.71%)",
      DMC: 532.5,
      Deal: 56.71,
      Docusign: 17.79,
      AQ: 7.29,
      DealConversion: 13.83,
      DSConversion: 31.29,
    },
    {
      group: "Q4 (>64.71%)",
      DMC: 484.08,
      Deal: 64.69,
      Docusign: 20.38,
      AQ: 9.54,
      DealConversion: 13.11,
      DSConversion: 32.22,
    },
  ];

  const metrics = [
    {
      title: "Performance Metrics by Follow-up Ratio Quartile",
      bars: [
        { dataKey: "Deal", name: "Deals", color: "#8884d8" },
        { dataKey: "Docusign", name: "Docusign", color: "#82ca9d" },
        { dataKey: "AQ", name: "AQ", color: "#ffc658" },
      ],
    },
    {
      title: "DMC by Follow-up Ratio Quartile",
      bars: [{ dataKey: "DMC", name: "DMC", color: "#ff7300" }],
    },
    {
      title: "Conversion Rates by Follow-up Ratio Quartile",
      bars: [
        {
          dataKey: "DealConversion",
          name: "Deal Conversion Rate (%)",
          color: "#e91e63",
        },
        {
          dataKey: "DSConversion",
          name: "DS Conversion Rate (%)",
          color: "#9c27b0",
        },
      ],
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <p className="font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: any) => (
          <p key={index} style={{ color: entry.color }}>
            {entry.name}: {entry.value.toFixed(2)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-8 flex flex-wrap">
      {metrics.map((metric, idx) => (
        <div key={idx} className="w-1/2 bg-white">
          <div className="text-center mb-6">
            <h2 className="text-[24px]">{metric.title}</h2>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 40, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="group"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis>
                  <Label
                    value="Value"
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
                {metric.bars.map((bar, i) => (
                  <Line
                    key={i}
                    dataKey={bar.dataKey}
                    name={bar.name}
                    stroke={bar.color}
                    strokeWidth={3}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuartileComparison;
