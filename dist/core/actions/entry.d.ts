import { Entry, CreateEntryPayload, UpdateEntryPayload, EntryQueues } from '../../types/entry';
declare const createEntry: (payload: CreateEntryPayload) => Entry;
declare const getEntries: (publicKeys?: string[]) => Entry[];
declare const getEntriesQueues: () => EntryQueues;
declare const updateEntry: (payload: UpdateEntryPayload) => UpdateEntryPayload;
export { createEntry, getEntries, getEntriesQueues, updateEntry };
