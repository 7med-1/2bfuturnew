import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboaredMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const popularPieces = await prisma.pieces.findMany({
      take: 15,
      orderBy: {
        quantity: 'desc',
      },
    });
    const piecesSummery = await prisma.piecesSummery.findMany({
      take: 15,
      orderBy: {
        date: 'desc',
      },
    });
    const recentPieces = await prisma.pieces.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10, 
    });
    const recentUpdates = await prisma.pieces.findMany({
      orderBy: { updatedAt: "desc" },
      take: 10, 
    });
    res.json({
      popularPieces,
      piecesSummery,
    });
  } catch (error) {
    res.status(500).json({ message: 'error in the dashboard metrics' });
  }
};
