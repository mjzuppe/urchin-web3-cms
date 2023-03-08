import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { CreateTemplatePayload, Template, UpdateTemplatePayload } from '../../types/template';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PublicKey } from '@solana/web3.js';
import { PlayaArgs } from '../../types/core';
import { validateCreateTemplateSchema, validateGetTemplatesSchema, validateUpdateTemplateSchema } from '../../validators/template';

let CREATE_QUEUE: CreateTemplatePayload[] = [];
let UPDATE_QUEUE: UpdateTemplatePayload[] = [];

const _resetTemplatesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetTemplatesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const createTemplate = (payload: CreateTemplatePayload): Template => {
  validateCreateTemplateSchema(payload);

  CREATE_QUEUE.push(payload);

  return payload;    
};

const getTemplates = (publicKeys: string[] = []): Template[] => {
  validateGetTemplatesSchema(publicKeys);

  return [];
};

// const processTemplates = async (args: PlayaArgs): Promise<any> => {
//   const { cluster, payer, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);

//   const sdk = new SolanaInteractions.AnchorSDK(
//     wallet as NodeWallet,
//     rpc,
//     preflightCommitment as anchor.web3.ConfirmOptions,
//     'template',
//     'devnet'
//   );

//   let mutatedTemplateIds: PublicKey[] = [];

//   for (const createTemplateFromQueue of CREATE_QUEUE) { 
//     const createdTemplate = await new SolanaInteractions.Template(sdk).createTemplate(
//       createTemplateFromQueue.private,
//     );
//     mutatedTemplateIds.push(createdTemplate.publicKey);
//   }

//   for (const updateTemplateFromQueue of UPDATE_QUEUE) {
//     if (!updateTemplateFromQueue.publicKey) continue;

//     const updatedTemplate = await new SolanaInteractions.Template(sdk).updateTemplate(
//       updateTemplateFromQueue.publicKey,
//       updateTemplateFromQueue.private,
//     );
//     mutatedTemplateIds.push(updatedTemplate.publicKey);
//   }

//   await sleep(8000);

//   let templateAccounts: any = await new SolanaInteractions.Template(sdk).getTemplate(mutatedTemplateIds); 
//   templateAccounts = formatTemplateAccounts(templateAccounts);   

//   _resetTemplatesCreateQueue();
//   _resetTemplatesUpdateQueue();

//   return templateAccounts;
// };

const updateTemplate = (payload: UpdateTemplatePayload): UpdateTemplatePayload => {
  validateUpdateTemplateSchema(payload);

  UPDATE_QUEUE.push(payload);

  return payload;
};

export { createTemplate, getTemplates, updateTemplate };
