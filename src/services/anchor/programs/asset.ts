import { AnchorSDK } from "./workspace";
import * as anchor from "@project-serum/anchor";

const { SystemProgram } = anchor.web3;

export class Asset {
  readonly sdk: AnchorSDK;
  constructor(sdk: AnchorSDK) {
    this.sdk = sdk;
  }

  async createAsset(
    owner: anchor.web3.Keypair,
    arweave_id: string,
    immutable: boolean,
    archived: boolean,
  ) {
    const accountInit = anchor.web3.Keypair.generate();
    const tx = await this.sdk.program.methods.createAsset(arweave_id, immutable, archived).accounts({ 
      asset: accountInit.publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([accountInit, owner]).rpc();
    return ({ tx, publicKey: accountInit.publicKey })
  };

  async getAsset(publicKeys: anchor.web3.PublicKey[]) {
    let r:any = await this.sdk.program.account.assetAccount.fetchMultiple(publicKeys);
    r = r.map((r:any, i:number) => ({publicKey: publicKeys[i], ...r}));
    return r;
    // if (r.owner.toString() !== owner.publicKey.toString()) throw Error("owner mismatch"); //TODO MZ: add validation for owner?
  };

  async getAssetAll(owner: anchor.web3.Keypair) {
    return await this.sdk.program.account.assetAccount.all(
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

  async updateAsset(
    publicKey: anchor.web3.PublicKey,
    owner: anchor.web3.Keypair,
    arweave_id: string,
    immutable: boolean,
    archived: boolean,
  ) {
    const tx = await this.sdk.program.methods.updateAsset(arweave_id, immutable, archived).accounts({
      asset: publicKey,
      payer: this.sdk.provider.wallet.publicKey,
      owner: owner.publicKey,
    }).signers([owner]).rpc();
    return ({ tx, publicKey })
  };


}