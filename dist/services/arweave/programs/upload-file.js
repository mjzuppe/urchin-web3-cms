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
exports.uploadMockFile = void 0;
const node_crypto_1 = require("node:crypto");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const uploadMockFile = (files //, payer: Keypair
) => __awaiter(void 0, void 0, void 0, function* () {
    yield sleep(3000);
    return files.map((file) => (0, node_crypto_1.createHash)('sha256').update(file).digest('hex'));
});
exports.uploadMockFile = uploadMockFile;
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    const r = yield (0, exports.uploadMockFile)(['a', 'b', 'c']);
    console.log(r);
});
test();
