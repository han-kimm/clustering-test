"use client";

import SeniorAMComparison from "@/components/DivideSeniorFollowUp";
import QuartileComparison from "@/components/FollowupQuarter";
import FollowUpRatio from "@/components/FollowupRatio";
import StatusFollowupChart from "@/components/StatusFollowup";
import StatusRadarComparison from "@/components/StatusRader";
import TeamPerformance from "@/components/TeamFollowUp";

const FollowUpPage = () => {
  return (
    <div className="w-full h-full flex items-center flex-col bg-white text-black">
      <h1 className="text-[32px] my-8 bg-gray-900 text-white rounded px-4 self-start ml-8">
        Follow-up vs Sales Metrics
      </h1>
      <div className="flex flex-col w-full pl-8">
        <div className="flex gap-2 mb-4 text-[18px]">
          Follow-up Check 방법 :
          <span className="bg-gray-200 p-1 rounded ">Voicemail ?</span>→
          <span className="bg-gray-200 p-1 rounded ">Callback Schedule ?</span>→
          <span className="bg-gray-200 p-1 rounded ">After Call log ?</span>→
          <span className="bg-gray-200 p-1 rounded ">Verify Follow-up</span>
        </div>
        <div className="text-[18px] mb-8">
          표본 수집 기간: 11.03 - 11.08
          <br /> 표본 개수: 50,000
          <br /> Voicemail 제외 표본 개수: 16,894
          <br /> 분석 대상 AM : 54
        </div>
        <div className="text-[24px]">
          평균 Follow-up Ratio:{" "}
          <span className="underline text-[24px]">50%</span>
        </div>
      </div>
      <hr className="w-full my-4" />
      <h1 className="text-[30px] my-8 font-semibold">1. 사분위수 분석</h1>
      <QuartileComparison />
      <hr className="w-full my-4" />
      <h1 className="text-[30px] my-8 font-semibold">2. 상관 관계 분석</h1>
      <FollowUpRatio />
      <h1 className="text-[30px] my-8 font-semibold">3. Team & FollowUp</h1>
      <TeamPerformance />
      <h1 className="text-[30px] my-8 font-semibold">
        4. Years of Service & FollowUp
      </h1>
      <StatusFollowupChart />
      <StatusRadarComparison />
      <h1 className="text-[30px] my-8 font-semibold">
        5. Senior AM & Others Comparison
      </h1>
      <SeniorAMComparison />
    </div>
  );
};

export default FollowUpPage;
