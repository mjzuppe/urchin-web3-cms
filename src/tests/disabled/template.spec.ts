import urchin from '../index';
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import testKeypair from './test-wallet';
import * as assert from "assert";

describe('Manage template', () => {

    const payer = testKeypair;

    let pubkey: PublicKey = payer.publicKey;

    it("should create a new template", async () => {
        const u = urchin({
            payer,
            cluster: "devnet",
      
        });
        u.template.create(
            [
                { 
                    title: "title of record", 
                    inputs: [
                        { label: "text", type: "text", validation: { 
                            type: "text", 
                            min: 1, 
                            max: 100 
                        }  }
                    ], 
                    archived: false, 
                    taxonomies: [payer.publicKey],
                    
                }
            ]
        )

const preflight = await u.preflight();

const r = await u.process();
console.log("r::", r);
pubkey = new PublicKey(r.template[0].publicKey);

  }).timeout(100000);

  it("should get a template", async () => {
    const u = urchin({
      payer,
      cluster: "devnet",
      
    });
    const r = await u.template.get([pubkey]);
    assert.equal(r.length, 1);
  }).timeout(100000);

  it("should get all templates", async () => {
    const u = urchin({
      payer,
      cluster: "devnet",
      
    });
    const r = await u.template.getAll();
    assert.ok(r.length > 0);
  }).timeout(100000);

it("should update a new template", async () => {
    const u = urchin({
        payer,
        cluster: "devnet",
      
    });
    u.template.update([{ publicKey: pubkey, archived: true, version: 1}])
    const r = await u.process();
    console.log("PROCESS::", r);

}).timeout(100000);

});


