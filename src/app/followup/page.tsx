import QuartileComparison from "@/components/FollowupQuarter";
import FollowUpRatio from "@/components/FollowupRatio";

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
          <span className="bg-gray-200 p-1 rounded ">Call log ?</span>→
          <span className="bg-gray-200 p-1 rounded ">Follow-up</span>
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
      <h1 className="text-[28px] mr-auto ml-8 my-8 bg-gray-600 text-white rounded px-2">
        사분위수 분석
      </h1>
      <QuartileComparison />
      <hr className="w-full my-4" />
      <h1 className="text-[28px] mr-auto ml-8 my-8 bg-gray-600 text-white rounded px-2">
        상관 관계 분석
      </h1>
      <FollowUpRatio />
    </div>
  );
};

export default FollowUpPage;
