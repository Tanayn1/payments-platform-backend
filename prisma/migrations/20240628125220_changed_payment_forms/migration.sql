/*
  Warnings:

  - You are about to drop the column `priceIds` on the `paymentForms` table. All the data in the column will be lost.
  - The `productIds` column on the `paymentForms` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "paymentForms" DROP COLUMN "priceIds",
ADD COLUMN     "pricesIds" JSONB[],
DROP COLUMN "productIds",
ADD COLUMN     "productIds" JSONB[];
