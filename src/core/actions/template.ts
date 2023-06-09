import * as anchor from '@project-serum/anchor';
import * as SolanaInteractions from '../../services/anchor/programs';
import { TemplateCreatePayload, Template, TemplateUpdatePayload, TemplateQueues } from '../../types/template';
import { loadSolanaConfig, sleep } from '../../services/solana';
import NodeWallet from '@project-serum/anchor/dist/cjs/nodewallet';
import { Keypair, PublicKey } from '@solana/web3.js';
import { PlayaArgs } from '../../types/core';
import { validateCreateTemplateSchema, validateGetTemplatesSchema, validateUpdateTemplateSchema } from '../../validators/template';
import { formatTemplateAccounts } from '../../services/solana/transform';
import * as metadata from '../../services/arweave/metadata';

let CREATE_QUEUE: TemplateCreatePayload[] = [];
let UPDATE_QUEUE: TemplateUpdatePayload[] = [];

const ephemeralKeypair = Keypair.generate();

const _resetTemplatesCreateQueue = (): void => {
  CREATE_QUEUE = [];
};

const _resetTemplatesUpdateQueue = (): void => {
  UPDATE_QUEUE = [];
};

const cleanTemplates = () => {
  _resetTemplatesCreateQueue();
  _resetTemplatesUpdateQueue();
};

const createTemplate = (payload: TemplateCreatePayload[]): TemplateCreatePayload[] => {
  validateCreateTemplateSchema(payload);

  CREATE_QUEUE = [...CREATE_QUEUE, ...payload];

  return payload;
};

const createTxsTemplates = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, rpc, wallet, owner, ownerPublicKey, payerPublicKey, preflightCommitment, walletContextState } = loadSolanaConfig(args);

  if (payer instanceof Keypair) throw new Error('To create template transactions, you must provide Publickey instead of a Keypair.');

  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'template',
    cluster
  );

  let transactions: any = [];

  for (const createTemplateFromQueue of CREATE_QUEUE) {
    // Arweave
    const arweaveData = {
      inputs: createTemplateFromQueue.inputs,
      created: Date.now()
    };

    const arweaveResponse = await metadata.uploadData(payer instanceof Keypair? payer : ephemeralKeypair, cluster, arweaveData, walletContextState);
    const arweaveId = arweaveResponse.id;

    const createdTemplate = await new SolanaInteractions.Template(sdk).createTemplateTx(
      payerPublicKey,
      ownerPublicKey,
      arweaveId,
      createTemplateFromQueue.archived,
      createTemplateFromQueue.original,
    );
    const { tx } = createdTemplate;
    transactions.push(tx);
  }

  for (const updateTemplateFromQueue of UPDATE_QUEUE) {
    if (!updateTemplateFromQueue.publicKey) continue;

    const updatedTemplate = await new SolanaInteractions.Template(sdk).updateTemplateTx(
      updateTemplateFromQueue.publicKey,
      payerPublicKey,
      updateTemplateFromQueue.archived,
      updateTemplateFromQueue.version
    );
    const { tx } = updatedTemplate;
    transactions.push(tx);
  }

  _resetTemplatesCreateQueue();
  _resetTemplatesUpdateQueue();

  return transactions;
};

const getTemplates = async (args: PlayaArgs, publicKeys: PublicKey[] = []): Promise<Template[]> => {
  validateGetTemplatesSchema(publicKeys);

  const { cluster, payer, rpc, wallet, preflightCommitment } = loadSolanaConfig(args);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'template',
    cluster
  );

  let templateAccounts: any = await new SolanaInteractions.Template(sdk).getTemplate(publicKeys);
  return formatTemplateAccounts(templateAccounts);
};

const getAllTemplates = async (args: PlayaArgs) => {
  const { cluster, payer, owner, ownerPublicKey, rpc, wallet, preflightCommitment } = loadSolanaConfig(args);

  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'template',
    cluster
  );

  let templateAccounts: any = await new SolanaInteractions.Template(sdk).getTemplateAll(ownerPublicKey);
  return templateAccounts

};

const getTemplateCreateQueue = (): TemplateCreatePayload[] => {
  return CREATE_QUEUE;
};

const getTemplateUpdateQueue = (): TemplateUpdatePayload[] => {
  return UPDATE_QUEUE;
};

const getTemplatesQueues = (): TemplateQueues => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });

const processTemplates = async (args: PlayaArgs): Promise<any> => {
  const { cluster, payer, rpc, wallet, preflightCommitment, owner, walletContextState } = await loadSolanaConfig(args);
  if (payer instanceof PublicKey) throw new Error(`Attempting to process templates with a payer public key.`);
  const sdk = new SolanaInteractions.AnchorSDK(
    wallet as NodeWallet,
    rpc,
    preflightCommitment as anchor.web3.ConfirmOptions,
    'template',
    cluster
  );

  let mutatedTemplateIds: PublicKey[] = [];

  for (const createTemplateFromQueue of CREATE_QUEUE) {
    // Arweave
    const arweaveData = { // TODO MJZ update
      title: createTemplateFromQueue.title,
      taxonomies: createTemplateFromQueue.taxonomies,
      inputs: createTemplateFromQueue.inputs,
      created: Date.now()
    }

    const arweaveResponse = await metadata.uploadData(payer instanceof Keypair? payer : ephemeralKeypair, cluster, arweaveData, walletContextState);
    const arweaveId = arweaveResponse.id;

    // Solana 
    const createdTemplate = await new SolanaInteractions.Template(sdk).createTemplate(
      owner || payer,
      arweaveId,
      createTemplateFromQueue.archived,
      createTemplateFromQueue.original || null,
    );
    const { tx } = createdTemplate;
    const data: any = await rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
    const { postBalances, preBalances } = data.meta;
    
    mutatedTemplateIds.push(createdTemplate.publicKey);
  }

  for (const updateTemplateFromQueue of UPDATE_QUEUE) {
    if (!updateTemplateFromQueue.publicKey) continue;

    const updatedTemplate = await new SolanaInteractions.Template(sdk).updateTemplate(
      updateTemplateFromQueue.publicKey,
      owner || payer,
      updateTemplateFromQueue.archived,
      updateTemplateFromQueue.version
    );
    const { tx } = updatedTemplate;
    const data: any = await rpc.getTransaction(tx, { maxSupportedTransactionVersion: 0 });
    const { postBalances, preBalances } = data.meta;
    
    mutatedTemplateIds.push(updatedTemplate.publicKey);
  }

  await sleep(8000);

  let templateAccounts: any = await new SolanaInteractions.Template(sdk).getTemplate(mutatedTemplateIds);
  templateAccounts = formatTemplateAccounts(templateAccounts);   //TODO MJZ 

  _resetTemplatesCreateQueue();
  _resetTemplatesUpdateQueue();

  return templateAccounts;
};

const updateTemplate = (payload: TemplateUpdatePayload[]): TemplateUpdatePayload[] => {
  validateUpdateTemplateSchema(payload);

  UPDATE_QUEUE = [...UPDATE_QUEUE, ...payload];

  return payload;
};

export {
  cleanTemplates,
  createTemplate,
  createTxsTemplates,
  getTemplates,
  getTemplateCreateQueue,
  getTemplateUpdateQueue,
  getTemplatesQueues,
  updateTemplate,
  processTemplates,
  getAllTemplates
};
