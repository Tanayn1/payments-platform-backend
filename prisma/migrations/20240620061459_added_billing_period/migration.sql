/*
  Warnings:

  - Added the required column `testmode` to the `checkoutSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `checkoutSessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testmode` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testmode` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testmode` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testmode` to the `prices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testmode` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testmode` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "checkoutSessions" ADD COLUMN     "billingPeriod" TEXT,
ADD COLUMN     "testmode" BOOLEAN NOT NULL,
ADD COLUMN     "trialPeriod" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "testmode" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "testmode" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "testmode" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "prices" ADD COLUMN     "billingPeriod" TEXT,
ADD COLUMN     "testmode" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "testmode" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "testmode" BOOLEAN NOT NULL;
