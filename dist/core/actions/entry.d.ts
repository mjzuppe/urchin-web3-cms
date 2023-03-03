import { Entry, CreateEntryPayload } from '../../types/entry';
declare const createEntry: (payload: CreateEntryPayload) => Entry;
declare const getEntries: (publicKeys?: string[]) => Entry[];
export { createEntry, getEntries };
