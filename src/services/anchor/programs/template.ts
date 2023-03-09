import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";

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
    original?: anchor.web3.PublicKey,
  
  ) {
    const accountInit = anchor.web3.Keypair.generate();
    console.log("CREATE TEMPLATE", {
      arweave: arweave_id,
      original,
      archived,
      template: accountInit.publicKey.toString(),
      payer: this.sdk.provider.wallet.publicKey.toString(),
      owner: owner.publicKey.toString(),
    })
    const tx = await this.sdk.program.methods.createTemplate(arweave_id, original, archived).accounts({ 
      template: accountInit.publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([accountInit, owner]).rpc();
    return ({ tx, publicKey: accountInit.publicKey })
  };

  async getTemplate(publicKeys: anchor.web3.PublicKey[]) {
    let r:any = await this.sdk.program.account.templateAccount.fetchMultiple(publicKeys);
    r = r.map((r:any, i:number) => ({publicKey: publicKeys[i], ...r}));
    return r;
    // if (r.owner.toString() !== owner.publicKey.toString()) throw Error("owner mismatch"); //TODO MZ: add validation for owner?
  };

  async getTemplateAll(owner: anchor.web3.Keypair) {
    return await this.sdk.program.account.templateAccount.all(
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

  async updateTemplate(
    publicKey: anchor.web3.PublicKey,
    owner: anchor.web3.Keypair,
    archived: boolean,
  ) {
    const tx = await this.sdk.program.methods.updateTemplate(archived).accounts({
      template: publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
    }).signers([owner]).rpc();
    return ({ tx, publicKey })
  };


}