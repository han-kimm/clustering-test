import Feature from "@/components/Feature";
import { getObject } from "@/utils/s3";

export const dynamic = "force-dynamic";

async function AMPage() {
  const json = await getObject("2024-07-09-feature.json");

  return (
    <div className="h-dvh w-dvw bg-gray-100 p-4 text-blue-700 text-blue-700">
      <div className="flex gap-12 items-center">
        <h1 className="font-bold text-[28px]">AM Characteristic Analysis</h1>
      </div>
      <Feature data={json} />
    </div>
  );
}

export default AMPage;
