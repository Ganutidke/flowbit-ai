import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const raw = fs.readFileSync("./data/Analytics_Test_Data.json", "utf-8");
  const data = JSON.parse(raw);

  console.log(`🚀 Found ${data.length} records. Starting seeding...`);

  for (const item of data) {
    const llm = item.extractedData?.llmData || {};

    /* ────────────────────────────────
       Extract Vendor
    ──────────────────────────────── */
    const vendor = llm.vendor || {};
    const vendorVal = vendor.value || {};
    const vendorName = vendorVal.vendorName?.value || null;
    const vendorTaxId = vendorVal.vendorTaxId?.value || null;
    const vendorPartyNumber = vendorVal.vendorPartyNumber?.value || null;

    const vendorRec = vendorName
      ? await prisma.vendor.upsert({
          where: { name: vendorName },
          update: {},
          create: {
            name: vendorName,
            sourceId: vendor.id,
            path: vendor.path,
            taxId: vendorTaxId,
            partyNumber: vendorPartyNumber,
          },
        })
      : null;

    /* ────────────────────────────────
       Extract Customer
    ──────────────────────────────── */
    const customer = llm.customer || {};
    const custVal = customer.value || {};
    const custName = custVal.customerName?.value || null;
    const custAddress = custVal.customerAddress?.value || null;

    const customerRec = custName
      ? await prisma.customer.upsert({
          where: { name: custName },
          update: {},
          create: {
            name: custName,
            address: custAddress,
            sourceId: customer.id,
            path: customer.path,
          },
        })
      : null;

    /* ────────────────────────────────
       Extract Invoice
    ──────────────────────────────── */
    const invoice = llm.invoice?.value || {};
    const summary = llm.summary?.value || {};
    const invoiceNumber = invoice.invoiceId?.value || null;
    const invoiceDate = invoice.invoiceDate?.value
      ? new Date(invoice.invoiceDate.value)
      : null;
    const deliveryDate = invoice.deliveryDate?.value
      ? new Date(invoice.deliveryDate.value)
      : null;
    const status = invoice.status?.value || "Pending";

    const subtotal = parseFloat(summary.subtotal?.value || 0);
    const totalTax = parseFloat(summary.totalTax?.value || 0);
    const total = parseFloat(summary.invoiceTotal?.value || 0);
    const currency = summary.currency?.value || "INR";

    const invoiceRec = await prisma.invoice.create({
      data: {
        invoiceNumber,
        invoiceDate,
        deliveryDate,
        status,
        subtotal,
        totalTax,
        total,
        currency,
        vendorId: vendorRec?.id || null,
        customerId: customerRec?.id || null,
      },
    });

    /* ────────────────────────────────
       Extract Line Items
    ──────────────────────────────── */
    const lineItemsValue = llm.lineItems?.value?.items?.value;
    const lineItems = Array.isArray(lineItemsValue) ? lineItemsValue : [];

    for (const li of lineItems) {
      const desc = li.description?.value || null;
      const qty = li.quantity?.value ?? 0;
      const unit = li.unitPrice?.value ?? 0;
      const total = li.totalPrice?.value ?? 0;
      const vat = li.vatRate?.value ?? 0;

      await prisma.lineItem.create({
        data: {
          invoiceId: invoiceRec.id,
          description: desc,
          quantity: parseFloat(qty),
          unitPrice: parseFloat(unit),
          totalPrice: parseFloat(total),
          vatRate: parseFloat(vat),
        },
      });
    }

    /* ────────────────────────────────
       Extract Payment
    ──────────────────────────────── */
    /* ────────────────────────────────
   Extract Payment (Enhanced)
──────────────────────────────── */
    const pay = llm.payment?.value || {};

    // Generate a realistic random due date (1–90 days ahead)
    const randomDays = Math.floor(Math.random() * 90) + 1;
    const dueDate = pay.dueDate?.value
      ? new Date(pay.dueDate.value)
      : (() => {
          const d = new Date();
          d.setDate(d.getDate() + randomDays);
          return d;
        })();

    // Derive a realistic total if missing
    const baseTotal = parseFloat(llm.summary?.value?.invoiceTotal?.value || 0);
    const discountPercent =
      parseFloat(pay.discountPercentage?.value || 0) ||
      Math.floor(Math.random() * 10);
    const discountedTotal =
      parseFloat(pay.discountedTotal?.value || 0) ||
      baseTotal * (1 - discountPercent / 100);

    await prisma.payment.create({
      data: {
        invoiceId: invoiceRec.id,
        dueDate,
        netDays: pay.netDays?.value || randomDays,
        discountedTotal,
        discountPercent,
      },
    });
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    const count = await prisma.lineItem.count();
    console.log("💡 Total line items in DB:", count);

    await prisma.$disconnect();
  });
