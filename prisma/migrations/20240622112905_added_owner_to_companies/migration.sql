/*
  Warnings:

  - Added the required column `storeId` to the `apiKeys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `webhook` to the `webHookResponses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apiKeys" ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "webHookResponses" ADD COLUMN     "webhook" JSONB NOT NULL;
