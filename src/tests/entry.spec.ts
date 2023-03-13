import urchin from '../index';
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import testKeypair from './test-wallet';
import * as assert from "assert";
describe('Manage entry', () => {

    const payer = testKeypair;

    let pubkey: PublicKey = payer.publicKey;

    it("should create a new entry", async () => {
        const u = urchin({
            payer,
            cluster: "devnet",
            
        });
        u.entry.create(
            [
              {
                template: payer.publicKey,
                taxonomies: [payer.publicKey],
                inputs: [{label: "text", value: "Hello World"}]
              }
            ]
        )
const r:any = await u.process();
pubkey = new PublicKey(r.entry[0].publicKey);
assert.equal(r.entry[0].template.toString(), payer.publicKey.toString())
  }).timeout(100000);


  it("should get an entry", async () => {
    const u = urchin({
      payer,
      cluster: "devnet",
      
    });
    const r = await u.entry.get([pubkey]);
    assert.equal(r.length, 1);
  }).timeout(100000);

  it("should get all entries", async () => {
    const u = urchin({
      payer,
      cluster: "devnet",
      
      
    });
    const r = await u.entry.getAll();
    assert.ok(r.length > 0);
  }).timeout(100000);


it("should update a new asset", async () => {
    const u = urchin({
        payer,
        cluster: "devnet",
        
    });
    u.entry.update([
        {
            publicKey: pubkey,
            archived: true,
        }
    ])

    const preflight = await u.preflight();

    const r = await u.process();
    assert.equal(r.entry[0].archived, true)
}).timeout(100000);

});


