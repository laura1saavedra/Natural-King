-- Allow checkout before authentication is implemented.
ALTER TABLE "Order"
ADD COLUMN "recipientEmail" TEXT NOT NULL,
ADD COLUMN "documentType" TEXT NOT NULL,
ADD COLUMN "documentNumber" TEXT NOT NULL,
ADD COLUMN "shippingNeighborhood" TEXT,
ADD COLUMN "shippingMethod" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;
