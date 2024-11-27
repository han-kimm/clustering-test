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

// 시장-주 매핑 데이터
const MARKET_STATE_MAPPING: Record<string, string> = {
  Dallas: "TX - Texas",
  Denver: "CO - Colorado",
  "Colorado Springs": "CO - Colorado",
  "San Antonio": "TX - Texas",
  Houston: "TX - Texas",
  Pittsburgh: "PA - Pennsylvania",
  Raleigh: "NC - North Carolina",
  Phoenix: "AZ - Arizona",
  Louisville: "KY - Kentucky",
  "Salt Lake": "UT - Utah",
  Charlotte: "NC - North Carolina",
  Orlando: "FL - Florida",
  "Corpus Christi": "TX - Texas",
  Miami: "FL - Florida",
  Austin: "TX - Texas",
  "South Carolina": "SC - South Carolina",
  "New Haven": "CT - Connecticut",
  "El Paso": "TX - Texas",
  Fairfield: "CT - Connecticut",
  Philadelphia: "PA - Pennsylvania",
  Chicago: "IL - Illinois",
  Allentown: "PA - Pennsylvania",
  Colorado: "CO - Colorado",
};

// 주별 색상 매핑
const STATE_COLORS: Record<string, string> = {
  "TX - Texas": "#FF9999",
  "CO - Colorado": "#66B2FF",
  "PA - Pennsylvania": "#99FF99",
  "NC - North Carolina": "#FFCC99",
  "AZ - Arizona": "#FF99CC",
  "KY - Kentucky": "#99CCFF",
  "UT - Utah": "#FFB366",
  "FL - Florida": "#FF99FF",
  "SC - South Carolina": "#99FFCC",
  "CT - Connecticut": "#FF8080",
  "IL - Illinois": "#80B3FF",
};

const GROUP_COLORS: Record<string, string> = {
  Group1: "#8884d8",
  Group2: "#82ca9d",
  Group3: "#ffc658",
};

// 실제 데이터
const rawData: Record<string, Record<string, Record<string, number>>> = {
  Group1: {
    market: {
      Dallas: 143 / 405,
      Denver: 66 / 405,
      "Colorado Springs": 10 / 405,
      "San Antonio": 82 / 405,
      Houston: 24 / 405,
      Pittsburgh: 52 / 405,
      Raleigh: 9 / 405,
      Phoenix: 24 / 405,
      Louisville: 2 / 405,
      "Salt Lake": 2 / 405,
      Charlotte: 5 / 405,
      Orlando: 7 / 405,
      "Corpus Christi": 3 / 405,
      Miami: 7 / 405,
      Austin: 1 / 405,
      "South Carolina": 6 / 405,
      "New Haven": 8 / 405,
      "El Paso": 1 / 405,
      Fairfield: 8 / 405,
      Philadelphia: 1 / 405,
      Chicago: 7 / 405,
    },
  },
  Group2: {
    market: {
      "San Antonio": 131 / 669,
      Pittsburgh: 43 / 669,
      Austin: 56 / 669,
      "South Carolina": 11 / 669,
      Dallas: 124 / 669,
      Louisville: 129 / 669,
      Miami: 10 / 669,
      "El Paso": 2 / 669,
      Denver: 127 / 669,
      "Colorado Springs": 3 / 669,
      Raleigh: 1 / 669,
      Orlando: 2 / 669,
      Houston: 21 / 669,
      "Corpus Christi": 3 / 669,
      Charlotte: 2 / 669,
      Philadelphia: 1 / 669,
      Allentown: 2 / 669,
    },
  },
  Group3: {
    market: {
      Denver: 29 / 421,
      "San Antonio": 79 / 421,
      Dallas: 86 / 421,
      Phoenix: 8 / 421,
      "South Carolina": 4 / 421,
      "Salt Lake": 1 / 421,
      Miami: 162 / 421,
      Raleigh: 6 / 421,
      Louisville: 31 / 421,
      "Corpus Christi": 1 / 421,
      Orlando: 6 / 421,
      Houston: 5 / 421,
      "El Paso": 3 / 421,
    },
  },
};

const StateAnalytics = () => {
  // 주별 데이터 집계
  const getStateData = () => {
    const stateData: Record<string, any> = {};

    Object.entries(rawData).forEach(([groupName, groupData]) => {
      Object.entries(groupData.market).forEach(([market, value]) => {
        const v = value * 100;
        const state = MARKET_STATE_MAPPING[market];
        if (state) {
          if (!stateData[state]) {
            stateData[state] = {
              state,
              Group1: 0,
              Group2: 0,
              Group3: 0,
              markets: new Set(),
              total: 0,
            };
          }
          stateData[state][groupName] += v;
          stateData[state].markets.add(market);
          stateData[state].total += v;
        }
      });
    });

    return Object.values(stateData)
      .sort((a, b) => b.total - a.total)
      .map((state) => ({
        ...state,
        Group1: state.Group1.toFixed(1),
        Group2: state.Group2.toFixed(1),
        Group3: state.Group3.toFixed(1),
        total: state.total.toFixed(1),
        markets: Array.from(state.markets).join(", "),
      }));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const stateData = getStateData().find((d) => d.state === label);
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{label}</p>
          {stateData && (
            <p className="text-sm text-gray-600 mb-2">
              Cities: {stateData.markets}
            </p>
          )}
          {payload.map((entry: any, index: any) => (
            <p key={index} style={{ color: entry.fill }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const BarChartComponent = () => (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <BarChart data={getStateData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="state"
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
            fontSize={12}
          />
          <YAxis
            label={{
              value: "Number of Cases",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="Group1" fill={GROUP_COLORS.Group1} name="Group 1" />
          <Bar dataKey="Group2" fill={GROUP_COLORS.Group2} name="Group 2" />
          <Bar dataKey="Group3" fill={GROUP_COLORS.Group3} name="Group 3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const StatePieChart = ({ groupName }: any) => {
    const getGroupStateData = () => {
      const stateData: Record<string, any> = {};
      const groupMarkets = rawData[groupName].market;
      let total = 0;

      Object.entries(groupMarkets).forEach(([market, value]) => {
        const state = MARKET_STATE_MAPPING[market];
        if (state) {
          stateData[state] = (stateData[state] || 0) + value;
          total += value;
        }
      });

      return Object.entries(stateData)
        .map(([state, value]) => ({
          name: state,
          value: value,
          percentage: ((value / total) * 100).toFixed(1),
        }))
        .sort((a, b) => b.value - a.value);
    };

    return (
      <div className="h-64">
        <h4 className="text-center font-medium mb-2">{groupName}</h4>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={getGroupStateData()}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) =>
                `${name.split(" - ")[0]} (${percentage}%)`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {getGroupStateData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATE_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-[28px] font-semibold mb-4">
            State Distribution Comparison
          </h3>
          <BarChartComponent />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-[28px] font-semibold mb-4">
            State Distribution by Group
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatePieChart groupName="Group1" />
            <StatePieChart groupName="Group2" />
            <StatePieChart groupName="Group3" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">State Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(STATE_COLORS).map(([state, color]) => (
              <div key={state} className="flex items-center">
                <div
                  className="w-4 h-4 mr-2"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm">{state}</span>
              </div>
            ))}
          </div>
          <p className="text-[20px] bg-gray-100 rounded-md text-center whitespace-pre-line mb-4 p-2">
            Group 1 : Texas <br /> Group 2 : Kentucky
            <br /> Group 3 : Florida
          </p>
        </div>
      </div>
    </div>
  );
};

export default StateAnalytics;
