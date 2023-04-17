import { expect } from 'chai';

import { basicCreateAssetPayload, basicUpdateAssetPayload, payer, pubkey } from './_commonResources';
import { cleanAssets, createAsset, getAllAssets, getAssets, getAssetsQueues, processAssets, updateAsset } from '../core/actions/asset';
import { PublicKey } from '@solana/web3.js';

describe('Manage asset', () => {
  beforeEach(() => { cleanAssets(); });

  it('should create a new asset', () => {
    const asset = createAsset([basicCreateAssetPayload]);

    expect(asset).to.deep.equal([basicCreateAssetPayload]);
  });

  // TODO: Fix error
  it('should get assets', async () => {
    const pubkeyOne = new PublicKey('3W1As1tZj3H6vdcrthZi7GwN4QxJsrodr9fr9qEhLAM6');
    const assets = await getAssets({ cluster: 'devnet', payer }, [pubkeyOne]);

    expect(assets).to.deep.equal(
      [
        {
          publicKey: '3W1As1tZj3H6vdcrthZi7GwN4QxJsrodr9fr9qEhLAM6',
          owner: '5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd',
          arweaveId: '2222222222222222222222222222222222222222222',
          url: 'https://arweave.net/2222222222222222222222222222222222222222222',
          archived: false,
          immutable: false,
        },
      ]
    );
  });

  it('should get all assets', async () => {
    const assets = await getAllAssets({ cluster: 'devnet', payer });

    expect(assets.length).to.satisfy((count: number) => count > 0);
  });

  it('should get assets queues', () => {
    createAsset([basicCreateAssetPayload]);
    updateAsset([basicUpdateAssetPayload]);

    const assetsQueues = getAssetsQueues();

    expect(assetsQueues).to.deep.equal({ create: [basicCreateAssetPayload], update: [basicUpdateAssetPayload] });
  });

  it('should process assets', async () => {
    createAsset([basicCreateAssetPayload]);

    const assets = await processAssets({ cluster: 'devnet', payer });

    expect(assets).to.deep.equal([
      {
        archived: false,
        arweaveId: '2222222222222222222222222222222222222222222',
        immutable: false,
        publicKey: assets[0].publicKey,
        owner: '5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd',
        url: 'https://arweave.net/2222222222222222222222222222222222222222222',
      }
    ]);
  }).timeout(20000);

  it('should update asset', () => {
    const asset = updateAsset([basicUpdateAssetPayload]);

    expect(asset).to.deep.equal([basicUpdateAssetPayload]);
  });

  it('should throw an error due to invalid public key', () => {
    const failedPayload = { ...basicUpdateAssetPayload, ...{ publicKey: 'pubkey' } }
    const asset = () => updateAsset([failedPayload]);

    expect(asset).to.throw('Invalid public key input');
  });
});
