/*
  Warnings:

  - Added the required column `amount` to the `checkoutSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `prices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkoutSessions" ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "prices" ADD COLUMN     "price" INTEGER NOT NULL;
