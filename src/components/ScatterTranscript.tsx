"use client";

import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend);

const stageColors = {
  GKConnected: {
    base: "46, 184, 92", // 녹색 - 성공적인 연결
    symbol: "●",
  },
  DMConnected: {
    base: "54, 162, 235", // 파란색 - 직접 메시지 연결
    symbol: "▲",
  },
  unknown: {
    base: "156, 163, 175", // 회색 - 알 수 없음
    symbol: "×",
  },
  ARS: {
    base: "249, 115, 22", // 주황색 - 자동응답시스템
    symbol: "■",
  },
  Docusigned: {
    base: "139, 92, 246", // 보라색 - 문서 서명 완료
    symbol: "◆",
  },
  DocusignSent: {
    base: "168, 85, 247", // 연한 보라색 - 문서 서명 대기
    symbol: "○",
  },
  // group1 "#8884d8" group2 "#82ca9d" group3 "#ffc658"
  group1: {
    base: "136, 132, 216",
    symbol: "●",
  },
  group2: {
    base: "130, 202, 157",
    symbol: "▲",
  },
  group3: {
    base: "255, 198, 88",
    symbol: "■",
  },
};

function ScatterTranscript({
  data,
}: {
  data: {
    x: number;
    y: number;
    group: string;
    text: string;
    stage: string;
    pattern: string[];
  }[];
}) {
  if (!data) {
    return null;
  }

  console.log(data);

  // Group data by both group and stage
  const groupedData = data.reduce((acc, curr) => {
    const key = `${curr.group}-${curr.stage}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({
      x: curr.x,
      y: curr.y,
      text: curr.text,
      stage: curr.stage,
      pattern: curr.pattern,
    });
    return acc;
  }, {} as Record<string, { x: number; y: number; text: string; stage: string; pattern: string[] }[]>);

  // Create datasets with different colors and symbols for each group-stage combination
  const datasets = {
    datasets: Object.entries(groupedData).map(([key, points]) => {
      const [group, stage] = key.split("-");
      const stageColor = stageColors[group as keyof typeof stageColors] || {
        base: "156, 163, 175",
        symbol: "●",
      };

      return {
        label: `${group} (${stage})`,
        data: points,
        backgroundColor: `rgba(${stageColor.base}, ${
          group === "group1" ? "0.7" : "0.5"
        })`,
        borderColor: `rgba(${stageColor.base}, 1)`,
        pointRadius: 8,
        pointStyle: stageColor.symbol,
      };
    }),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          lineWidth: 0.5,
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          lineWidth: 0.5,
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white",
          font: {
            size: 14,
          },
          usePointStyle: true,
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "white",
        bodyColor: "white",
        bodyFont: {
          size: 14,
        },
        padding: 12,
        callbacks: {
          label: function (context: any) {
            const { stage, text, pattern } = context.raw;
            console.log(context.raw);
            return stage
              ? [`Stage: ${stage}`, `Transcript: ${text}`]
              : pattern
              ? [`Patterns: ${pattern.join(`\n`)}`, `Transcript: ${text}`]
              : [`Sentence: ${text}`];
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-96">
      <Scatter data={datasets} options={options} />
    </div>
  );
}

export { ScatterTranscript };
