"use client";

import { useState } from "react";
import DoughnutChart from "./Donut";

function Feature(props: { data: any }) {
  const { data } = props;
  const [selected, setSelected] = useState<null | {
    email: string;
    feature: string;
    characteristic: [];
    violation: [];
  }>(null);
  const selectedFeature = JSON.parse(selected?.feature ?? "{}");

  const violatedAM = data.filter((d: any) => d.violation.length);
  const violated = violatedAM.length;
  const percentage = Math.floor((violated / data.length) * 100);

  const violations = violatedAM.reduce((acc: any, cur: any) => {
    cur.violation.forEach((v: any) => {
      if (acc[v.name]) {
        acc[v.name] += 1;
      } else {
        acc[v.name] = 1;
      }
    });
    return acc;
  }, {});

  const top3 = Object.entries(violations).sort((a: any, b: any) => b[1] - a[1]);

  return (
    <div className="flex w-full h-5/6 gap-8 mt-8">
      <ul className="flex flex-col gap-4 max-h-screen overflow-y-auto shrink-0">
        {data.map((item: any) => (
          <li
            onClick={() => setSelected(item)}
            key={item.email}
            className={`rounded-md p-4 ${
              selected?.email === item.email
                ? "bg-blue-700 text-white"
                : "bg-white text-black"
            } ${item.violation.length ? "border-2 border-blue-700" : ""}`}
          >
            {item.email}
          </li>
        ))}
      </ul>
      {selected ? (
        <div className="h-full overflow-y-auto flex flex-col gap-8">
          <div className="bg-white rounded-md p-4">
            <label className="text-black font-bold text-[24px]">
              AI Report
            </label>
            {["overall", "good", "bad", "improvement"].map((label) => (
              <div key={label} className="flex flex-col gap-4 mb-8">
                <div>
                  <label className="text-black font-bold text-[20px]">
                    {label}
                  </label>
                  <div className="flex flex-wrap">
                    {selectedFeature[label].keyword.map(
                      (item: any, index: number) => (
                        <span
                          key={index}
                          className="bg-gray-100 p-2 rounded-md mr-2 mt-2"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>
                <p className="text-black">{selectedFeature[label].content}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-md p-4 h-full">
            <label className="text-black font-bold text-[24px]">
              Feature (Raw)
            </label>
            <ul className="max-h-[90%] overflow-y-auto my-4">
              {selected.characteristic.map((item: any, index: number) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 text-black rounded-md mb-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-md p-4">
            <label className="text-black font-bold text-[24px]">
              Violation
            </label>
            <ul className="flex flex-col gap-4 my-4">
              {selected.violation.length ? (
                selected.violation.map((item: any, index: number) => (
                  <li
                    key={index}
                    className="bg-gray-100 p-4 text-black rounded-md"
                  >
                    <label className="text-gray-400">Violation name</label>
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                    <label className="text-gray-400">Evidence</label>
                    <p>{item.quote}</p>
                    <label className="text-gray-400">Confidence</label>
                    <div
                      className={`text-white text-center text-[20px] max-w-[20%] ${
                        item.confidence === "high"
                          ? "bg-red-500 w-9/10"
                          : item.confidence === "medium"
                          ? "bg-yellow-500 w-6/10"
                          : "bg-green-500 w-3/10"
                      }`}
                    >
                      {item.confidence}
                    </div>
                  </li>
                ))
              ) : (
                <li className="bg-gray-100 p-4 text-black rounded-md">
                  😊 No violation found
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex gap-12 bg-white p-8 rounded-md w-full">
          <div>
            <label className="text-black font-bold text-[20px]">
              Violating AM Count
            </label>
            <DoughnutChart count={violated} entire={data.length} />
            <p className="text-black text-[20px] text-center mt-8">
              {percentage}%
            </p>
          </div>
          <div className="w-full">
            <label className="text-black font-bold text-[20px]">
              Violation
            </label>
            <ul className="flex flex-col gap-4 h-full overflow-y-auto w-full">
              {top3.map((t: any, i: number) => (
                <li
                  key={i}
                  className="font-bold text-black p-4 bg-gray-100 flex justify-between"
                >
                  {t[0]}
                  <span className="text-blue-700 text-[20px]"> {t[1]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feature;
