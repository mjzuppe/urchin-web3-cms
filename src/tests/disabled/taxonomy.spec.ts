import urchin from '../index';
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import testKeypair from './test-wallet';


describe('Manage taxonomy', () => {

  const payer = testKeypair;

let pubkey:PublicKey = payer.publicKey;

  it("should create a new taxonomy", async () => {
    const key = new Keypair();

    console.log(key);

      const u = urchin({
          payer,
          cluster: "devnet",
      });
      u.taxonomy.create([{label: "new label"}])
      const preflight = await u.preflight();
      const r = await u.process();
      pubkey = new PublicKey(r.taxonomy[0].publicKey);
  }).timeout(100000);

  it("should update a new taxonomy", async () => {
    const u = urchin({
        payer,
        cluster: "devnet",
    });
    u.taxonomy.update({publicKey: pubkey,label: "newer label", owner: payer})
    const preflight = await u.preflight();
    const r = await u.process();
}).timeout(100000);

});


