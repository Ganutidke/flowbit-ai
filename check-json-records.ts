import fs from "fs";

const raw = fs.readFileSync("./data/Analytics_Test_Data.json", "utf-8");
const data = JSON.parse(raw);

console.log(`✅ Total top-level records: ${data.length}`);

let withLineItems = 0;
let withCustomer = 0;

for (const item of data) {
  const llm = item.extractedData?.llmData;
  if (llm?.lineItems?.value?.items?.length) withLineItems++;
  if (llm?.customer?.value?.customerName?.value) withCustomer++;
}

console.log(`🧾 Records with line items: ${withLineItems}`);
console.log(`👤 Records with customer info: ${withCustomer}`);
