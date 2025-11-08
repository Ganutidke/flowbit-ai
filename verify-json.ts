import fs from "fs";

const raw = fs.readFileSync("./data/Analytics_Test_Data.json", "utf-8");
const data = JSON.parse(raw);

console.log("Total records:", data.length);

for (let i = 0; i < 3; i++) {
  const item = data[i];
  const llm = item.extractedData?.llmData;

  if (!llm) {
    console.log(`Record ${i + 1}: No LLM data found`);
    continue;
  }

  const customer = llm.customer || {};
  const cVal = customer.value || {};

  const nameField = cVal.customerName || {};
  const addrField = cVal.customerAddress || {};

  console.log(`\n📦 Record ${i + 1}`);
  console.log("customer.id:", customer.id);
  console.log("customer.path:", customer.path);
  console.log("customerName.value:", nameField.value);
  console.log("customerName.id:", nameField.id);
  console.log("customerName.path:", nameField.path);
  console.log("customerName.confidence:", nameField.confidence);
  console.log("customerAddress.value:", addrField.value);
  console.log("customerAddress.id:", addrField.id);
  console.log("customerAddress.path:", addrField.path);
  console.log("customerAddress.confidence:", addrField.confidence);
}
