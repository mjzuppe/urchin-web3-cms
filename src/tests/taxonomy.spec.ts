import urchin from '../index';
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
// yarn  from "fs";

describe('Manage taxonomy', () => {

  // const jsonKeypair = fs.readFileSync("src/tests/burner-wallet.json", "utf8");

// const payer = Keypair.fromSecretKey(
//   Buffer.from(JSON.parse(jsonKeypair))
// ); // TODO MJZ

const payer = Keypair.generate();

let pubkey:PublicKey = payer.publicKey;

  it("should create a new taxonomy", async () => {
      const u = urchin({
          payer,
          cluster: "devnet",
      });
      u.taxonomy.create({label: "new label", owner: payer})

      const preflight = await u.preflight();
      console.log("PREFLIGHT::", preflight);

      const r = await u.process();
      console.log("PROCESS::", r);
      pubkey = new PublicKey(r.taxonomy[0].publicKey);

  }).timeout(100000);

  it("should update a new taxonomy", async () => {
    const u = urchin({
        payer,
        cluster: "devnet",
    });
    u.taxonomy.update({publicKey: pubkey,label: "newer label", owner: payer})

    const preflight = await u.preflight();
    console.log("PREFLIGHT::", preflight);

    const r = await u.process();
    console.log("PROCESS::", r);

}).timeout(100000);

});


