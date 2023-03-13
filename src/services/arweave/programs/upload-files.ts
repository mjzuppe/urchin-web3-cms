import Bundlr from "@bundlr-network/client";
import Arweave from 'arweave';
import { signers } from "arbundles";
import {uploadFiles, fundNode, getTransactionPrice, getFundedNodeBalance} from './arbundle-helpers'
require('dotenv').config()

const upload = async (files: string[]): Promise<any> => {
  const bundlr = new Bundlr(
    "https://devnet.bundlr.network",
    "solana",
    process.env.WALLET_PRIVATE_KEY, 
    {
        providerUrl: "https://api.devnet.solana.com"
    }
  )

  const arweave = Arweave.init({
    host: 'arweave.dev',
    port: 443,
    protocol: 'https', 
    logger: console.log, 
    logging: true,
  });

  const ephemeral = await arweave.wallets.generate();

  const signer = new signers.ArweaveSigner(ephemeral);
  
  const fileSize = 1000000; // change to check for file sizes once we have that logic ready
  const[err, price] = await getTransactionPrice(fileSize, bundlr)
  const nodeBalance = await getFundedNodeBalance(bundlr)
  
  if( err !== null ) {
    throw new Error(`Could not connect to wallet: ${err}`);
  } else if(price <= nodeBalance) {
    uploadFiles(bundlr, signer)
  } else {
    let[err, _] = await fundNode(bundlr, price)
      if(err != null ) {
        uploadFiles(bundlr, signer)
      } else {
        throw new Error(`Could not connect to wallet: ${err}`);
      }
  }
}

export { upload };