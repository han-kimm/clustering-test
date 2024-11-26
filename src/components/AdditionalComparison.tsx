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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import CityComparisonChart from "./NotInterestedCity";
import Group3Top3City from "./Group3Top3";

// 데이터 정의
const groupData: Record<string, Record<string, Record<string, number>>> = {
  group1: {
    market: {
      Dallas: 143,
      Denver: 66,
      "Colorado Springs": 10,
      "San Antonio": 82,
      Houston: 24,
      Pittsburgh: 52,
      Raleigh: 9,
      Phoenix: 24,
      Louisville: 2,
      "Salt Lake": 2,
      Colorado: 2,
      Charlotte: 5,
      Orlando: 7,
      "Corpus Christi": 3,
      Miami: 7,
      Austin: 1,
      "South Carolina": 6,
      "New Haven": 8,
      "El Paso": 1,
      Fairfield: 8,
      Philadelphia: 1,
      Chicago: 7,
    },
    status: {
      New: 231,
      "Call - Staff 1": 46,
      "Call - VM 1": 47,
      "Call - Drop (No Answer)": 10,
      "Call - No Answer 1": 12,
      "3. Call - DM 1": 9,
      "Got Invoice": 33,
      "Call - Drop(Wrong info)": 3,
      "1. Call - Hot": 13,
      "3. Call - DM 2": 3,
      "Call - Drop (Residential)": 2,
      "3. Call - Staff(w/DM info)": 5,
      "DO NOT CALL": 6,
      "5. Circle back": 15,
      "Call - Drop (Language)": 1,
      "Call - Drop(Not In Service)": 8,
      "Call - Staff 2": 9,
      "Call - Drop(Pricing)": 2,
      "4. Contracted": 9,
      "Call - Drop(Landlord)": 1,
      "Drop (Unserviceable)": 1,
      "Call - No Answer 2": 2,
      "Call - VM 2": 4,
    },
    category: {
      "01. Live Lead": 285,
      "05. Fresh Lead": 144,
      "10. Trash Lead": 9,
      "03. Can't Use Lead": 12,
      "06. Intake Lead": 1,
      "04. Recycle Lead": 6,
      "02. Cooling Lead": 7,
      "07. Contracted Lead": 7,
      "08. Hold Lead": 1,
    },
  },
  group2: {
    market: {
      "San Antonio": 131,
      Pittsburgh: 43,
      Austin: 56,
      "South Carolina": 11,
      Dallas: 124,
      "Outside of BO Service Coverage": 4,
      Louisville: 129,
      Miami: 10,
      "El Paso": 2,
      Denver: 127,
      "Colorado Springs": 3,
      Raleigh: 1,
      Orlando: 2,
      Houston: 21,
      "Corpus Christi": 3,
      Charlotte: 2,
      Philadelphia: 1,
      Allentown: 2,
    },
    status: {
      New: 344,
      "Call - Drop (Language)": 4,
      "Call - Drop (No Answer)": 27,
      "Got Invoice": 29,
      "Call - No Answer 2": 8,
      "Call - Staff 1": 92,
      "1. Call - Hot": 11,
      "3. Call - DM 1": 17,
      "Call - VM 1": 32,
      "Call - Staff 3": 12,
      "Call - Drop (Residential)": 1,
      "Call - No Answer 1": 14,
      "Call - Staff 2": 28,
      "3. Call - DM 2": 3,
      "3. Call - Staff(w/DM info)": 9,
      "5. Circle back": 12,
      "Call - Drop(Not In Service)": 3,
      "Drop (Unserviceable)": 3,
      "DO NOT CALL": 4,
      "4. Contracted": 4,
      "Call - Drop(Wrong info)": 7,
      "Call - Drop(Counter Offered)": 1,
      "Call - No Answer 3": 8,
      "3. Call - DM 3": 2,
      "Call - VM 2": 4,
      "Call - VM 3": 3,
    },
    category: {
      "01. Live Lead": 452,
      "02. Cooling Lead": 8,
      "03. Can't Use Lead": 15,
      "04. Recycle Lead": 21,
      "05. Fresh Lead": 161,
      "07. Contracted Lead": 4,
      "08. Hold Lead": 13,
      "10. Trash Lead": 7,
      "15. Big Ticket Sales": 1,
    },
  },
  group3: {
    market: {
      Denver: 29,
      "San Antonio": 79,
      Dallas: 86,
      Phoenix: 8,
      "South Carolina": 4,
      "Salt Lake": 1,
      Miami: 162,
      Raleigh: 6,
      Louisville: 31,
      "Corpus Christi": 1,
      Orlando: 6,
      Houston: 5,
      "El Paso": 3,
      "Outside of BO Service Coverage": 1,
    },
    status: {
      "Call - VM 1": 38,
      New: 96,
      "Got Invoice": 46,
      "Call - VM 2": 6,
      "Call - Drop (Non Serviceable Area)": 1,
      "3. Call - Staff(w/DM info)": 26,
      "Call - Staff 2": 31,
      "1. Call - Hot": 24,
      "Call - Staff 1": 57,
      "3. Call - DM 1": 31,
      "5. Circle back": 19,
      "3. Call - DM 2": 16,
      "2. Call -> Email": 2,
      "Call - Staff 3": 7,
      "Call - Drop (No Answer)": 5,
      "Call - No Answer 2": 8,
      "4. Contracted": 7,
      "Call - No Answer 1": 3,
      "Call - Drop (Residential)": 5,
      "Call - Drop(Wrong info)": 2,
      "Call - VM 3": 1,
      "Call - Drop(PM)": 1,
    },
    category: {
      "01. Live Lead": 358,
      "03. Can't Use Lead": 8,
      "05. Fresh Lead": 35,
      "08. Hold Lead": 16,
      "02. Cooling Lead": 7,
      "10. Trash Lead": 2,
      "07. Contracted Lead": 7,
    },
  },
};

const group1MarketCount = Object.values(groupData.group1.market).reduce(
  (acc, value) => acc + value,
  0
);
const group2MarketCount = Object.values(groupData.group2.market).reduce(
  (acc, value) => acc + value,
  0
);
const group3MarketCount = Object.values(groupData.group3.market).reduce(
  (acc, value) => acc + value,
  0
);

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#ff0000",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a4de6c",
];

const GROUP_COLORS: Record<string, string> = {
  group1: "#8884d8",
  group2: "#82ca9d",
  group3: "#ffc658",
};

// 모든 시장의 합계를 계산하여 상위 10개 시장 추출
const getTop10Markets = () => {
  const marketTotals: Record<string, number> = {};

  Object.values(groupData).forEach((group) => {
    Object.entries(group.market).forEach(([market, value]) => {
      if (market !== "undefined" && market !== "") {
        marketTotals[market] = (marketTotals[market] || 0) + value;
      }
    });
  });

  return Object.entries(marketTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name]) => name);
};

const ComparisonBarChart = ({
  title,
  type,
}: {
  title: string;
  type: string;
}) => {
  let data = [];

  if (type === "market") {
    const top10Markets = getTop10Markets();
    data = top10Markets.map((market) => ({
      name: market,
      Group1: (
        ((groupData.group1.market[market] || 0) / group1MarketCount) *
        100
      ).toFixed(1),
      Group2: (
        ((groupData.group2.market[market] || 0) / group2MarketCount) *
        100
      ).toFixed(1),
      Group3: (
        ((groupData.group3.market[market] || 0) / group3MarketCount) *
        100
      ).toFixed(1),
    }));
  } else if (type === "status") {
    const allKeys: Set<string> = new Set();
    Object.values(groupData).forEach((group) => {
      Object.keys(group[type]).forEach((key) => {
        if (key !== "undefined" && key !== "") {
          allKeys.add(key);
        }
      });
    });

    const group1StatusCount = Object.values(groupData.group1.status).reduce(
      (acc, value) => acc + value,
      0
    );
    const group2StatusCount = Object.values(groupData.group2.status).reduce(
      (acc, value) => acc + value,
      0
    );
    const group3StatusCount = Object.values(groupData.group3.status).reduce(
      (acc, value) => acc + value,
      0
    );

    data = Array.from(allKeys)
      .map((key) => ({
        name: key,
        Group1: Number(
          (
            ((groupData.group1[type][key] || 0) / group1StatusCount) *
            100
          ).toFixed(1)
        ),
        Group2: Number(
          (
            ((groupData.group2[type][key] || 0) / group2StatusCount) *
            100
          ).toFixed(1)
        ),
        Group3: Number(
          (
            ((groupData.group3[type][key] || 0) / group3StatusCount) *
            100
          ).toFixed(1)
        ),
      }))
      .toSorted(
        (a, b) =>
          b.Group1 + b.Group2 + b.Group3 - (a.Group1 + a.Group2 + a.Group3)
      )
      .slice(0, 10);
  } else {
    // status와 category의 경우 모든 unique 값을 수집
    const allKeys: Set<string> = new Set();
    Object.values(groupData).forEach((group) => {
      Object.keys(group[type]).forEach((key) => {
        if (key !== "undefined" && key !== "") {
          allKeys.add(key);
        }
      });
    });

    data = Array.from(allKeys)
      .map((key) => ({
        name: key,
        Group1: groupData.group1[type][key] || 0,
        Group2: groupData.group2[type][key] || 0,
        Group3: groupData.group3[type][key] || 0,
      }))
      .sort(
        (a, b) =>
          b.Group1 + b.Group2 + b.Group3 - (a.Group1 + a.Group2 + a.Group3)
      )
      .slice(0, 10);
  }

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              fontSize={12}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Group1" fill={GROUP_COLORS.group1} stackId="stack" />
            <Bar dataKey="Group2" fill={GROUP_COLORS.group2} stackId="stack" />
            <Bar dataKey="Group3" fill={GROUP_COLORS.group3} stackId="stack" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const CategoryPieCharts = () => {
  const processData = (group: Record<string, Record<string, number>>) => {
    return Object.entries(group.category)
      .filter(([key]) => key !== "undefined" && key !== "")
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold mb-4">
        Category Distribution Comparison
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(groupData).map(([groupName, data], index) => (
          <div key={groupName} className="h-64">
            <h4 className="text-center font-medium mb-2">
              {groupName.toUpperCase()}
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={processData(data)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={80}
                  fill={GROUP_COLORS[groupName]}
                  dataKey="value"
                >
                  {processData(data).map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdditionalComparison = () => {
  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow">
          <ComparisonBarChart
            title="City Distribution Comparison"
            type="market"
          />
        </div>
        <CityComparisonChart />
        <Group3Top3City />

        <div className="bg-white rounded-lg shadow">
          <ComparisonBarChart
            title="Status Distribution Comparison"
            type="status"
          />
        </div>
        <p className="text-[20px] bg-gray-100 rounded-md text-center whitespace-pre-line mb-4 p-2">
          Group 1 : VoiceMail 1 <br /> Group 2 : New
          <br /> Group 3 : Got Invoice
        </p>
        <div className="bg-white rounded-lg shadow">
          <CategoryPieCharts />
        </div>
        <p className="text-[20px] bg-gray-100 rounded-md text-center whitespace-pre-line mb-4 p-2">
          Group 1 : Fresh Lead <br /> Group 2 : Live Lead
          <br /> Group 3 : Live Lead
        </p>
      </div>
    </div>
  );
};

export { AdditionalComparison };
