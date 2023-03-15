import { PublicKey } from '@solana/web3.js';
import Joi from 'joi';

const pubkey = () => {
  return Joi.any()
    .custom((value: any, helper: any) => {
      if (!(value instanceof PublicKey)) return helper.message('Invalid public key input');

      return true;
    })
}

export { pubkey };
