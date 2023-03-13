import { Cluster } from "@solana/web3.js";
declare const uploadData: (secret: Uint8Array, cluster: Cluster, data: any) => Promise<import("@bundlr-network/client/build/common/types").UploadResponse>;
export { uploadData };
