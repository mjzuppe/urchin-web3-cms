import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { Asset, AssetQueues, AssetUserCreatePayload, AssetUserUpdatePayload } from '../../types/asset';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { Keypair, PublicKey } from '@solana/web3.js';
import { validateCreateAssetSchema, validateGetAssetsSchema, validateUpdateAssetSchema } from '../../validators/asset';
import { PlayaArgs } from '../../types/core';
import { formatAssetAccounts } from '../../services/solana/transform';

let CREATE_QUEUE: AssetUserCreatePayload[] = [];
let UPDATE_QUEUE: AssetUserUpdatePayload[] = [];

const _resetAssetsCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetAssetsUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const cleanAssets = () => {
  _resetAssetsCreateQueue();
  _resetAssetsUpdateQueue();
};

const createAsset = (payload: AssetUserCreatePayload[]): AssetUserCreatePayload[] => {
  validateCreateAssetSchema(payload);

  CREATE_QUEUE = [...CREATE_QUEUE, ...payload];

  return payload;
};

const createTxsAssets = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, rpc, wallet, owner, ownerPublicKey, payerPublicKey, preflightCommitment } = loadSolanaConfig(args);

  if (payer instanceof Keypair) throw new Error('To create assets transactions, you must provide Publickey instead of a Keypair.');

  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'asset',
    cluster
  );

  let transactions: any = [];

  for (const createAssetFromQueue of CREATE_QUEUE) {
    const createdAsset = await new SolanaInteractions.Asset(sdk).createAssetTx(
      payerPublicKey,
      ownerPublicKey,
      createAssetFromQueue.arweaveId,
      createAssetFromQueue.immutable || false,
      createAssetFromQueue.archived || false
    );
    const { tx } = createdAsset;
    transactions.push(tx);
  }

  for (const updateAssetFromQueue of UPDATE_QUEUE) {
    if (!updateAssetFromQueue.publicKey) continue;

    const updatedAsset = await new SolanaInteractions.Asset(sdk).updateAssetTx(
      updateAssetFromQueue.publicKey,
      payerPublicKey,
      updateAssetFromQueue.arweaveId,
      updateAssetFromQueue.immutable || false,
      updateAssetFromQueue.archived || false
    );
    const { tx } = updatedAsset;
    transactions.push(tx);
  }

  _resetAssetsCreateQueue();
  _resetAssetsUpdateQueue();

  return transactions;
};

const getAssets = async (args: PlayaArgs, publicKeys: PublicKey[] = []): Promise<Asset[]> => {
  validateGetAssetsSchema(publicKeys);

  const { cluster, payer, rpc, wallet, preflightCommitment } = loadSolanaConfig(args);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'asset',
    cluster
  );

  let AssetAccounts: any = await new SolanaInteractions.Asset(sdk).getAsset(publicKeys);
  return formatAssetAccounts(AssetAccounts);
};

const getAllAssets = async (args: PlayaArgs) => {

  const { cluster, payer, owner, ownerPublicKey, rpc, wallet, preflightCommitment } = loadSolanaConfig(args);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'asset',
    cluster
  );

  let AssetAccounts: any = await new SolanaInteractions.Asset(sdk).getAssetAll(ownerPublicKey);
  return AssetAccounts

};

const getAssetsCreateQueue = (): AssetUserCreatePayload[] => {
  return CREATE_QUEUE;
};

const getAssetsQueues = (): AssetQueues => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });

const getAssetsUpdateQueue = (): AssetUserUpdatePayload[] => {
  return UPDATE_QUEUE;
};

const processAssets = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, owner, rpc, wallet, preflightCommitment, returnTransactions } = await loadSolanaConfig(args);
  if (payer instanceof PublicKey) throw new Error(`Attempting to process assets with a payer public key.`);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'asset',
    cluster
  );

  let mutatedAssetIds: PublicKey[] = [];

  for (const createAssetFromQueue of CREATE_QUEUE) {
    const createdAsset = await new SolanaInteractions.Asset(sdk).createAsset(
      owner || payer,
      createAssetFromQueue.arweaveId,
      createAssetFromQueue.immutable || false,
      createAssetFromQueue.archived || false
    );
    const { tx } = createdAsset;
    const data: any = await rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
    const { postBalances, preBalances } = data.meta;
    
    mutatedAssetIds.push(createdAsset.publicKey);
  }

  for (const updateAssetFromQueue of UPDATE_QUEUE) {
    if (!updateAssetFromQueue.publicKey) continue;

    const updatedAsset = await new SolanaInteractions.Asset(sdk).updateAsset(
      updateAssetFromQueue.publicKey,
      owner || payer,
      updateAssetFromQueue.arweaveId,
      updateAssetFromQueue.immutable || false,
      updateAssetFromQueue.archived || false
    );
    const { tx } = updatedAsset;
    const data: any = await rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
    const { postBalances, preBalances } = data.meta;
    
    mutatedAssetIds.push(updatedAsset.publicKey);
  }

  await sleep(8000);


  let assetAccounts: any = await new SolanaInteractions.Asset(sdk).getAsset(mutatedAssetIds);
  assetAccounts = formatAssetAccounts(assetAccounts);


  _resetAssetsCreateQueue();
  _resetAssetsUpdateQueue();

  return assetAccounts;
};

const updateAsset = (payload: AssetUserUpdatePayload[]): AssetUserUpdatePayload[] => {
  validateUpdateAssetSchema(payload);

  UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];

  return payload;
};

export {
  cleanAssets,
  createAsset,
  createTxsAssets,
  getAssets,
  getAssetsCreateQueue,
  getAssetsQueues,
  getAssetsUpdateQueue,
  updateAsset,
  processAssets,
  getAllAssets
};
