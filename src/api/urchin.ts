import { addRequest } from '.';

const BASE_URL = '';

const sendTransaction = (): Promise<any> => {
  return fetch(
    `${BASE_URL}send-transaction`,
    {
    }
  )
    .then((res) => res)
    .catch(() => 'Failed to request "send transaction"');
};

const signTransaction = () => {
  return fetch(
    `${BASE_URL}sign-transaction`,
    {
    }
  )
    .then((res) => res)
    .catch(() => 'Failed to request "sign transaction"');
};

addRequest('sendTransaction', sendTransaction);
addRequest('signTransaction', signTransaction);
