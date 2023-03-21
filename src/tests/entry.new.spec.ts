import { expect } from 'chai';

import { basicCreateEntryPayload, basicUpdateEntryPayload, payer } from './_commonResources';
import { cleanEntries, createEntry, getAllEntries, getEntries, getEntriesQueues, processEntries, updateEntry } from '../core/actions/entry';

describe('Manage entry', () => {
  beforeEach(() => { cleanEntries(); });

  it('should create a new entry', async () => {
    const entry = await createEntry({ cluster: 'devnet', payer }, [basicCreateEntryPayload]);

    expect(entry).to.deep.equal([basicCreateEntryPayload]);
  }).timeout(20000);

  // TODO: Fix error
  it('should get entries', async () => {
    const entries = await getEntries({ cluster: 'devnet', payer }, []);

    // TODO: Need a public key
  });

  it('should get all entries', async () => {
    const entries = await getAllEntries({ cluster: 'devnet', payer });

    expect(entries.length).to.satisfy((count: number) => count > 0);
  });

  it('should get entries queues', () => {
    createEntry({ cluster: 'devnet', payer }, [basicCreateEntryPayload]);
    updateEntry([basicUpdateEntryPayload]);

    const entriesQueues = getEntriesQueues();

    expect(entriesQueues).to.deep.equal({ create: [basicCreateEntryPayload], update: [basicUpdateEntryPayload] });
  });

  it('should process entries', async () => {
    createEntry({ cluster: 'devnet', payer }, [basicCreateEntryPayload]);

    const entries = await processEntries({ cluster: 'devnet', payer });

    expect(entries).to.deep.equal([
      {
        archived: false,
        arweaveId: '2222222222222222222222222222222222222222222',
        immutable: false,
        publicKey: entries[0].publicKey,
        owner: '5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd',
        url: 'https://arweave.net/2222222222222222222222222222222222222222222',
      }
    ]);
  }).timeout(20000);

  it('should update entry', () => {
    const entry = updateEntry([basicUpdateEntryPayload]);

    expect(entry).to.deep.equal([basicUpdateEntryPayload]);
  });

  it('should throw an error due to invalid public key', () => {
    const failedPayload = { ...basicUpdateEntryPayload, ...{ publicKey: 'pubkey' } }
    const entry = () => updateEntry([failedPayload]);

    expect(entry).to.throw('Invalid public key input');
  });
});
