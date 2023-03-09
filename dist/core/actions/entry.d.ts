import { Entry, EntryCreatePayload, EntryUpdatePayload, EntryQueues } from '../../types/entry';
declare const createEntry: (payload: EntryCreatePayload[]) => EntryCreatePayload[];
declare const getEntries: (publicKeys?: string[]) => Entry[];
declare const getEntriesQueues: () => EntryQueues;
declare const updateEntry: (payload: EntryUpdatePayload[]) => EntryUpdatePayload[];
export { createEntry, getEntries, getEntriesQueues, updateEntry };
