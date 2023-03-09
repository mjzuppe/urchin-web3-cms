"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTemplate = exports.getTemplatesQueues = exports.getTemplates = exports.createTemplate = void 0;
const template_1 = require("../../validators/template");
let CREATE_QUEUE = [];
let UPDATE_QUEUE = [];
const _resetTemplatesCreateQueue = () => {
    CREATE_QUEUE = [];
};
const _resetTemplatesUpdateQueue = () => {
    UPDATE_QUEUE = [];
};
const createTemplate = (payload) => {
    (0, template_1.validateCreateTemplateSchema)(payload);
    CREATE_QUEUE.push(payload);
    return payload;
};
exports.createTemplate = createTemplate;
const getTemplates = (publicKeys = []) => {
    (0, template_1.validateGetTemplatesSchema)(publicKeys);
    return [];
};
exports.getTemplates = getTemplates;
const getTemplatesQueues = () => ({ create: CREATE_QUEUE, update: UPDATE_QUEUE });
exports.getTemplatesQueues = getTemplatesQueues;
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
const updateTemplate = (payload) => {
    (0, template_1.validateUpdateTemplateSchema)(payload);
    UPDATE_QUEUE.push(payload);
    return payload;
};
exports.updateTemplate = updateTemplate;
