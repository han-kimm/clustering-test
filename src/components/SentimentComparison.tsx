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

const SentimentComparison = () => {
  const [displayMetric, setDisplayMetric] = useState("all");

  const group1: Record<string, Record<string, number>> = {
    Dallas: { negative: 12.5, positive: 4.1 },
    Denver: { negative: 18.1, positive: 9.0 },
    "San Antonio": { negative: 10.9, positive: 10.9 },
    Pittsburgh: { negative: 17.3, positive: 9.6 },
  };

  const group2: Record<string, Record<string, number>> = {
    Dallas: { negative: 13.7, positive: 8.8 },
    Denver: { negative: 14.9, positive: 8.6 },
    "San Antonio": { negative: 11.4, positive: 11.4 },
    Louisville: { negative: 3.8, positive: 5.4 },
    Austin: { negative: 10.7, positive: 5.3 },
  };

  const group3: Record<string, Record<string, number>> = {
    Dallas: { negative: 10.4, positive: 8.1 },
    "San Antonio": { negative: 12.6, positive: 11.3 },
    Miami: { negative: 4.9, positive: 9.8 },
  };

  const prepareData = () => {
    const allCities = new Set([
      ...Object.keys(group1),
      ...Object.keys(group2),
      ...Object.keys(group3),
    ]);

    return Array.from(allCities).map((city) => {
      const data = {
        city,
        "Group 1 Positive": group1[city]?.positive || 0,
        "Group 1 Negative": group1[city]?.negative || 0,
        "Group 2 Positive": group2[city]?.positive || 0,
        "Group 2 Negative": group2[city]?.negative || 0,
        "Group 3 Positive": group3[city]?.positive || 0,
        "Group 3 Negative": group3[city]?.negative || 0,
      };
      return data;
    });
  };

  const getVisibleBars = () => {
    if (displayMetric === "positive") {
      return [
        { dataKey: "Group 1 Positive", fill: "#4CAF50" },
        { dataKey: "Group 2 Positive", fill: "#81C784" },
        { dataKey: "Group 3 Positive", fill: "#A5D6A7" },
      ];
    } else if (displayMetric === "negative") {
      return [
        { dataKey: "Group 1 Negative", fill: "#F44336" },
        { dataKey: "Group 2 Negative", fill: "#E57373" },
        { dataKey: "Group 3 Negative", fill: "#FFCDD2" },
      ];
    } else {
      return [
        { dataKey: "Group 1 Positive", fill: "#4CAF50" },
        { dataKey: "Group 2 Positive", fill: "#81C784" },
        { dataKey: "Group 3 Positive", fill: "#A5D6A7" },
        { dataKey: "Group 1 Negative", fill: "#F44336" },
        { dataKey: "Group 2 Negative", fill: "#E57373" },
        { dataKey: "Group 3 Negative", fill: "#FFCDD2" },
      ];
    }
  };

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          value={displayMetric}
          onChange={(e) => setDisplayMetric(e.target.value)}
        >
          <option value="all">Both Sentiments</option>
          <option value="positive">Positive Only</option>
          <option value="negative">Negative Only</option>
        </select>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={prepareData()}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <Legend />
            {getVisibleBars().map((bar, index) => (
              <Bar
                key={bar.dataKey}
                dataKey={bar.dataKey}
                fill={bar.fill}
                // @ts-ignore
                stackId={displayMetric === "all" ? null : "1"}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentComparison;
