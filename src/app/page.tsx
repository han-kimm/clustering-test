import BarChart from "@/components/Bar";
import { ScatterPlot } from "@/components/Scatter";
import { Scatter3DTranscript } from "@/components/Scatter3DTranscript";
import { ScatterSentence } from "@/components/ScatterSentence";
import { ScatterTranscript } from "@/components/ScatterTranscript";
import { getObject } from "@/utils/s3";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const { category } = searchParams;
  const json = await getObject(category + ".json");

  return (
    <main className="flex min-h-screen items-center justify-between">
      <div className="flex-1 items-center flex flex-col">
        <h1 className="text-[24px] mt-20">벡터 임베딩</h1>
        <h2 className="text-[18px] mt-4">표본 개수: {json.length}</h2>
        {category.includes("3d") ? (
          <Scatter3DTranscript data={json} />
        ) : category.includes("tsne") ? (
          <ScatterTranscript data={json} />
        ) : (
          <ScatterPlot data={json} />
        )}
      </div>
    </main>
  );
}
