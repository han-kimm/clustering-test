import React, { useState } from "react";
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

const Group3Top3City = () => {
  const [selectedPatterns, setSelectedPatterns] = useState([
    "Not Interested Response Pattern",
    "Sales Refusal Pattern",
  ]);

  const data = {
    "San Antonio": {
      "Request to Speak with Manager Pattern": 77.2,
      "Manager Unavailable Pattern": 51.8,
      "Schedule Follow-up Pattern": 21.5,
      "Email Request Pattern": 13.9,
      "Callback number Request Pattern": 11.3,
      "Service Switch Pattern": 10.1,
      "Current Service inquiry Pattern": 8.8,
      "Current Rate Inquiry Pattern": 8.8,
      "Not Interested Response Pattern": 17.7,
      "Competitive Price Pattern": 11.3,
      "Service Size Verification Pattern": 3.7,
      "Sales Refusal Pattern": 3.7,
      "Language Barrier Pattern": 2.5,
      "Corporate Refusal Pattern": 3.7,
      "Follow-up Pattern": 3.7,
      "Invoice Request Pattern": 7.5,
      "City/National Refusal Pattern": 1.2,
    },
    Dallas: {
      "Manager Unavailable Pattern": 43.0,
      "Callback number Request Pattern": 4.6,
      "Email Request Pattern": 23.2,
      "Request to Speak with Manager Pattern": 56.9,
      "Manager Available Pattern": 8.1,
      "Schedule Follow-up Pattern": 18.6,
      "Current Service inquiry Pattern": 10.4,
      "Competitive Price Pattern": 18.6,
      "Current Rate Inquiry Pattern": 11.6,
      "Service Size Verification Pattern": 4.6,
      "Service Frequency Verification Pattern": 2.3,
      "Follow-up Pattern": 8.1,
      "Not Interested Response Pattern": 15.1,
      "Invoice Request Pattern": 10.4,
      "Service Switch Pattern": 3.4,
      "Sales Refusal Pattern": 8.1,
      "Corporate Refusal Pattern": 3.4,
      "Service Inquiry Pattern": 1.1,
    },
    Miami: {
      "Request to Speak with Manager Pattern": 52.4,
      "Not Interested Response Pattern": 7.4,
      "Sales Refusal Pattern": 1.8,
      "Schedule Follow-up Pattern": 30.8,
      "Manager Unavailable Pattern": 58.0,
      "Current Service inquiry Pattern": 8.6,
      "Competitive Price Pattern": 6.1,
      "Service Size Verification Pattern": 6.7,
      "Email Request Pattern": 17.2,
      "Corporate Refusal Pattern": 1.2,
      "Language Barrier Pattern": 6.1,
      "Callback number Request Pattern": 8.0,
      "Follow-up Pattern": 7.4,
      "Invoice Request Pattern": 13.4,
      "Current Rate Inquiry Pattern": 5.5,
      "Manager Available Pattern": 3.0,
      "Service Frequency Verification Pattern": 4.3,
      "Current Provider Inquiry Pattern": 0.6,
      "Service Switch Pattern": 3.7,
    },
  };

  // Get all unique patterns

  const set = new Set(Object.values(data).flatMap((city) => Object.keys(city)));
  const allPatterns = Array.from(set);

  // Transform data for the chart
  const chartData = Object.entries(data).map(([city, patterns]) => ({
    city,
    ...patterns,
  }));

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];

  return (
    <div className="w-full">
      <div className="mb-4">
        <h1 className="text-[28px] font-semibold">
          Pattern of Call count Top 3 City (Group 3)
        </h1>
        <h3 className="text-sm font-medium mb-2">
          Select Patterns to Display:
        </h3>
        <div className="flex flex-wrap gap-2">
          {allPatterns.map((pattern, index) => (
            <button
              key={pattern}
              onClick={() => {
                if (selectedPatterns.includes(pattern)) {
                  setSelectedPatterns(
                    selectedPatterns.filter((p) => p !== pattern)
                  );
                } else {
                  setSelectedPatterns([...selectedPatterns, pattern]);
                }
              }}
              className={`px-2 py-1 text-xs rounded ${
                selectedPatterns.includes(pattern)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {pattern.replace(" Pattern", "")}
            </button>
          ))}
        </div>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis
              label={{
                value: "Percentage (%)",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Legend />
            {selectedPatterns.map((pattern, index) => (
              <Bar
                key={pattern}
                dataKey={pattern}
                fill={colors[index % colors.length]}
                name={pattern.replace(" Pattern", "")}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Group3Top3City;
