import * as fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import * as sklearn from "sklearn";
import { OpenAIEmbeddings } from "@langchain/openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const embeddingOpenAI = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  model: "text-embedding-3-large",
});

async function embed(text: string) {
  const embeddings = await embeddingOpenAI.embedDocuments([text]);
  return embeddings[0];
}

async function loadJson(path: string) {
  const data = await fs.readFile(path, "utf-8");
  return JSON.parse(data);
}

async function embeddingJSON() {
  const data = await loadJson(join(__dirname, "summarization-gpt-4o.json"));
  const results = await Promise.allSettled(
    data.map((d: any) => embed(d.AMAnalysis))
  );
  const embeddings = results.map((r: any) => r.value);

  const output = data.map((d: any, i: number) => {
    return {
      ...d,
      AMAnalysisEmbedding: embeddings[i],
    };
  });

  await fs.writeFile(
    join(__dirname, "summarization-gpt-4o-embedding.json"),
    JSON.stringify(output, null, 2)
  );
}

export async function getCluster() {
  const data: {
    callId: number;
    AMAnalysis: string;
    AMAnalysisEmbedding: number[];
  }[] = await loadJson(join(__dirname, "summarization-gpt-4o-embedding.json"));
  const embeddings = data
    .map((d) => d.AMAnalysisEmbedding)
    .filter((d) => d?.length);

  const labels = data.map((d) => ({ callId: d.callId, text: d.AMAnalysis }));

  const py = await sklearn.createPythonBridge();

  const tsne = new sklearn.TSNE({
    n_components: 2,
    perplexity: 2,
  });
  await tsne.init(py);

  const location = await tsne.fit_transform({ X: embeddings });

  const kmeans = new sklearn.KMeans({
    n_clusters: 5,
  });
  await kmeans.init(py);

  const cluster = await kmeans.fit_predict({ X: embeddings });

  await tsne.dispose();
  await py.disconnect();

  const labeledResults = location.map(
    (point: [number, number], index: number) => ({
      x: point[0],
      y: point[1],
      cluster: cluster[index],
      ...labels[index],
    })
  );

  return labeledResults;
}
