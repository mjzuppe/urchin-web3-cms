import * as anchor from "@project-serum/anchor";
import { Cluster } from "@solana/web3.js";
import * as taxonomy_idl from '../idl/taxonomy_program.json';
import * as template_idl from '../idl/template_program.json';

const taxonomyProgramAddress = new anchor.web3.PublicKey(
    taxonomy_idl.metadata.address);

const templateProgramAddress = new anchor.web3.PublicKey(
        template_idl.metadata.address);

export class AnchorSDK {
  readonly program: anchor.Program;
  readonly provider: anchor.AnchorProvider;
  readonly model: "taxonomy" | "template";
  readonly cluster: Cluster | "localnet";


  constructor(
    wallet: anchor.Wallet,
    connection: anchor.web3.Connection,
    opts: anchor.web3.ConfirmOptions,
    model: "taxonomy" | "template",
    cluster: Cluster | "localnet",
 

  ) {
    const provider = new anchor.AnchorProvider(connection, wallet, opts);
    console.log("PROVIDER", provider);
    this.model = model;

    const taxonomyProgram = new anchor.Program(
        taxonomy_idl as anchor.Idl,
        taxonomyProgramAddress,
        provider
      );

    const templateProgram = new anchor.Program(
        template_idl as anchor.Idl,
        templateProgramAddress,
        provider
      );

    const loadProgram = () => {
        if (model === "taxonomy") {
            return taxonomyProgram;
        } else if (model === "template") {
            return templateProgram;
        } else throw Error("program does not exist")
    }

    this.program = loadProgram();
    this.provider = provider;
    this.cluster = cluster;
  }

  // public post = new Post(this);
  // public connection = new Connection(this);
  // public profile = new Profile(this);
}