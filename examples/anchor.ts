import { expect } from "chai";
import * as anchor from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import * as SolanaInteractions from "../src/services/anchor/programs";
import fs from "fs";
import * as assert from "assert";

const jsonKeypair = fs.readFileSync("examples/burner-wallet.json", "utf8");

const keypair = anchor.web3.Keypair.fromSecretKey(
  Buffer.from(JSON.parse(jsonKeypair))
);

const wallet = new anchor.Wallet(keypair);


const rpcConnection = new anchor.web3.Connection(
    "http://localhost:8899"
  );

const preflightCommitment = "confirmed" as anchor.web3.ConfirmOptions;
const handler = async () => {
// describe("taxonomy", async () => {
    const sdk = new SolanaInteractions.AnchorSDK(
        wallet as NodeWallet, 
        rpcConnection,
        preflightCommitment as anchor.web3.ConfirmOptions,
        "taxonomy",
        "localnet"
      );
      // it("Creates a new taxonomy", async () => {
        const owner = anchor.web3.Keypair.generate();
        const parent = anchor.web3.Keypair.generate();
        const newKey = anchor.web3.Keypair.generate();

        const taxonomy = await sdk.program.methods.createTaxonomy("new label", parent.publicKey).accounts({
  
            taxonomy: newKey.publicKey,
            payer: wallet.publicKey,
            owner: owner.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
          }).signers([newKey, owner]).rpc();
        console.log("TAXONOMY", taxonomy);
    
    
        const taxonomyFound = await sdk.program.account.taxonomyAccount.fetch(newKey.publicKey);
        console.log("TAXONOMY Found", taxonomyFound);
        assert.equal(taxonomyFound.label, 'new label');

      // })

// })
        }

        handler();
