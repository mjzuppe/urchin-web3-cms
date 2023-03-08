import { Asset, CreateAssetPayload, UpdateAssetPayload } from '../../types/asset';
declare const createAsset: (payload: CreateAssetPayload) => CreateAssetPayload;
declare const getAssets: (publicKeys?: string[]) => Asset[];
declare const getAssetsCreateQueue: () => CreateAssetPayload[];
declare const getAssetsUpdateQueue: () => UpdateAssetPayload[];
declare const updateAsset: (payload: UpdateAssetPayload) => UpdateAssetPayload;
export { createAsset, getAssets, getAssetsCreateQueue, getAssetsUpdateQueue, updateAsset };
