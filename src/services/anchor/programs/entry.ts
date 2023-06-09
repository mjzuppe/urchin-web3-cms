import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

const { SystemProgram } = anchor.web3;

export class Entry {
  readonly sdk: AnchorSDK;
  constructor(sdk: AnchorSDK) {
    this.sdk = sdk;
  }

  async createEntry(
    owner: anchor.web3.Keypair,
    arweave_id: string,
    template: anchor.web3.PublicKey,
    taxonomy: anchor.web3.PublicKey[],
    immutable: boolean,
    archived: boolean,
  ) {
    const accountInit = anchor.web3.Keypair.generate();
    const tx = await this.sdk.program.methods.createEntry(template, arweave_id, taxonomy, immutable, archived).accounts({ 
      entry: accountInit.publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([accountInit, owner]).rpc();
    return ({ tx, publicKey: accountInit.publicKey })
  };

  async createEntryTx(
    payer: PublicKey,
    owner: PublicKey,
    arweave_id: string,
    template: anchor.web3.PublicKey,
    taxonomy: anchor.web3.PublicKey[],
    immutable: boolean,
    archived: boolean,
  ) {
    const accountInit = anchor.web3.Keypair.generate();
    const method = await this.sdk.program.methods.createEntry(template, arweave_id, taxonomy, immutable, archived).accounts({ //fialing with parent
      entry: accountInit.publicKey,
      payer,
      owner,
      systemProgram: anchor.web3.SystemProgram.programId,
    });
    const tx = await method.transaction(); // get transaction 
    tx.feePayer = payer;
    tx.recentBlockhash = (await this.sdk.provider.connection.getLatestBlockhash()).blockhash;
    let txId = await method.signers([accountInit]);
    return ({ tx, publicKey: accountInit.publicKey })
  }

  async getEntry(publicKeys: anchor.web3.PublicKey[]) {
    let r:any = await this.sdk.program.account.entryAccount.fetchMultiple(publicKeys);
    r = r.map((r:any, i:number) => ({publicKey: publicKeys[i], ...r}));
    return r;
    // if (r.owner.toString() !== owner.publicKey.toString()) throw Error("owner mismatch"); //TODO MZ: add validation for owner?
  };

  async getEntryAll(owner: anchor.web3.PublicKey) {
    return await this.sdk.program.account.entryAccount.all(
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

  async updateEntry(
    publicKey: anchor.web3.PublicKey,
    owner: anchor.web3.Keypair,
    arweave_id: string,
    taxonomy: anchor.web3.PublicKey[],
    immutable: boolean,
    archived: boolean,
  ) {
    const tx = await this.sdk.program.methods.updateEntry(arweave_id, immutable, taxonomy, archived).accounts({
      entry: publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
    }).signers([owner]).rpc();
    return ({ tx, publicKey })
  };

  async updateEntryTx(
    publicKey: anchor.web3.PublicKey,
    payer: anchor.web3.PublicKey,
    arweave_id: string,
    taxonomy: anchor.web3.PublicKey[],
    immutable: boolean,
    archived: boolean,
  ) {
    const method = await this.sdk.program.methods.updateEntry(arweave_id, immutable, taxonomy, archived).accounts({ //fialing with parent
      template: publicKey,
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