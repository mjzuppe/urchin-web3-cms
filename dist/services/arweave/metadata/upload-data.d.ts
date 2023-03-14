import { Cluster, Keypair } from "@solana/web3.js";
declare const uploadData: (secret: Keypair, cluster: Cluster, data: any, wallet?: any) => Promise<import("@bundlr-network/client/build/common/types").UploadResponse>;
export { uploadData };
