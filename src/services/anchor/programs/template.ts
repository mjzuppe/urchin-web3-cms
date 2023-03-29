import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";

const { SystemProgram } = anchor.web3;

export class Template {
  readonly sdk: AnchorSDK;
  constructor(sdk: AnchorSDK) {
    this.sdk = sdk;
  }

  async createTemplate(
    owner: anchor.web3.Keypair,
    arweave_id: string,
    archived: boolean,
    original?: anchor.web3.PublicKey | null,
  
  ) {
    const accountInit = anchor.web3.Keypair.generate();
    const tx = await this.sdk.program.methods.createTemplate(arweave_id, original, archived).accounts({ 
      template: accountInit.publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([accountInit, owner]).rpc();
    return ({ tx, publicKey: accountInit.publicKey })
  };

  async createTemplateTx(
    payer: PublicKey,
    owner: PublicKey,
    arweave_id: string,
    archived: boolean,
    original?: anchor.web3.PublicKey | null,
  ) {
    const accountInit = anchor.web3.Keypair.generate();
    const method = await this.sdk.program.methods.createTemplate(arweave_id, original, archived).accounts({ //fialing with parent
      template: accountInit.publicKey,
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

  async getTemplate(publicKeys: anchor.web3.PublicKey[]) {
    let r:any = await this.sdk.program.account.templateAccount.fetchMultiple(publicKeys);
    r = r.map((r:any, i:number) => ({publicKey: publicKeys[i], ...r}));
    return r;
    // if (r.owner.toString() !== owner.publicKey.toString()) throw Error("owner mismatch"); //TODO MZ: add validation for owner?
  };

  async getTemplateAll(owner: anchor.web3.PublicKey) {
    return await this.sdk.program.account.templateAccount.all(
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

  async updateTemplate(
    publicKey: anchor.web3.PublicKey,
    owner: anchor.web3.Keypair,
    archived: boolean,
    version?: number,
  ) {
    const tx = await this.sdk.program.methods.updateTemplate(archived, version).accounts({
      template: publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
    }).signers([owner]).rpc();
    return ({ tx, publicKey })
  };

  async updateTemplateTx(
    publicKey: anchor.web3.PublicKey,
    payer: anchor.web3.PublicKey,
    archived: boolean,
    version?: number,
  ) {
    const method = await this.sdk.program.methods.updateTemplate(archived, version).accounts({ //fialing with parent
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