import { Entry, EntryCreatePayload, EntryUpdatePayload, EntryQueues } from '../../types/entry';
import { PlayaArgs } from '../../types/core';
declare const createEntry: (payload: EntryCreatePayload[]) => EntryCreatePayload[];
declare const getEntries: (publicKeys?: string[]) => Entry[];
declare const getEntriesQueues: () => EntryQueues;
declare const processEntries: (args: PlayaArgs) => Promise<any>;
declare const updateEntry: (payload: EntryUpdatePayload[]) => EntryUpdatePayload[];
export { createEntry, getEntries, getEntriesQueues, updateEntry, processEntries };
