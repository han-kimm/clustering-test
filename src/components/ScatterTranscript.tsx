"use client";

import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

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
    id: string;
  }[];
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchResults, setSearchResults] = useState<
    { id: string; cosineSimilarity: number; group: string }[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchParam = useSearchParams();

  const handleSearch = async () => {
    const searchQuery = inputRef.current?.value;

    if (!searchQuery) {
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `http://localhost:8000/similarity?q=${searchQuery}&p=${searchParam.get(
          "category"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const results = await response.json();

      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Group data by both group and stage
  const groupedData = useMemo(
    () =>
      data.reduce((acc, curr) => {
        const key = `${curr.group}-${curr.stage}`;
        if (!acc[key]) {
          acc[key] = [];
        }

        acc[key].push({
          x: curr.x,
          y: curr.y,
          text: curr.text,
          stage: curr.stage,
          group: curr.group,
          pattern: curr.pattern,
          id: curr.id,
        });
        return acc;
      }, {} as Record<string, { x: number; y: number; text: string; stage: string; pattern: string[]; id: string; group: string }[]>),
    [searchResults]
  );

  const datasets = useMemo(
    () => ({
      datasets: Object.entries(groupedData).map(([key, points]) => {
        const [group] = key.split("-");
        const stageColor = stageColors[group as keyof typeof stageColors] || {
          base: "156, 163, 175",
          symbol: "●",
        };

        return {
          label: group,
          data: points,
          backgroundColor: points.map((point) =>
            searchResults.some((r) => r.id === point.id)
              ? `rgba(${stageColor.base}, 0.8)`
              : searchResults.length > 0
              ? `rgba(${stageColor.base}, 0)`
              : `rgba(${stageColor.base}, 0.1)`
          ),
          borderColor: points.map((point) =>
            searchResults.some((r) => r.id === point.id)
              ? "rgba(255, 255, 0, 1)"
              : `rgba(${stageColor.base}, 0.1)`
          ),
          pointRadius: 8,
          pointStyle: stageColor.symbol,
        };
      }),
    }),
    [searchResults]
  );

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
            const { stage, text, pattern, group } = context.raw;
            console.log(context.raw);
            return stage
              ? [`Stage: ${stage}`, `Transcript: ${text}`]
              : pattern
              ? [`Patterns: ${pattern.join(`\n`)}`, `Transcript: ${text}`]
              : [`Sentence: ${text}`, `Group: ${group}`];
          },
        },
      },
    },
  };

  const group1Length = searchResults.filter((r) => r.group === "group1").length;
  const group2Length = searchResults.filter((r) => r.group === "group2").length;
  const group3Length = searchResults.filter((r) => r.group === "group3").length;

  return (
    <div className="w-full h-[1800px]">
      <div className="flex space-x-2 w-80 mx-auto">
        <input
          type="text"
          ref={inputRef}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Enter search query..."
          className="flex-1 p-2 rounded border border-gray-300 bg-white text-gray-900"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>
      <p className="w-40 mx-auto mt-4">그룹 별 검색 결과 개수</p>
      <div className="w-80 mx-auto flex">
        <span
          className="bg-[#8884d8] px-2 py-1 text-black font-bold inline-block text-center"
          style={{ width: `${group1Length * 3}px` }}
        >
          {group1Length}
        </span>
        <span
          className="bg-[#82ca9d] px-2 py-1 text-black font-bold inline-block text-center"
          style={{ width: `${group2Length * 3}px` }}
        >
          {group2Length}
        </span>
        <span
          className="bg-[#ffc658] px-2 py-1 text-black font-bold inline-block text-center"
          style={{ width: `${group3Length * 3}px` }}
        >
          {group3Length}
        </span>
      </div>
      <Scatter data={datasets} options={options} />
    </div>
  );
}

export { ScatterTranscript };
