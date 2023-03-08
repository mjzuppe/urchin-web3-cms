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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundNode = exports.getFundedNodeBalance = exports.getTransactionPrice = exports.uploadFiles = void 0;
const arbundles_1 = require("arbundles");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const prepFilesForTransaction = (signer) => __awaiter(void 0, void 0, void 0, function* () {
    let files = yield promises_1.default.readdir(path_1.default.resolve(__dirname, './data'));
    const items = yield Promise.all(files.map((fileName) => __awaiter(void 0, void 0, void 0, function* () {
        let file = yield promises_1.default.readFile(path_1.default.resolve(__dirname, './data', fileName));
        return [
            fileName,
            yield prepFile(file, signer),
        ];
    })));
    return new Map(items);
});
const prepFile = (file, signer) => __awaiter(void 0, void 0, void 0, function* () {
    let item = (0, arbundles_1.createData)(new Uint8Array(file), signer, {
        tags: [{ name: "Content-Type", value: "txt" }],
    });
    yield item.sign(signer);
    return item;
});
const bundleTransactionItems = (itemMap, signer, bundlr) => __awaiter(void 0, void 0, void 0, function* () {
    const pathMap = new Map([...itemMap].map(([path, item]) => ([path, item.id])));
    let manifestItem = yield (0, arbundles_1.createData)((yield bundlr.uploader.generateManifest({ items: pathMap })).manifest, signer, {
        tags: [{
                name: "Type",
                value: "manifest"
            },
            {
                name: "Content-Type",
                value: "application/x.arweave-manifest+json"
            }]
    });
    let bundle = yield (0, arbundles_1.bundleAndSignData)([...itemMap.values(), manifestItem], signer);
    return bundle;
});
const uploadFiles = (bundlr, signer) => __awaiter(void 0, void 0, void 0, function* () {
    let itemsMap = yield prepFilesForTransaction(signer);
    let signedBundles = yield bundleTransactionItems(itemsMap, signer, bundlr);
    yield bundlr.ready();
    const tx = bundlr.createTransaction(signedBundles.getRaw(), {
        tags: [{ name: "Bundle-Format", value: "binary" }, { name: "Bundle-Version", value: "2.0.0" }]
    });
    yield tx.sign();
    yield tx.upload();
    let manifestId = signedBundles.items[signedBundles.items.length - 1].id;
    return manifestId;
});
exports.uploadFiles = uploadFiles;
const getTransactionPrice = (fileSize, bundlr) => __awaiter(void 0, void 0, void 0, function* () {
    let [err, price] = [null, null];
    if (fileSize <= 0 || isNaN(fileSize)) {
        err = "incorrect file size format";
    }
    else {
        const price1MBAtomic = yield bundlr.getPrice(fileSize);
        price = bundlr.utils.unitConverter(price1MBAtomic).c[0];
    }
    return [err, price];
});
exports.getTransactionPrice = getTransactionPrice;
const getFundedNodeBalance = (bundlr) => __awaiter(void 0, void 0, void 0, function* () {
    let atomicBalance = yield bundlr.getLoadedBalance();
    return atomicBalance;
});
exports.getFundedNodeBalance = getFundedNodeBalance;
const fundNode = (bundlr, price) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield bundlr.fund(price);
        console.log(`Funding successful txID=${response.id} amount funded=${response.quantity}`);
        return [null, response];
    }
    catch (e) {
        console.log("Error funding node ", e);
        return [e, null];
    }
});
exports.fundNode = fundNode;
