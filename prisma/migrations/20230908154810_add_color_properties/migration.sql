/*
  Warnings:

  - Added the required column `dominantColor` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hex` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hueDegree` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isDark` to the `Photo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rgb` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "dominantColor" TEXT NOT NULL,
ADD COLUMN     "hex" TEXT NOT NULL,
ADD COLUMN     "hueDegree" INTEGER NOT NULL,
ADD COLUMN     "isDark" BOOLEAN NOT NULL,
ADD COLUMN     "rgb" TEXT NOT NULL;
