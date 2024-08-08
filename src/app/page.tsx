import { ScatterPlot } from "@/components/Scatter";
import { getObject } from "@/utils/s3";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const { category = "AMAnalysis" } = searchParams;
  const json = await getObject(category + ".json");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-20">
        <Link
          href="/?category=AMAnalysis"
          className="border border-white p-4 hover:bg-white"
        >
          AMAnalysis
        </Link>
        <Link
          href="/?category=customerAnalysis"
          className="border border-white p-4 hover:bg-white"
        >
          customerAnalysis
        </Link>
        <Link
          href="/?category=afterCallAction"
          className="border border-white p-4 hover:bg-white"
        >
          afterCallAction
        </Link>
      </div>
      <h1 className="text-[24px]">벡터 임베딩 간 유사도 : {category}</h1>
      <ScatterPlot data={json} />
    </main>
  );
}
