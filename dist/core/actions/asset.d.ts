import { Asset, CreateAssetPayload } from '../../types/asset';
declare const createAsset: (payload: CreateAssetPayload) => Asset;
declare const getAssets: (publicKeys?: string[]) => Asset[];
export { createAsset, getAssets };

