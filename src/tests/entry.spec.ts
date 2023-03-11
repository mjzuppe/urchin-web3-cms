// import urchin from '../index';
// import { Keypair, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
// import testKeypair from './test-wallet';

// describe('Manage entry', () => {

//     const payer = testKeypair;

//     let pubkey: PublicKey = payer.publicKey;

//     it("should create a new asset", async () => {
//         const u = urchin({
//             payer,
//             cluster: "devnet",
//         });
//         u.entry.create(
//             [
//               {
//                 template: payer.publicKey,
//                 taxonomies: [payer.publicKey],
//                 private: false,
//                 immutable: false,
//                 inputs: []
//               }
//             ]
//         )

// const preflight = await u.preflight();
// console.log("PREFLIGHT::", preflight);

// const r:any = await u.process();
// console.log("PROCESS::", r);
// // pubkey = new PublicKey(r.asset[0].publicKey);

//   }).timeout(100000);

// // it("should update a new asset", async () => {
// //     const u = urchin({
// //         payer,
// //         cluster: "devnet",
// //     });
// //     u.asset.update([
// //         {
// //             publicKey: pubkey,
// //             archived: true,
// //         }
// //     ])

// //     const preflight = await u.preflight();
// //     console.log("PREFLIGHT::", preflight);

// //     const r = await u.process();
// //     console.log("PROCESS::", r);

// // }).timeout(100000);

// });


