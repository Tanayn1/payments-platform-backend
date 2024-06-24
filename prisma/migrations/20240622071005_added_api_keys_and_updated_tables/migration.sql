/*
  Warnings:

  - Added the required column `name` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "priceIds" TEXT[];

-- CreateTable
CREATE TABLE "apiKeys" (
    "id" TEXT NOT NULL,
    "testKey" BOOLEAN NOT NULL,
    "scopes" TEXT[],
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "apiKeys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apiKeys_id_key" ON "apiKeys"("id");
