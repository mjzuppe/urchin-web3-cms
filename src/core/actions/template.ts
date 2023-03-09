import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { TemplateCreatePayload, Template, TemplateUpdatePayload, TemplateQueues } from '../../types/template';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { PublicKey } from '@solana/web3.js';
import { PlayaArgs } from '../../types/core';
import { validateCreateTemplateSchema, validateGetTemplatesSchema, validateUpdateTemplateSchema } from '../../validators/template';

let CREATE_QUEUE: TemplateCreatePayload[] = [];
let UPDATE_QUEUE: TemplateUpdatePayload[] = [];

const _resetTemplatesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetTemplatesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const createTemplate = (payload: TemplateCreatePayload[]): TemplateCreatePayload[] => {
  validateCreateTemplateSchema(payload);

  CREATE_QUEUE = [...CREATE_QUEUE, ...payload];

  return payload;    
};

const getTemplates = (publicKeys: string[] = []): Template[] => {
  validateGetTemplatesSchema(publicKeys);

  return [];
};


const getTemplateCreateQueue = (): TemplateCreatePayload[] => {
  return CREATE_QUEUE;
};

const getTemplateUpdateQueue = (): TemplateUpdatePayload[] => {
  return UPDATE_QUEUE;
};

const getTemplatesQueues = (): TemplateQueues => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });

const processTemplates = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, rpc, wallet, preflightCommitment } = await loadSolanaConfig(args);

  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'template',
    'devnet'
  );

  let mutatedTemplateIds: PublicKey[] = [];

  for (const createTemplateFromQueue of CREATE_QUEUE) { 
    const createdTemplate = await new SolanaInteractions.Template(sdk).createTemplate(
      createTemplateFromQueue.owner || payer,
      "2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892", // TODO MJZ URGENT REMOVE THIS
      createTemplateFromQueue.archived,
      createTemplateFromQueue.original,
     
    );
    mutatedTemplateIds.push(createdTemplate.publicKey);
  }

  for (const updateTemplateFromQueue of UPDATE_QUEUE) {
    if (!updateTemplateFromQueue.publicKey) continue;

    const updatedTemplate = await new SolanaInteractions.Template(sdk).updateTemplate(
      updateTemplateFromQueue.publicKey,
      updateTemplateFromQueue.owner || payer,
      updateTemplateFromQueue.archived
    );
    mutatedTemplateIds.push(updatedTemplate.publicKey);
  }

  await sleep(8000);

  let templateAccounts: any = await new SolanaInteractions.Template(sdk).getTemplate(mutatedTemplateIds); 
  // templateAccounts = formatTemplateAccounts(templateAccounts);   //TODO MJZ 

  _resetTemplatesCreateQueue();
  _resetTemplatesUpdateQueue();

  return templateAccounts;
};

const updateTemplate = (payload: TemplateUpdatePayload[]): TemplateUpdatePayload[] => {
  validateUpdateTemplateSchema(payload);

  UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];

  return payload;
};

export { createTemplate, getTemplates, getTemplatesQueues, updateTemplate, processTemplates };
