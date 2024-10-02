"use client";

import { useState } from "react";

function Feature(props: { data: any }) {
  const { data } = props;
  const [selected, setSelected] = useState<null | {
    email: string;
    feature: string;
    characteristic: [];
    violation: [];
  }>(null);

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
            } ${item.violation.length ? "border-4 border-blue-700" : ""}`}
          >
            {item.email}
          </li>
        ))}
      </ul>
      {selected && (
        <div className="bg-white rounded-md p-4 h-full overflow-y-auto">
          <label className="text-black font-bold text-[20px]">Summary</label>
          <p className="bg-gray-100 p-4 text-black mb-8 whitespace-break-spaces">
            {selected.feature}
          </p>
          <label className="text-black font-bold text-[20px]">Feature</label>
          <ul className="max-h-[30%] overflow-y-auto mb-8">
            {selected.characteristic.map((item: any, index: number) => (
              <li
                key={index}
                className="bg-gray-100 p-4 text-black rounded-md mb-4"
              >
                {item}
              </li>
            ))}
          </ul>
          <label className="text-black font-bold text-[20px]">Violation</label>
          <ul>
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
                    className={`text-white text-center text-[20px] ${
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
      )}
    </div>
  );
}

export default Feature;
