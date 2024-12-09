import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const StatusRadarComparison = () => {
  // 원본 데이터
  const originalData: Record<string, Record<string, number>> = {
    "Senior AM": {
      DMC: 620.5,
      Deal: 83.5,
      Docusign: 43.0,
      AQ: 24.75,
      DealConversionRate: 15.47,
      DSConversionRate: 54.95,
      DealPerDay: 0.39,
      DSPerDay: 0.2,
    },
    Official: {
      DMC: 516.91,
      Deal: 66.76,
      Docusign: 19.5,
      AQ: 8.44,
      DealConversionRate: 17.65,
      DSConversionRate: 31.31,
      DealPerDay: 0.38,
      DSPerDay: 0.11,
    },
    GP: {
      DMC: 171.41,
      Deal: 10.06,
      Docusign: 2.12,
      AQ: 0.59,
      DealConversionRate: 6.09,
      DSConversionRate: 25.53,
      DealPerDay: 0.23,
      DSPerDay: 0.04,
    },
  };

  // 데이터 정규화 (0-100 스케일)
  const normalizeValue = (value: number, key: string) => {
    const values = [
      originalData["Senior AM"][key],
      originalData["Official"][key],
      originalData["GP"][key],
    ];
    const max = Math.max(...values);
    return ((value / max) * 100).toFixed(1);
  };

  // 정규화된 데이터 생성
  const data = [
    {
      subject: "DMC",
      "Senior AM": normalizeValue(originalData["Senior AM"].DMC, "DMC"),
      Official: normalizeValue(originalData["Official"].DMC, "DMC"),
      GP: normalizeValue(originalData["GP"].DMC, "DMC"),
    },
    {
      subject: "Deal",
      "Senior AM": normalizeValue(originalData["Senior AM"].Deal, "Deal"),
      Official: normalizeValue(originalData["Official"].Deal, "Deal"),
      GP: normalizeValue(originalData["GP"].Deal, "Deal"),
    },
    {
      subject: "Docusign",
      "Senior AM": normalizeValue(
        originalData["Senior AM"].Docusign,
        "Docusign"
      ),
      Official: normalizeValue(originalData["Official"].Docusign, "Docusign"),
      GP: normalizeValue(originalData["GP"].Docusign, "Docusign"),
    },
    {
      subject: "AQ",
      "Senior AM": normalizeValue(originalData["Senior AM"].AQ, "AQ"),
      Official: normalizeValue(originalData["Official"].AQ, "AQ"),
      GP: normalizeValue(originalData["GP"].AQ, "AQ"),
    },
    {
      subject: "Deal 전환율",
      "Senior AM": normalizeValue(
        originalData["Senior AM"].DealConversionRate,
        "DealConversionRate"
      ),
      Official: normalizeValue(
        originalData["Official"].DealConversionRate,
        "DealConversionRate"
      ),
      GP: normalizeValue(
        originalData["GP"].DealConversionRate,
        "DealConversionRate"
      ),
    },
    {
      subject: "DS 전환율",
      "Senior AM": normalizeValue(
        originalData["Senior AM"].DSConversionRate,
        "DSConversionRate"
      ),
      Official: normalizeValue(
        originalData["Official"].DSConversionRate,
        "DSConversionRate"
      ),
      GP: normalizeValue(
        originalData["GP"].DSConversionRate,
        "DSConversionRate"
      ),
    },
    {
      subject: "일평균 Deal",
      "Senior AM": normalizeValue(
        originalData["Senior AM"].DealPerDay,
        "DealPerDay"
      ),
      Official: normalizeValue(
        originalData["Official"].DealPerDay,
        "DealPerDay"
      ),
      GP: normalizeValue(originalData["GP"].DealPerDay, "DealPerDay"),
    },
    {
      subject: "일평균 DS",
      "Senior AM": normalizeValue(
        originalData["Senior AM"].DSPerDay,
        "DSPerDay"
      ),
      Official: normalizeValue(originalData["Official"].DSPerDay, "DSPerDay"),
      GP: normalizeValue(originalData["GP"].DSPerDay, "DSPerDay"),
    },
  ];

  return (
    <div className="w-full bg-white p-4">
      <h2 className="text-[24px] text-center mb-4">
        직급별 성과 비교 (상대 비교)
      </h2>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="54%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis domain={[0, 100]} />
            <Radar
              name="Senior AM"
              dataKey="Senior AM"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Radar
              name="Official"
              dataKey="Official"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.6}
            />
            <Radar
              name="GP"
              dataKey="GP"
              stroke="#ffc658"
              fill="#ffc658"
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusRadarComparison;
