import urchin from '../index';
import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import testKeypair from './test-wallet';
import * as assert from "assert";

describe('Manage asset', () => {

    const payer = testKeypair;

    let pubkey: PublicKey = payer.publicKey;

    it("should create a new asset", async () => {
        const u = urchin({
            payer,
            cluster: "devnet",
        });
        u.asset.create(
            [
                {
                    arweaveId: "2222222222222222222222222222222222222222222",
                }
            ]
        )
        const preflight = await u.preflight();

        const r: any = await u.process();
        assert.equal(r.asset[0].arweaveId, "2222222222222222222222222222222222222222222")
        pubkey = new PublicKey(r.asset[0].publicKey);

    }).timeout(100000);


    it("should get a asset", async () => {
        const u = urchin({
            payer,
            cluster: "devnet",

        });
        const r = await u.asset.get([pubkey]);
        assert.equal(r.length, 1);
    }).timeout(100000);

    it("should get all assets", async () => {
        const u = urchin({
            payer,
            cluster: "devnet",

        });
        const r = await u.asset.getAll();
        assert.ok(r.length > 0);
    }).timeout(100000);

    it("should update a new asset", async () => {
        const u = urchin({
            payer,
            cluster: "devnet",
        });
        u.asset.update([
            {
                arweaveId: "1111111111111111111111111111111111111111112",
                publicKey: pubkey,
                archived: true,
            }
        ])

        const preflight = await u.preflight();
        const r = await u.process();
        assert.equal(r.asset[0].arweaveId, "1111111111111111111111111111111111111111112");


    }).timeout(100000);

});


