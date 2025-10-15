/*
  Warnings:

  - You are about to drop the `pieces` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `piecesSummery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."pieces";

-- DropTable
DROP TABLE "public"."piecesSummery";

-- CreateTable
CREATE TABLE "Pieces" (
    "pieceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "refernece" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Pieces_pkey" PRIMARY KEY ("pieceId")
);

-- CreateTable
CREATE TABLE "PiecesSummery" (
    "pSummeryId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PiecesSummery_pkey" PRIMARY KEY ("pSummeryId")
);
