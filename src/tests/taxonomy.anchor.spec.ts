import { expect } from "chai";
import * as anchor from "@project-serum/anchor";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import * as SolanaInteractions from "../services/anchor/programs";
import fs from "fs";
import * as assert from "assert";
import { PublicKey } from "@solana/web3.js";

const jsonKeypair = fs.readFileSync("src/tests/burner-wallet.json", "utf8");

const keypair = anchor.web3.Keypair.fromSecretKey(
  Buffer.from(JSON.parse(jsonKeypair))
);

const wallet = new anchor.Wallet(keypair);

const rpcConnection = new anchor.web3.Connection(
  "http://localhost:8899"
);

const preflightCommitment = "confirmed" as anchor.web3.ConfirmOptions;

describe("taxonomy", async () => {
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpcConnection,
    preflightCommitment as anchor.web3.ConfirmOptions,
    "taxonomy",
    "localnet"
  );

  const owner = anchor.web3.Keypair.generate();
  const parent = anchor.web3.Keypair.generate();
  let newKey: any = null

  it("creates a new taxonomy  🤞", async () => {
    const taxonomy = await new SolanaInteractions.Taxonomy(sdk).createTaxonomy(
      "new label",
      owner,
      parent.publicKey
    );

    assert.ok(taxonomy);
    newKey = taxonomy.publicKey;

  }).timeout(20000);

  it('can retrieve by owner', async () => {
    const taxonomy = await new SolanaInteractions.Taxonomy(sdk).getTaxonomyAll(owner);

    assert.equal(taxonomy.length, 1);
    const foundAccount: any = taxonomy[0];
    assert.equal(foundAccount.account.label, 'new label');
    if (foundAccount.account.parent !== "null") assert.equal(foundAccount.account.parent.toString(), parent.publicKey.toString());
    assert.equal(foundAccount.account.owner.toString(), owner.publicKey.toString());
  });

  it('can retrieve all by owner', async () => {
    const taxonomy = await new SolanaInteractions.Taxonomy(sdk).getTaxonomyAll(owner);
    assert.ok(taxonomy.length > 0);
  });

  it('can update a taxonomy', async () => {
    const taxonomy = await new SolanaInteractions.Taxonomy(sdk).updateTaxonomy(
      newKey,
      "newer label",
      owner,
    );

    const foundAccount = await sdk.program.account.taxonomyAccount.fetch(newKey);
    assert.equal(foundAccount.label, 'newer label');
    assert.equal(foundAccount.parent, "null");

  }).timeout(20000);

});