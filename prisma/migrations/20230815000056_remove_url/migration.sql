/*
  Warnings:

  - You are about to drop the column `urlPath` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "urlPath",
ALTER COLUMN "fileSize" DROP NOT NULL,
ALTER COLUMN "fileName" DROP NOT NULL,
ALTER COLUMN "mimeType" DROP NOT NULL;
