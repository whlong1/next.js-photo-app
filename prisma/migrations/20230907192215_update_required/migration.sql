/*
  Warnings:

  - Made the column `fileSize` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileName` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mimeType` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `height` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `width` on table `Photo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `aspectRatio` on table `Photo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "fileSize" SET NOT NULL,
ALTER COLUMN "fileName" SET NOT NULL,
ALTER COLUMN "mimeType" SET NOT NULL,
ALTER COLUMN "height" SET NOT NULL,
ALTER COLUMN "width" SET NOT NULL,
ALTER COLUMN "aspectRatio" SET NOT NULL;
