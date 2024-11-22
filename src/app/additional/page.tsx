import { AdditionalComparison } from "@/components/AdditionalComparison";
import StateAnalytics from "@/components/MarketState";
import { TimeBar } from "@/components/TimeBar";

const AdditionalPage = () => {
  return (
    <div className="w-full h-full flex items-center flex-col bg-white text-black gap-20">
      <TimeBar />
      <StateAnalytics />
      <AdditionalComparison />
    </div>
  );
};

export default AdditionalPage;
