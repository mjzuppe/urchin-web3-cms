import urchin from '../index';
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import testKeypair from './test-wallet';
import * as assert from "assert";

describe('Manage taxonomy', () => {

  const payer = testKeypair;

  let pubkey: PublicKey = payer.publicKey;
  const key = new Keypair();

  it("should create a new taxonomy", async () => {
    const u = urchin({
      payer,
      cluster: "devnet",
    });
    u.taxonomy.create([{ label: "new label" }])
    const preflight = await u.preflight();
    const r = await u.process();
    pubkey = new PublicKey(r.taxonomy[0].publicKey);
    assert.equal(r.taxonomy[0].label, "new label");

  }).timeout(100000);

  it("should get a taxonomy", async () => {
    const u = urchin({
      payer,
      cluster: "devnet",
    });
    const r = await u.taxonomy.get([pubkey]);
    assert.equal(r.length, 1);
  }).timeout(100000);

  it("should get all taxonomies", async () => {
    const u = urchin({
      payer,
      cluster: "devnet",
    });
    const r = await u.taxonomy.getAll();
    assert.ok(r.length > 0);
  }).timeout(100000);

  it("should update a new taxonomy", async () => {
    const u = urchin({
      payer,
      cluster: "devnet",
    });
    u.taxonomy.update([{ publicKey: pubkey, label: "newer label" }])
    const preflight = await u.preflight();
    const r = await u.process();
    assert.equal(r.taxonomy[0].label, "newer label")
  }).timeout(100000);

});


