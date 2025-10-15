"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryControllers_1 = require("../controllers/inventoryControllers");
const router = (0, express_1.Router)();
// GET all pieces
router.get("/", inventoryControllers_1.getPieces);
// CREATE a piece
router.post("/", inventoryControllers_1.createPiece);
// UPDATE a piece
router.put("/:pieceId", inventoryControllers_1.updatePiece);
// DELETE a piece
router.delete("/:pieceId", inventoryControllers_1.deletePiece);
// DECREASE quantity when piece is taken
router.patch("/:pieceId/take", inventoryControllers_1.takePiece);
exports.default = router;
