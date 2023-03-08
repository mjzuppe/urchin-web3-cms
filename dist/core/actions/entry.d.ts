import { Entry, CreateEntryPayload, UpdateEntryPayload } from '../../types/entry';
declare const createEntry: (payload: CreateEntryPayload) => Entry;
declare const getEntries: (publicKeys?: string[]) => Entry[];
declare const updateEntry: (payload: UpdateEntryPayload) => UpdateEntryPayload;
export { createEntry, getEntries, updateEntry };
