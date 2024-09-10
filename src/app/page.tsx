import BarChart from "@/components/Bar";
import { ScatterPlot } from "@/components/Scatter";
import { Scatter3D } from "@/components/Scatter3D";
import { ScatterSentence } from "@/components/ScatterSentence";
import { getObject } from "@/utils/s3";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const { category } = searchParams;
  const json = await getObject(category + ".json");

  console.log(json);

  return (
    <main className="flex min-h-screen items-center justify-between">
      <div className="flex flex-col gap-8 h-[400px] overflow-y-scroll">
        {/* <Link
          href="/?category=es-overall-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-overall-openai
        </Link>
        <Link
          href="/?category=es-assessment-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-assessment-openai
        </Link>
        <Link
          href="/?category=es-assessment-status-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-assessment-status-openai
        </Link>
        <Link
          href="/?category=es-assessment-status-openai2"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-assessment-status-openai2
        </Link>
        <Link
          href="/?category=es-assessment-status-stage-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-assessment-status-stage-openai
        </Link>
        <Link
          href="/?category=es-assessment-status-stage-openai2"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-assessment-status-stage-openai2
        </Link>
        <Link
          href="/?category=es-strategy-status-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-strategy-status-openai
        </Link>
        <Link
          href="/?category=es-strategy-status-point-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-strategy-status-point-openai
        </Link>
        <Link
          href="/?category=es-strategy-status-stage-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-strategy-status-stage-openai
        </Link> */}
        {/* <Link
          href="/?category=es-status-stage-keyword-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-status-stage-keywordOverall-openai
        </Link>
        <Link
          href="/?category=es-status-stage-keywordStrategy-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-status-stage-keywordStrategy-openai
        </Link>
        <Link
          href="/?category=es-status-stage-keywordAssessment-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          es-status-stage-keywordAssessment-openai
        </Link> */}
        <Link
          href="/?category=es-sentence-openai"
          className="border border-white p-4 hover:bg-white w-60"
        >
          이전 분석
        </Link>
        <Link
          href="/?category=2024-07-week1"
          className="border border-white p-4 hover:bg-white w-60"
        >
          7월 1주차 AMStatus / Stage
        </Link>
        <Link
          href="/?category=2024-07-week1-clustered-10000"
          className="border border-white p-4 hover:bg-white w-60"
        >
          전체 임베딩
        </Link>
        <Link
          href="/?category=2024-07-week1-clustered-test"
          className="border border-white p-4 hover:bg-white w-60"
        >
          status-stage 임베딩
        </Link>
        <Link
          href="/?category=2024-07-week1-clustered-3000"
          className="border border-white p-4 hover:bg-white w-60"
        >
          status-stage-assessment-situation 임베딩 3000
        </Link>
        <Link
          href="/?category=2024-07-week1-clustered-6000"
          className="border border-white p-4 hover:bg-white w-60"
        >
          status-stage-assessment-situation 임베딩 6000
        </Link>
      </div>
      {/* <div>
        {Array(
          json.reduce(
            (acc: number, point: any) => Math.max(acc, point.cluster),
            0
          ) + 1
        )
          .fill("")
          .map((_, i) => i)
          .map((cluster) => {
            const points = json.filter(
              (point: any) => point.cluster === cluster
            );
            return (
              <div key={cluster} className="flex gap-4 items-center">
                <div
                  className="w-8 h-4"
                  style={{
                    backgroundColor: `hsl(${
                      points[0].cluster * 20
                    }, 100%, 50%)`,
                  }}
                />
                {`cluster ${cluster}: ${points[0].common}`}
              </div>
            );
          })}
      </div> */}
      {category === "2024-07-week1" ? (
        <BarChart data={json} />
      ) : (
        <div className="flex-1 items-center flex flex-col">
          <h1 className="text-[24px] mt-20">벡터 임베딩</h1>
          <h2 className="text-[18px] mt-4">표본 개수: {json.length}</h2>
          {category.includes("sentence") ? (
            <ScatterSentence data={json} />
          ) : (
            <ScatterPlot data={json} />
          )}
        </div>
      )}
    </main>
  );
}
