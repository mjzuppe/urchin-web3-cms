import Bundlr from "@bundlr-network/client";
import { Cluster } from "@solana/web3.js";

const uploadData = async (secret: string, cluster: Cluster, data: any) => {
    const bundlr = new Bundlr("https://devnet.bundlr.network", "solana", "4wpGbU8yF9tGoRXmV9YKpFiktdURxtz2KovrT4sM4mPNqcL9JjqWYoQ9n8bA7GfXVWWR86bnKuMmKhAfgkGhawgP", {providerUrl: "https://api.devnet.solana.com"}); // TODO dynamic for mainnet
    await bundlr.fund(100000);
    return await bundlr.upload(JSON.stringify(data));
}

export { uploadData };
//const price = await bundlr.getPrice(fileSize) // TODO Funding ?

