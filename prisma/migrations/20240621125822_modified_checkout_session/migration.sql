/*
  Warnings:

  - You are about to drop the column `priceId` on the `checkoutSessions` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `checkoutSessions` table. All the data in the column will be lost.
  - Added the required column `currency` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkoutSessions" DROP COLUMN "priceId",
DROP COLUMN "productId",
ADD COLUMN     "priceIds" TEXT[],
ADD COLUMN     "productIds" TEXT[];

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "currency" TEXT NOT NULL;
