"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.takePiece = exports.updatePiece = exports.deletePiece = exports.createPiece = exports.getPieces = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPieces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const search = ((_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString().trim()) || '';
        const pieces = yield prisma.pieces.findMany({
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
    }
    catch (error) {
        console.error('Error fetching pieces:', error);
        res.status(500).json({ message: 'Error fetching pieces' });
    }
});
exports.getPieces = getPieces;
const createPiece = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pieceId, name, reference, place, description, quantity } = req.body;
        const piece = yield prisma.pieces.create({
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
    }
    catch (error) {
        console.error("Error creating piece:", error);
        res.status(500).json({ message: 'Error creating the product', error });
    }
});
exports.createPiece = createPiece;
const deletePiece = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pieceId } = req.params; // 👈 assuming you pass it as /pieces/:pieceId
        const deletedPiece = yield prisma.pieces.delete({
            where: { pieceId },
        });
        res.status(200).json({ message: "Piece deleted successfully", deletedPiece });
    }
    catch (error) {
        console.error("Error deleting piece:", error);
        res.status(500).json({ message: "Error deleting the piece", error });
    }
});
exports.deletePiece = deletePiece;
const updatePiece = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pieceId } = req.params;
        const { name, reference, place, description, quantity } = req.body;
        const updatedPiece = yield prisma.pieces.update({
            where: { pieceId },
            data: { name, reference, place, description, quantity },
        });
        res.status(200).json(updatedPiece);
    }
    catch (error) {
        console.error("Error updating piece:", error);
        res.status(500).json({ message: "Error updating the piece", error });
    }
});
exports.updatePiece = updatePiece;
const takePiece = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pieceId } = req.params;
        const { amount } = req.body; // 👈 e.g. { "amount": 1 }
        const updatedPiece = yield prisma.pieces.update({
            where: { pieceId },
            data: {
                quantity: {
                    decrement: amount || 1, // defaults to 1 if not provided
                },
            },
        });
        if (updatedPiece.quantity < 0) {
            // optional safeguard
            yield prisma.pieces.update({
                where: { pieceId },
                data: { quantity: 0 },
            });
            throw new Error("Quantity cannot be negative");
        }
        res.status(200).json({ message: "Piece quantity updated", updatedPiece });
    }
    catch (error) {
        console.error("Error decreasing quantity:", error);
        res.status(500).json({ message: "Error decreasing quantity", error });
    }
});
exports.takePiece = takePiece;
