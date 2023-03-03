import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";

const { SystemProgram } = anchor.web3;

export class Taxonomy {
  readonly sdk: AnchorSDK;
  constructor(sdk: AnchorSDK) {
    this.sdk = sdk;
  }


  async createTaxonomy(
    label: string,
    owner: anchor.web3.Keypair,
    parent?: anchor.web3.PublicKey | null,
  ) {
    const accountInit = anchor.web3.Keypair.generate();
    const tx = await this.sdk.program.methods.createTaxonomy(label, parent || undefined).accounts({
      taxonomy: accountInit.publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([accountInit, owner]).rpc();
    return ({ tx, publicKey: accountInit.publicKey })
  };

  async getTaxonomyOne(owner: anchor.web3.Keypair, publicKey: anchor.web3.PublicKey) {
    const r = await this.sdk.program.account.taxonomyAccount.fetch(publicKey);
    if (r.owner.toString() !== owner.publicKey.toString()) throw Error("owner mismatch");
  };

  async getTaxonomyAll(owner: anchor.web3.Keypair) {
    return await this.sdk.program.account.taxonomyAccount.all(
      [
        {
          memcmp: {
            offset: 8, // Discriminator.
            bytes: owner.publicKey.toBase58(),
          }
        }
      ]
    )
  };

  async updateTaxonomy(
    publicKey: anchor.web3.PublicKey,
    label: string,
    owner: anchor.web3.Keypair,
    parent?: anchor.web3.PublicKey | undefined,
  ) {
    return await this.sdk.program.methods.updateTaxonomy(label, parent || null).accounts({
      taxonomy: publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
    }).signers([owner]).rpc();
  };


}