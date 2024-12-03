"use client";

import React, { Fragment } from "react";
import {
  Clock,
  Headset,
  AlarmClockCheck,
  Trash2,
  User,
  ListChecks,
  AudioLines,
  Heart,
} from "lucide-react";
import AudioPlayer from "./AudioPlayer";

const CallLogDashboard = () => {
  const callLogs = [
    {
      id: 3,
      callId: "6526741045526528",
      email: "danicha.abenoja@haulla.com",
      startAt: "2024-11-27T20:49:20.368Z",
      externalNumber: "+12142823531",
      contactName: "Dani",
      contactEmail: "",
      contactPhone: "",
      followUpDate: "1 week",
      currentProvider: "Unknown",
      currentRate: 0,
      quotedRate: 0,
      dumpsterSize: "6 yard",
      serviceFrequency: "twice a week",
      sentiment: "neutral",
      summary:
        "Bobby is seeking a new trash service contract due to dissatisfaction with his current provider's recent price increase and poor business practices. He requests quotes for a six-yard container with twice-weekly pickups and an eight-yard container with weekly pickups, aiming to finalize his decision before mid-December before a medical procedure.",
      actionItem: [
        "send email with quotes for 6-yard twice a week and 8-yard once a week",
        "follow up with the customer in one week",
      ],
      text: "Thank you for calling Amad Logistics. Para Espa�ol, press en el 8. If you know your party's extension, please dial it at any time. For sales, press 1. For traffic, press 2. For customer service, press 3. For warehouse, press 4. For accountants, good afternoon. This is Larison. I'm calling about your waste connection dumpster for your trash pickup. Is Augustine available uh no he he's he. Now he is. On vacation? He's on vacation? No, no. Just... He... Not working anymore? Yes, but he returned on Friday. Friday. All right, so I should call back on Friday. Is he the only one handling the trash pickup? Trash pickup? I don't know. The waste connection dumpster. Is he the only one for it? No. Sorry, it's the girl. Sorry, it's the, I can transfer to the other girl, but I don't know if she is, because she is in Salvador, not here in Mexico. But what problem? You had any problem? No worries. I'll call back on Friday. What time? What time should I call back? Okay, he's coming always 9, 9.30, 10, maybe 10 a.m. 9 or 10. Okay. All right. I'll call back on Friday. Thank you. Okay. Thank you. All right. Okay. Bye.",
      publicFilePath:
        "https://dialpad.com/recording/admincallrecording/3jJ6BMPwQjvifHDmN2bCdlqHIqmRK3870SFeIO9Uw6J6",
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">콜 로그 대시보드</h1>

      <div className="grid gap-6">
        {callLogs.map((log) => (
          <CallLog key={log.callId} log={log} />
        ))}
      </div>
    </div>
  );
};

export default CallLogDashboard;

const CallLog = ({
  log,
}: {
  log: {
    id: number;
    externalNumber: string;
    startAt: string;
    followUpDate?: string;
    currentProvider?: string;
    dumpsterSize?: string;
    serviceFrequency?: string;
    contactName?: string;
    contactEmail?: string;
    contactPhone?: string;
    sentiment?: string;
    summary: string;
    actionItem: string[];
    callId: string;
    text: string;
    publicFilePath: string;
  };
}) => {
  const [tap, setTap] = React.useState<"recap" | "audio">("recap");
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <div
      key={log.id}
      className="w-full border p-4 rounded-lg border-black shadow-md"
    >
      <div className="pb-2">
        <div className="flex gap-2 items-center mb-2">
          <Headset className="h-6 w-6" />
          <span className="text-[24px]">
            {log.externalNumber
              ?.replace("+1", "")
              .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-5 w-5" />
          <span>{formatDate(log.startAt)}</span>
        </div>
        <div className="flex justify-between my-4">
          <button
            onClick={() => setTap("recap")}
            className={`w-1/2 px-3 py-1 transition-colors border-b-4  ${
              tap === "recap"
                ? "border-black"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Recap
          </button>
          <button
            onClick={() => setTap("audio")}
            className={`w-1/2 px-3 py-1 transition-colors border-b-4  ${
              tap === "audio"
                ? "border-black"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Audio
          </button>
        </div>
      </div>
      <div className="w-full">
        {tap === "recap" ? (
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <AlarmClockCheck className="h-5 w-5" />
                <span className="font-semibold">Follow-up call:</span>
                <div className="flex items-center gap-2 rounded bg-black text-white px-2">
                  {log.followUpDate}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {log.currentProvider ||
              log.dumpsterSize ||
              log.serviceFrequency ? (
                <div className="flex gap-2 font-semibold">
                  <Trash2 className="h-5 w-5" />
                  <p>Service Information</p>
                </div>
              ) : null}
              {log.currentProvider && (
                <div className="text-gray-600 pl-8">
                  <span className="font-medium mr-2">Provider:</span>
                  <span className="bg-gray-200 text-black px-2 rounded py-1">
                    {log.currentProvider}
                  </span>
                </div>
              )}
              {log.dumpsterSize && (
                <div className="text-gray-600 pl-8">
                  <span className="font-medium mr-2">Size:</span>
                  <span className="bg-gray-200 text-black px-2 rounded py-1">
                    {log.dumpsterSize}
                  </span>
                </div>
              )}
              {log.serviceFrequency && (
                <div className="text-gray-600 pl-8">
                  <span className="font-medium mr-2">Frequency:</span>
                  <span className="bg-gray-200 text-black px-2 rounded py-1">
                    {log.serviceFrequency}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex gap-2 font-semibold">
                <User className="h-5 w-5" />
                <p>Contact Information</p>
              </div>
              {log.contactName && (
                <div className="text-gray-600 pl-8">
                  <span className="font-medium mr-2">Name:</span>
                  <span className="bg-gray-200 text-black px-2 rounded py-1">
                    {log.contactName}
                  </span>
                </div>
              )}
              {log.contactEmail && (
                <div className="text-gray-600">
                  <span className="font-medium mr-2">Email:</span>
                  <span className="bg-gray-200 text-black px-2 rounded py-1">
                    {log.contactEmail}
                  </span>
                </div>
              )}
              {log.contactPhone && (
                <div className="text-gray-600">
                  <span className="font-medium mr-2">Phone:</span>
                  <span className="bg-gray-200 text-black px-2 rounded py-1">
                    {log.contactPhone}
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {log.sentiment && (
                <div className="flex gap-2">
                  <Heart className="h-5 w-5" />
                  <p className="font-semibold">Customer Sentiment</p>
                  <span
                    className={`px-2 rounded ${
                      log.sentiment === "positive"
                        ? "bg-blue-500 text-white"
                        : log.sentiment === "negative"
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {log.sentiment}
                  </span>
                </div>
              )}
              {log.summary && (
                <>
                  <div className="flex gap-2 pt-3">
                    <AudioLines className="h-5 w-5" />
                    <span className="font-semibold">Summary</span>
                  </div>
                  <p className="pl-8">{log.summary}</p>
                </>
              )}
              <div className="flex gap-2 font-semibold pt-3">
                <ListChecks className="h-5 w-5" />
                <span>Action Item</span>
              </div>
              <ul className="pl-8 mt-1 text-[16px]">
                {log.actionItem.map((item, index) => (
                  <div key={index} className="flex items-baseline">
                    <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="ml-2">{item}</p>
                  </div>
                ))}
              </ul>
            </div>
            <span className="text-sm text-gray-500 text-right md:text-left">
              Call ID: {log.callId}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 w-full">
            <AudioPlayer url={log.publicFilePath} />
            <div>
              {log.text.split(/(?<=[.!?])\s+/).map((sentence, index) => (
                <div key={index} className="flex items-baseline gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 text-blue-600 text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{sentence.trim()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
