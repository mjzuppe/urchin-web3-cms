import { Entry, EntryUserCreatePayload, EntryUserUpdatePayload, EntryQueues } from '../../types/entry';
import { PlayaArgs } from '../../types/core';
declare const createEntry: (payload: EntryUserCreatePayload[]) => EntryUserCreatePayload[];
declare const getEntries: (publicKeys?: string[]) => Entry[];
declare const getEntriesQueues: () => EntryQueues;
declare const processEntries: (args: PlayaArgs) => Promise<any>;
declare const updateEntry: (payload: EntryUserUpdatePayload[]) => EntryUserUpdatePayload[];
export { createEntry, getEntries, getEntriesQueues, updateEntry, processEntries };
