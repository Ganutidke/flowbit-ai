import fs from "fs";

const raw = fs.readFileSync("./data/Analytics_Test_Data.json", "utf-8");
const data = JSON.parse(raw);

for (let i = 0; i < Math.min(data.length, 3); i++) {
  const llm = data[i].extractedData?.llmData;
  if (llm?.lineItems) {
    console.log(`\n📦 Record ${i + 1}`);
    console.dir(llm.lineItems, { depth: 6 });
  }
}
