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
const extension_1 = require("@prisma/client/extension");
const prisma = new extension_1.PrismaClient();
function test() {
    return __awaiter(this, void 0, void 0, function* () {
        const piece = yield prisma.pieces.create({
            data: {
                name: "Test Item",
                reference: "R001",
                place: "A1",
                description: "Just a test",
                quantity: 5,
            },
        });
        console.log(piece);
    });
}
test().catch(console.error);
