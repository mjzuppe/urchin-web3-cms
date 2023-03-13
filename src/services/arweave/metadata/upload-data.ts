// import Bundlr from "@bundlr-network/client";
import Bundlr from "@bundlr-network/client";
import { Cluster } from "@solana/web3.js";
import bs58 from "bs58";

const uploadData = async (secret: Uint8Array, cluster: Cluster, data: any) => {
    // const bundlr = new WebBundlr("https://devnet.bundlr.network", "solana", {}, {providerUrl: "https://api.devnet.solana.com"}); // TODO dynamic for mainnet
    const bundlr = new Bundlr("https://devnet.bundlr.network", "solana", secret, {providerUrl: "https://api.devnet.solana.com"}); // TODO dynamic for mainnet
    await bundlr.fund(100000);
    return await bundlr.upload(JSON.stringify(data));
}

export { uploadData };
//const price = await bundlr.getPrice(fileSize) // TODO Funding ?

