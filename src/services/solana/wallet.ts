// import fs from "fs";



import { Keypair } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

// const jsonKeypair = fs.readFileSync("src/tests/burner-wallet.json", "utf8");

// const keypair = Keypair.fromSecretKey(
//   Buffer.from(JSON.parse(jsonKeypair))
// ); // TODO MJZ

const keypair = Keypair.generate();

export const wallet = new anchor.Wallet(keypair);