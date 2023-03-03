"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnchorSDK = void 0;
const anchor = __importStar(require("@project-serum/anchor"));
const taxonomy_idl = __importStar(require("../idl/taxonomy_program.json"));
const template_idl = __importStar(require("../idl/template_program.json"));
const taxonomyProgramAddress = new anchor.web3.PublicKey(taxonomy_idl.metadata.address);
const templateProgramAddress = new anchor.web3.PublicKey(template_idl.metadata.address);
class AnchorSDK {
    constructor(wallet, connection, opts, model, cluster) {
        const provider = new anchor.AnchorProvider(connection, wallet, opts);
        this.model = model;
        const taxonomyProgram = new anchor.Program(taxonomy_idl, taxonomyProgramAddress, provider);
        const templateProgram = new anchor.Program(template_idl, templateProgramAddress, provider);
        const loadProgram = () => {
            if (model === "taxonomy") {
                return taxonomyProgram;
            }
            else if (model === "template") {
                return templateProgram;
            }
            else
                throw Error("program does not exist");
        };
        this.program = loadProgram();
        this.provider = provider;
        this.cluster = cluster;
    }
}
exports.AnchorSDK = AnchorSDK;
