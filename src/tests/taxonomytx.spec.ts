import urchin from '../index';
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import testKeypair from './test-wallet';
import * as assert from "assert";

describe('Manage taxonomy', () => {

  const payer = testKeypair;

  let pubkey: PublicKey = payer.publicKey;
  const key = new Keypair();

  const connection = new Connection("https://api.devnet.solana.com", "confirmed");


  it("should create a new taxonomy", async () => {
    const u = urchin({
      payer: payer.publicKey,
      cluster: "devnet",
    });
    const balance = await connection.getBalance(payer.publicKey);
    console.log("Initial Balance: ", balance);
    u.taxonomy.create([{ label: "new label" }])
    u.taxonomy.update([{  publicKey: Keypair.generate().publicKey, label: "new label" }])
    const preflight = await u.preflight();
    const r = await u.process();
    console.log("r", r)
  }).timeout(100000);


});


