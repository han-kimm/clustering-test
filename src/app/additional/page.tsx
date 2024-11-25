import { AdditionalComparison } from "@/components/AdditionalComparison";
import { LocalTimeBar } from "@/components/LocalTimeBar";
import StateAnalytics from "@/components/MarketState";
import { NewTimeBar } from "@/components/NewTimeBar";
import { StaffTimeBar } from "@/components/StaffTimeBar";
import { TimeBar } from "@/components/TimeBar";

const AdditionalPage = () => {
  return (
    <div className="w-full h-full flex items-center flex-col bg-white text-black gap-20">
      <StateAnalytics />
      <AdditionalComparison />
      <TimeBar />
      <LocalTimeBar />
      <NewTimeBar />
      <StaffTimeBar />
    </div>
  );
};

export default AdditionalPage;
