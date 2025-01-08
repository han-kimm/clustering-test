"use client";

import { MessageSquare, Phone, User } from "lucide-react";
import AudioPlayer from "@/components/AudioPlayer";
import { useState } from "react";

interface Transcript {
  callId: string;
  publicFilePath: string;
  dialog: {
    startAt: number;
    endAt: number;
    speaker: string;
    text: string;
    label?: string;
  }[];
}

const getSpeakerColor = (label: string) => {
  switch (label.toLowerCase()) {
    case "agent":
      return "bg-blue-100";
    case "record voice":
      return "bg-gray-100";
    case "customer":
      return "bg-green-100";
    default:
      return "bg-gray-50";
  }
};

const getSpeakerIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "agent":
      return <User className="w-5 h-5 text-blue-500" />;
    case "record voice":
      return <Phone className="w-5 h-5 text-gray-500" />;
    case "customer":
      return <MessageSquare className="w-5 h-5 text-green-500" />;
    default:
      return <MessageSquare className="w-5 h-5 text-gray-500" />;
  }
};

function Dialog({ data }: { data: Transcript }) {
  const [focusTime, setFocusTime] = useState<[number]>();
  const [currenTime, setCurrentTime] = useState<number>(0);
  const onTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };
  const isCurrentMessage = (startAt: number, endAt: number) => {
    return currenTime >= startAt && currenTime <= endAt;
  };
  return (
    <div className="w-[400px] flex flex-col items-center">
      <AudioPlayer
        url={data.publicFilePath}
        focusTime={focusTime}
        onTimeUpdate={onTimeUpdate}
      />
      <div className="w-full max-h-[500px] p-4 space-y-4 overflow-y-auto">
        {data.dialog.map((message, index) => (
          <button
            key={index}
            onClick={() => setFocusTime([message.startAt])}
            className={`w-full flex items-start p-4 rounded-lg ${
              isCurrentMessage(message.startAt, message.endAt)
                ? "border-[1px] border-black font-medium"
                : ""
            } ${getSpeakerColor(message.label || message.speaker)}`}
          >
            <div className="mr-3">
              {getSpeakerIcon(message.label || message.speaker)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold">
                  {message.label || message.speaker}
                </span>
                <span className="text-xs text-gray-500">
                  {Math.round(message.startAt)} - {Math.round(message.endAt)}s
                </span>
              </div>
              <p className="text-gray-700 text-start">{message.text}</p>
            </div>
          </button>
        ))}
        <div className="flex items-center justify-center pt-4">
          <div className="w-1/2 h-0.5 bg-gray-200"></div>
          <p className="mx-4 text-gray-500 shrink-0">End of Call</p>
          <div className="w-1/2 h-0.5 bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}

export { Dialog };
