/*
  Warnings:

  - You are about to drop the column `productName` on the `checkoutSessions` table. All the data in the column will be lost.
  - Added the required column `cancelUrl` to the `checkoutSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `checkoutSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiry` to the `checkoutSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `successUrl` to the `checkoutSessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkoutSessions" DROP COLUMN "productName",
ADD COLUMN     "cancelUrl" TEXT NOT NULL,
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "expiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "productNames" JSONB[],
ADD COLUMN     "successUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "webHooks" (
    "id" TEXT NOT NULL,
    "testMode" BOOLEAN NOT NULL,
    "storeId" TEXT NOT NULL,
    "events" TEXT[],

    CONSTRAINT "webHooks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "webHooks_id_key" ON "webHooks"("id");
