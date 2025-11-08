-- DropIndex
DROP INDEX "Customer_name_key";

-- DropIndex
DROP INDEX "Vendor_name_key";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "addressConfidence" DOUBLE PRECISION,
ADD COLUMN     "addressFieldId" TEXT,
ADD COLUMN     "addressPath" TEXT,
ADD COLUMN     "nameConfidence" DOUBLE PRECISION,
ADD COLUMN     "nameFieldId" TEXT,
ADD COLUMN     "namePath" TEXT,
ADD COLUMN     "path" TEXT,
ADD COLUMN     "sourceId" TEXT,
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "invoiceNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" ADD COLUMN     "confidence" DOUBLE PRECISION,
ADD COLUMN     "partyConf" DOUBLE PRECISION,
ADD COLUMN     "partyId" TEXT,
ADD COLUMN     "partyPath" TEXT,
ADD COLUMN     "path" TEXT,
ADD COLUMN     "sourceId" TEXT,
ADD COLUMN     "taxIdConf" DOUBLE PRECISION,
ADD COLUMN     "taxIdId" TEXT,
ADD COLUMN     "taxIdPath" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
