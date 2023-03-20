import { Entry, EntryCreatePayload, EntryUpdatePayload, EntryQueues } from '../../types/entry';
import { PlayaArgs } from '../../types/core';
import { PublicKey } from '@solana/web3.js';
declare const cleanEntries: () => void;
declare const createEntry: (payload: EntryCreatePayload[]) => EntryCreatePayload[];
declare const getEntries: (args: PlayaArgs, publicKeys?: PublicKey[]) => Promise<Entry[]>;
declare const getAllEntries: (args: PlayaArgs) => Promise<Entry[]>;
declare const getEntriesQueues: () => EntryQueues;
declare const processEntries: (args: PlayaArgs) => Promise<any>;
declare const updateEntry: (payload: EntryUpdatePayload[]) => EntryUpdatePayload[];
export { cleanEntries, createEntry, getEntries, getEntriesQueues, updateEntry, processEntries, getAllEntries };
