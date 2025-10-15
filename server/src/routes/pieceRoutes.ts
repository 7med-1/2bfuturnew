import { Router } from "express";
import {
  createPiece,
  getPieces,
  updatePiece,
  deletePiece,
  takePiece,
} from "../controllers/inventoryControllers";

const router = Router();

// GET all pieces
router.get("/", getPieces);

// CREATE a piece
router.post("/", createPiece);

// UPDATE a piece
router.put("/:pieceId", updatePiece);

// DELETE a piece
router.delete("/:pieceId", deletePiece);

// DECREASE quantity when piece is taken
router.patch("/:pieceId/take", takePiece);

export default router;
