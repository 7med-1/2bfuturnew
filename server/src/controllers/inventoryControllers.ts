import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPieces = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString().trim() || '';

    const pieces = await prisma.pieces.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: 'insensitive', // case-insensitive search
                },
              },
              {
                reference: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : {},
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(pieces);
  } catch (error) {
    console.error('Error fetching pieces:', error);
    res.status(500).json({ message: 'Error fetching pieces' });
  }
};



export const createPiece = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { pieceId, name, reference, place, description, quantity } = req.body;
    const piece = await prisma.pieces.create({
      data: {
        pieceId,
        name,
        reference,
        place,
        description,
        quantity,
      },
    });
    res.status(201).json(piece);
  } catch (error) {
  console.error("Error creating piece:", error);
  res.status(500).json({ message: 'Error creating the product', error });
}
};

export const deletePiece = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pieceId } = req.params; // 👈 assuming you pass it as /pieces/:pieceId

    const deletedPiece = await prisma.pieces.delete({
      where: { pieceId },
    });

    res.status(200).json({ message: "Piece deleted successfully", deletedPiece });
  } catch (error) {
    console.error("Error deleting piece:", error);
    res.status(500).json({ message: "Error deleting the piece", error });
  }
};

export const updatePiece = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pieceId } = req.params;
    const { name, reference, place, description, quantity } = req.body;

    const updatedPiece = await prisma.pieces.update({
      where: { pieceId },
      data: { name, reference, place, description, quantity },
    });

    res.status(200).json(updatedPiece);
  } catch (error) {
    console.error("Error updating piece:", error);
    res.status(500).json({ message: "Error updating the piece", error });
  }
};


export const takePiece = async (req: Request, res: Response): Promise<void> => {
  try {
    const { pieceId } = req.params;
    const { amount } = req.body; // 👈 e.g. { "amount": 1 }

    const updatedPiece = await prisma.pieces.update({
      where: { pieceId },
      data: {
        quantity: {
          decrement: amount || 1, // defaults to 1 if not provided
        },
      },
    });

    if (updatedPiece.quantity < 0) {
      // optional safeguard
      await prisma.pieces.update({
        where: { pieceId },
        data: { quantity: 0 },
      });
      throw new Error("Quantity cannot be negative");
    }

    res.status(200).json({ message: "Piece quantity updated", updatedPiece });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ message: "Error decreasing quantity", error });
  }
};
