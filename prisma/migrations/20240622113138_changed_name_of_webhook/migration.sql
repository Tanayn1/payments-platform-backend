/*
  Warnings:

  - You are about to drop the column `webhook` on the `webHookResponses` table. All the data in the column will be lost.
  - Added the required column `webhookSent` to the `webHookResponses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "webHookResponses" DROP COLUMN "webhook",
ADD COLUMN     "webhookSent" JSONB NOT NULL;
