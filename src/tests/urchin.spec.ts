import urchin from '../index';
import { Keypair } from '@solana/web3.js';

describe("Urchin initialization tests", () => {
    const payer = Keypair.generate();
    it("should initialize", async () => {
        const cms = urchin({
            payer,
            cluster: "devnet",
        });
    });

    //TODO MZ: add return when available

});