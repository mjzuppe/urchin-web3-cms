import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { Asset, AssetQueues, AssetUserCreatePayload, AssetUserUpdatePayload } from '../../types/asset';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PublicKey } from '@solana/web3.js';
import { validateCreateAssetSchema, validateGetAssetsSchema, validateUpdateAssetSchema } from '../../validators/asset';
import { PlayaArgs } from '../../types/core';

let CREATE_QUEUE: AssetUserCreatePayload[] = [];
let UPDATE_QUEUE: AssetUserUpdatePayload[] = [];

const _resetAssetsCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetAssetsUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const createAsset = (payload: AssetUserCreatePayload[]): AssetUserCreatePayload[] => {
  validateCreateAssetSchema(payload);

  CREATE_QUEUE = [...CREATE_QUEUE, ...payload];

  return payload;
};

const getAssets = (publicKeys: string[] = []): Asset[] => {
  validateGetAssetsSchema(publicKeys);

  return [];
};

const getAssetsCreateQueue = (): AssetUserCreatePayload[] => {
  return CREATE_QUEUE;
};

const getAssetsQueues = (): AssetQueues => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });

const getAssetsUpdateQueue = (): AssetUserUpdatePayload[] => {
  return UPDATE_QUEUE;
};

const processAssets = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, owner, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);

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
      "2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892", // TODO MJZ URGENT REMOVE THIS
      createAssetFromQueue.immutable || false,
      createAssetFromQueue.archived || false
    );

    mutatedAssetIds.push(createdAsset.publicKey);
  }

  for (const updateAssetFromQueue of UPDATE_QUEUE) {
    if (!updateAssetFromQueue.publicKey) continue;

    const updatedAsset = await new SolanaInteractions.Asset(sdk).updateAsset(
      updateAssetFromQueue.publicKey,
      owner || payer,
      "2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892", // TODO MJZ URGENT REMOVE THIS
      updateAssetFromQueue.immutable || false,
      updateAssetFromQueue.archived || false
    );

    mutatedAssetIds.push(updatedAsset.publicKey);
  }

  await sleep(8000);

  let assetAccounts: any = await new SolanaInteractions.Asset(sdk).getAsset(mutatedAssetIds); 
  // assetAccounts = formatAssetAccounts(assetAccounts);   

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
  createAsset,
  getAssets,
  getAssetsCreateQueue,
  getAssetsQueues,
  getAssetsUpdateQueue,
  updateAsset,
  processAssets
};
