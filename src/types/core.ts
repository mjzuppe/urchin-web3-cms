import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { ApiVersions } from './api';

type PlayaArgs = {
  apiVersion?: ApiVersions;
  payer: Keypair,
  owner?: Keypair,
  cluster?: Cluster,
  rpc?: string,
  ping?:any;
  taxonomy?:any;
  template?:any;
  entry?:any;
  walletContextState?:any;
};

export type { PlayaArgs };
