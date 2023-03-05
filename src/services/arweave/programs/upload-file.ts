import { Keypair } from '@solana/web3.js';
import { createHash } from 'node:crypto'
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const uploadMockFile = async (files: string[] //, payer: Keypair
) => {
    await sleep(3000);
    return files.map((file) => createHash('sha256').update(file).digest('hex')  );
}

const test = async () => {
  const r = await uploadMockFile(['a', 'b', 'c']);
  console.log(r);
}
test();