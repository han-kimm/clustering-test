import { AdditionalComparison } from "@/components/AdditionalComparison";
import { LocalTimeBar } from "@/components/LocalTimeBar";
import StateAnalytics from "@/components/MarketState";
import { NewTimeBar } from "@/components/NewTimeBar";
import CityComparisonChart from "@/components/NotInterestedCity";
import { StaffTimeBar } from "@/components/StaffTimeBar";
import { TimeBar } from "@/components/TimeBar";

const AdditionalPage = () => {
  return (
    <div className="w-full h-full flex items-center flex-col bg-white text-black">
      <h1 className="text-[32px] py-8">1. Market Research</h1>
      <h1 className="text-[28px] py-8">1-1. State</h1>
      <StateAnalytics />
      <h1 className="text-[28px] py-8">1-2. City</h1>
      <AdditionalComparison />
      <h1 className="text-[32px] py-8 text-center">3. Time Research</h1>
      <TimeBar />
      <LocalTimeBar />
      <NewTimeBar />
      <StaffTimeBar />
    </div>
  );
};

export default AdditionalPage;
