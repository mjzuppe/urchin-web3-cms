import { Keypair, PublicKey } from '@solana/web3.js';
import { ApiVersions } from './api';

type PlayaArgs = {
  apiVersion?: ApiVersions;
  payer: Keypair,
  cluster?: string,
  rpc?: string,
  ping?:any;
  taxonomy?:any;
  template?:any;
  entry?:any;
};

export type { PlayaArgs };
