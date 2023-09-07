/*
  Warnings:

  - You are about to drop the column `gridColumnSpan` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "gridColumnSpan",
ADD COLUMN     "aspectRatio" TEXT;

-- DropTable
DROP TABLE "Video";
