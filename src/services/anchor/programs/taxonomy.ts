import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

const { SystemProgram } = anchor.web3;

export class Taxonomy {
  readonly sdk: AnchorSDK;
  constructor(sdk: AnchorSDK) {
    this.sdk = sdk;
  }

  async createTaxonomy(
    label: string,
    owner: anchor.web3.Keypair,
    parent?: anchor.web3.PublicKey | undefined,
  ) {
    const wallet = new anchor.Wallet(owner) // also perhaps feed useAnchorWallet when in front?
    const accountInit = anchor.web3.Keypair.generate();
    const method = await this.sdk.program.methods.createTaxonomy(label, parent || null).accounts({ //fialing with parent
      taxonomy: accountInit.publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    });
    // see: https://coral-xyz.github.io/anchor/ts/classes/Program.html#transaction
    const tx = await method.transaction(); // get transaction 
    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = (await this.sdk.provider.connection.getLatestBlockhash()).blockhash;
    let txId = await method.signers([accountInit, owner]).rpc();
    return ({ tx: txId, publicKey: accountInit.publicKey })

  }

  async createTaxonomyTx(
    label: string,
    payer: PublicKey,
    owner: PublicKey,
    parent?: anchor.web3.PublicKey | undefined,
  ) {
    const accountInit = anchor.web3.Keypair.generate();
    const method = await this.sdk.program.methods.createTaxonomy(label, parent || null).accounts({ //fialing with parent
      taxonomy: accountInit.publicKey,
      payer,
      owner,
      systemProgram: anchor.web3.SystemProgram.programId,
    });
    const tx = await method.transaction(); // get transaction 
    tx.feePayer = payer;
    tx.recentBlockhash = (await this.sdk.provider.connection.getLatestBlockhash()).blockhash;
    tx.partialSign(accountInit);
    // let txId = await method.signers([accountInit]);
    return ({ tx, publicKey: accountInit.publicKey })
  }


  async getTaxonomy(publicKeys: anchor.web3.PublicKey[]) {
    let r: any = await this.sdk.program.account.taxonomyAccount.fetchMultiple(publicKeys);
    r = r.map((r: any, i: number) => ({ publicKey: publicKeys[i], ...r }));
    return r
  };

  async getTaxonomyAll(owner: anchor.web3.PublicKey) {
    return await this.sdk.program.account.taxonomyAccount.all(
      [
        {
          memcmp: {
            offset: 8, // Discriminator.
            bytes: owner.toBase58(),
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
    const tx = await this.sdk.program.methods.updateTaxonomy(label, parent || null).accounts({
      taxonomy: publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
    }).signers([owner]).rpc();
    return ({ tx, publicKey })
  };

  async updateTaxonomyTx(
    publicKey: anchor.web3.PublicKey,
    label: string,
    payer: anchor.web3.PublicKey,
    owner: anchor.web3.PublicKey,
    parent?: anchor.web3.PublicKey | undefined,
  ) {
    const method = await this.sdk.program.methods.updateTaxonomy(label, parent || null).accounts({ //fialing with parent
      taxonomy: publicKey,
      payer: payer,
      owner: payer,
      systemProgram: anchor.web3.SystemProgram.programId,
    });
    const tx = await method.transaction(); // get transaction 
    tx.feePayer = payer;
    tx.recentBlockhash = (await this.sdk.provider.connection.getLatestBlockhash()).blockhash;
    return ({ tx, publicKey })

  };






}