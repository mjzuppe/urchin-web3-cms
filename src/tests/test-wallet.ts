import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";

const privateKey = "4wpGbU8yF9tGoRXmV9YKpFiktdURxtz2KovrT4sM4mPNqcL9JjqWYoQ9n8bA7GfXVWWR86bnKuMmKhAfgkGhawgP";
const testKeypair = Keypair.fromSecretKey(
    bs58.decode(privateKey)
   );

export default(testKeypair)