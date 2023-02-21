"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
const playa = (0, index_1.default)();
console.log("PLaya::", playa.taxonomy().create({ label: "test label1" }));
console.log("PLaya::", playa.taxonomy().create({ label: "test label2" }));
console.log("Queued", playa.getQueue());
console.log("Run", playa.run());
