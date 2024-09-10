"use client";

import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import axios from "axios";
import { useSearchParams } from "next/navigation";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, zoomPlugin);

function ScatterPlot({
  data,
}: {
  data: {
    x: number;
    y: number;
    cluster: number;
    callId: string;
    stage: string;
    situation: string;
    assessment: string;
    AMStatus: string;
    goodSpeech: string;
    badSpeech: string;
  }[];
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [view, setView] = useState("AMStatus");
  const [query, setQuery] = useState("");
  const [queryResult, setQueryResult] = useState<any[]>([]);
  const queryResultCallIds = queryResult.map((r) => r.callId);
  const searchParams = useSearchParams();

  const datasets = {
    datasets: (view === "AMStatus"
      ? ["Temporary", "Regular"]
      : Array(data.reduce((acc, point) => Math.max(acc, point.cluster), 0) + 1)
          .fill("")
          .map((_, i) => i)
    ).map((cluster, idx) => {
      let points = data.filter(
        (point) =>
          point[view === "AMStatus" ? "AMStatus" : "cluster"] === cluster
      );

      // queryResult에 해당하는 callId를 가지고 있으면 나중에 그려지도록 정렬
      points = points.sort((a, b) =>
        queryResultCallIds.includes(a.callId) ? 1 : -1
      );

      return {
        label: cluster,
        data: points.map((point) => ({
          x: point.x,
          y: point.y,
          callId: point.callId,
          stage: point.stage,
          situation: point.situation,
          assessment: point.assessment,
          AMStatus: point.AMStatus,
          goodSpeech: point.goodSpeech,
          badSpeech: point.badSpeech,
        })),
        backgroundColor: queryResult.length
          ? points.map((point) =>
              queryResultCallIds.includes(point.callId)
                ? "yellow"
                : `hsl(${idx * 100}, 100%, 10%)`
            )
          : `hsl(${idx * 100}, 100%, 50%)`,
      };
    }),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          color: "white", // x축 그리드 라인 색상을 흰색으로 설정
          lineWidth: 0.5, // x축 그리드 라인 굵기 설정
        },
      },
      y: {
        grid: {
          color: "white", // y축 그리드 라인 색상을 흰색으로 설정
          lineWidth: 0.5, // y축 그리드 라인 굵기 설정
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // 레이블 색상을 흰색으로 설정
          font: {
            size: 16, // 레이블 폰트 크기를 16으로 설정
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 16, // 툴팁 폰트 크기를 16으로 설정
        },
        callbacks: {
          label: function (context: any) {
            const point = context.raw;
            const { assessment } = point;
            return [
              `Call ID: ${point.callId}`,
              `Call stage: ${point.stage}`,
              `AM status : ${point.AMStatus}`,
              `Assessment : ${assessment}`,
              `Situation : ${point.situation}`,
              // `Good Speech : ${point.goodSpeech}`,
              // `Bad Speech : ${point.badSpeech}`,
            ];
          },
        },
      },
      zoom: {
        zoom: {
          drag: {
            enabled: true,
            borderColor: "rgba(0, 0, 0, 0.1)",
            borderWidth: 1,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          onZoomComplete: ({ chart }: any) => {
            const xScale = chart.scales["x"];
            const yScale = chart.scales["y"];
            const selectedPoints: string[] = [];

            data.forEach((point) => {
              if (
                point.x >= xScale.min &&
                point.x <= xScale.max &&
                point.y >= yScale.min &&
                point.y <= yScale.max
              ) {
                selectedPoints.push(point.callId);
              }
            });

            setSelected(selectedPoints);
          },
        },
      },
    },
    onClick: function (evt: any, elements: any) {
      if (elements.length > 0) {
        const element = elements[0];
        const index = element.index;
        const point = data[index];

        if (selected.includes(point.callId)) {
          setSelected((prev) => prev.filter((id) => id !== point.callId));
        } else {
          setSelected((prev) => [...prev, point.callId]);
        }
      }
    },
  };

  return (
    <>
      <button
        onClick={() =>
          setView((prev) => (prev === "AMStatus" ? "" : "AMStatus"))
        }
        className="border border-white p-2 rounded-md self-end hover:bg-white"
      >
        switch cluster and AMStatus
      </button>
      <Scatter data={datasets as any} options={options} />
      {/* <div>[{selected.join(",")}]</div> */}
      <div className="w-full">
        <label className="text-white mr-2">벡터 유사도 검색</label>
        <input
          placeholder="The call is..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={async (e) => {
            if (!query) {
              setQueryResult([]);
              return;
            }
            if (e.key === "Enter") {
              const response = await axios.get(
                `http://localhost:8000/similarity?q=${query}&p=${searchParams.get(
                  "category"
                )}`
              );

              console.log(response.data);

              if (response.status === 200) {
                setQueryResult(response.data);
              }
            }
          }}
          className="text-black rounded-md p-2 w-1/2"
        />
        <button
          onClick={() => (setQuery(""), setQueryResult([]))}
          className="p-2 border border-white rounded-md ml-2"
        >
          Reset
        </button>
      </div>
      <div className="flex gap-2">
        <div className="w-1/2">
          <p>Good Sentence</p>
          <ul className="flex flex-col gap-2">
            {(queryResult.length ? queryResult : selected).map((callId) => {
              const point = data.find(
                (point) =>
                  point.callId === (queryResult.length ? callId.callId : callId)
              );
              return (
                <li
                  key={callId}
                  className="bg-white text-black p-2 rounded-md h-40"
                >
                  {point?.goodSpeech}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-1/2">
          <p>Bad Sentence</p>
          <ul className="flex flex-col gap-2">
            {(queryResult.length ? queryResult : selected).map((callId) => {
              const point = data.find(
                (point) =>
                  point.callId === (queryResult.length ? callId.callId : callId)
              );
              return (
                <li
                  key={callId}
                  className="bg-white text-black p-2 rounded-md h-40"
                >
                  {point?.badSpeech}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export { ScatterPlot };
