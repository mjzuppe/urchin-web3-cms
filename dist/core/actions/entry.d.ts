import { Entry, EntryCreatePayload, EntryUpdatePayload, EntryQueues } from '../../types/entry';
import { PlayaArgs } from '../../types/core';
import { PublicKey } from '@solana/web3.js';
declare const cleanEntries: () => void;
declare const createEntry: (args: PlayaArgs, payload: EntryCreatePayload[]) => Promise<EntryCreatePayload[]>;
declare const createTxsEntries: (args: PlayaArgs) => Promise<any>;
declare const getEntries: (args: PlayaArgs, publicKeys?: PublicKey[]) => Promise<Entry[]>;
declare const getAllEntries: (args: PlayaArgs) => Promise<Entry[]>;
declare const getEntriesQueues: () => EntryQueues;
declare const processEntries: (args: PlayaArgs) => Promise<any>;
declare const updateEntry: (payload: EntryUpdatePayload[]) => EntryUpdatePayload[];
export { cleanEntries, createEntry, createTxsEntries, getEntries, getEntriesQueues, updateEntry, processEntries, getAllEntries };
