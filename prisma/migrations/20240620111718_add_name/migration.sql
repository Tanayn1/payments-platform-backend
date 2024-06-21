/*
  Warnings:

  - The `trialPeriod` column on the `checkoutSessions` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `productName` to the `checkoutSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkoutSessions" ADD COLUMN     "productName" TEXT NOT NULL,
DROP COLUMN "trialPeriod",
ADD COLUMN     "trialPeriod" INTEGER;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "priceId" TEXT NOT NULL;
