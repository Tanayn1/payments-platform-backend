/*
  Warnings:

  - Added the required column `webhookUrl` to the `webHooks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "webHooks" ADD COLUMN     "webhookUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "webHookResponses" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "testMode" BOOLEAN NOT NULL,
    "response" JSONB NOT NULL,
    "webhookUrl" TEXT NOT NULL,

    CONSTRAINT "webHookResponses_pkey" PRIMARY KEY ("id")
);
