/*
  Warnings:

  - You are about to drop the column `discription` on the `Pieces` table. All the data in the column will be lost.
  - You are about to drop the column `refernece` on the `Pieces` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pieces" DROP COLUMN "discription",
DROP COLUMN "refernece",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "reference" TEXT NOT NULL DEFAULT 'UNKNOWN';
