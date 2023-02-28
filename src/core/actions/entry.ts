import { Entry, CreateEntryPayload } from '../../types/entry';
import { validateCreateEntrySchema, validateGetEntriesSchema } from '../../validators/entry';

const createEntry = (payload: CreateEntryPayload): Entry => {
  validateCreateEntrySchema(payload);

  return {
    immutable: false,
    inputs: [
      {
        body: '',
        featuredImage: {
          publicKey: '',
          url: 'url://',
        },
        headline: '',
        stage: 'published',
      }
    ],
    owner: '',
    private: false,
    publicKey: '',
    taxonomy: [],
    template: '5SKNwTC2Svdd7AbynWTSwPdyZitDcLVcFeQrkqQ137Hd',
    version: 0,
  };    
};

const getEntries = (publicKeys: string[] = []): Entry[] => {
  validateGetEntriesSchema(publicKeys);

  return [];
};

export { createEntry, getEntries };
