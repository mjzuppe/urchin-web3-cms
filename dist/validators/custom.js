"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubkey = void 0;
const joi_1 = __importDefault(require("joi"));
const pubkey = () => {
    return joi_1.default.any();
    // .custom((value: any, helper: any) => {
    //   if (!(value instanceof PublicKey)) return helper.message('Invalid public key input');
    //   return true;
    // })
};
exports.pubkey = pubkey;
