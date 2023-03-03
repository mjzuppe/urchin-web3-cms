import { AnchorSDK} from "./workspace";
import * as anchor from "@project-serum/anchor";

const { SystemProgram } = anchor.web3;

export class Taxonomy {
  readonly sdk: AnchorSDK;
  constructor(sdk: AnchorSDK) {
    this.sdk = sdk;
  }

//   async createPost(
//     user: anchor.web3.PublicKey,
//     profileAccount: anchor.web3.PublicKey,
//     metadataUri: string
//   ) {

async createTaxonomy(
    label: string,
    owner: anchor.web3.Keypair,
    parent?: anchor.web3.PublicKey | null,
){
    const accountInit = anchor.web3.Keypair.generate();
    return this.sdk.program.methods.createTaxonomy("new label", parent || undefined).accounts({
        taxonomy: accountInit.publicKey,
        payer: this.sdk.provider.wallet.publicKey,
        owner: owner.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      }).signers([accountInit, owner]).rpc();

      // TODO ,, need instruction?


    // return this.sdk.program.methods
    //   .createPost(metadataUri, randomHash)
    //   .accounts({
    //     post: postAccount,
    //     profile: profileAccount,
    //     authority: user,
    //     systemProgram: SystemProgram.programId,
    //   })
    //   .instruction();
  }
}