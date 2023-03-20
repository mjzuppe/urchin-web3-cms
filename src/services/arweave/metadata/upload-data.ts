// import Bundlr from "@bundlr-network/client";
import Bundlr from "@bundlr-network/client";
import { Cluster, Keypair } from "@solana/web3.js";
import { WebBundlr } from "@bundlr-network/client";
// import { useAnchorWallet } from "@solana/wallet-adapter-react";
// import {
//     Program,
//     AnchorProvider,
//     BN,
//     web3,
//   } from '@project-serum/anchor'
//   import {
//     Connection,
//     clusterApiUrl,
//     PublicKey
//   } from '@solana/web3.js'
// import bs58 from "bs58";

const uploadData = async (secret: Keypair, cluster: Cluster, data: any, wallet: any = null) => {
    if (wallet) {
        const bundlr = new WebBundlr("https://devnet.bundlr.network", "solana", wallet, {providerUrl: "https://api.devnet.solana.com"}); // TODO dynamic for mainnet
        await bundlr.fund(100000);
        return await bundlr.upload(JSON.stringify(data));
    }
    else {
        const bundlr = new Bundlr("https://devnet.bundlr.network", "solana", secret, {providerUrl: "https://api.devnet.solana.com"}); // TODO dynamic for mainnet
        await bundlr.fund(100000);
        return await bundlr.upload(JSON.stringify(data));
    }

}

export { uploadData };
//const price = await bundlr.getPrice(fileSize) // TODO Funding ?

