"use client";

import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend, zoomPlugin);

function ScatterSentence({
  data,
}: {
  data: {
    x: number;
    y: number;
    cluster: number;
    callId: string;
    text: string;
    stage: string;
    caller: string;
    point: string;
    group: string;
    label: string;
    goodSentence: string;
    badSentence: string;
  }[];
}) {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [goodSentences, setGoodSentences] = React.useState<string[]>([]);
  const [badSentences, setBadSentences] = React.useState<string[]>([]);

  const datasets = {
    datasets: [
      "Temporary-0",
      "Temporary-1",
      "Temporary-2",
      "Regular-0",
      "Regular-1",
      "Regular-2",
      "Regular-3",
      "Regular-4",
    ].map((group, idx) => {
      const points = data.filter((point) => point.group === group);
      return {
        label: `${points[0].group} | ${points[0].label}`,
        data: points.map((point) => ({
          x: point.x,
          y: point.y,
          callId: point.callId,
          text: point.text,
          stage: point.stage,
          caller: point.caller,
          point: point.point,
          goodSentence: point.goodSentence,
          badSentence: point.badSentence,
        })),
        backgroundColor: `hsl(${idx * 100}, 100%, 50%)`,
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
            return [
              `Call ID: ${point.callId}`,
              `Call stage: ${point.stage}`,
              `AM status : ${point.caller}`,
              `Good Sentence : ${point.goodSentence}`,
              `Bad Sentence : ${point.badSentence}`,
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
            if (goodSentences.length || badSentences.length) {
              setGoodSentences([]);
              setBadSentences([]);
            }
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
                setGoodSentences((prev) => [...prev, point.goodSentence]);
                setBadSentences((prev) => [...prev, point.badSentence]);
              }
            });
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

        if (goodSentences.includes(point.goodSentence)) {
          setGoodSentences((prev) =>
            prev.filter((sentence) => sentence !== point.goodSentence)
          );
        } else {
          setGoodSentences((prev) => [...prev, point.goodSentence]);
        }

        if (badSentences.includes(point.badSentence)) {
          setBadSentences((prev) =>
            prev.filter((sentence) => sentence !== point.badSentence)
          );
        } else {
          setBadSentences((prev) => [...prev, point.badSentence]);
        }
      }
    },
  };

  return (
    <>
      <Scatter data={datasets} options={options} />
      {/* <div>[{selected.join(",")}]</div> */}
      <div className="flex gap-20">
        <div className="flex flex-col gap-4">
          <h1 className="font-bold">Good Sentences</h1>
          {goodSentences.map((sentence) => (
            <div key={sentence} className="text-white">
              {sentence}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold">Bad Sentences</h1>
          {badSentences.map((sentence) => (
            <div key={sentence} className="text-white">
              {sentence}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export { ScatterSentence };
