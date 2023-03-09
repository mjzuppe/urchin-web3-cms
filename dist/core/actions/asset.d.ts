import { Asset, AssetQueues, AssetCreatePayload, AssetUpdatePayload } from '../../types/asset';
declare const createAsset: (payload: AssetCreatePayload[]) => AssetCreatePayload[];
declare const getAssets: (publicKeys?: string[]) => Asset[];
declare const getAssetsCreateQueue: () => AssetCreatePayload[];
declare const getAssetsQueues: () => AssetQueues;
declare const getAssetsUpdateQueue: () => AssetUpdatePayload[];
declare const updateAsset: (payload: AssetUpdatePayload[]) => AssetUpdatePayload[];
export { createAsset, getAssets, getAssetsCreateQueue, getAssetsQueues, getAssetsUpdateQueue, updateAsset };
