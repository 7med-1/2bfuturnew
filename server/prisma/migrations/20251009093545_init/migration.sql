-- CreateTable
CREATE TABLE "User" (
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "pieces" (
    "pieceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "refernece" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "pieces_pkey" PRIMARY KEY ("pieceId")
);

-- CreateTable
CREATE TABLE "piecesSummery" (
    "pSummeryId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "piecesSummery_pkey" PRIMARY KEY ("pSummeryId")
);
