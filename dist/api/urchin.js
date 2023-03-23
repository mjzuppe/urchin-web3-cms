"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const BASE_URL = '';
const sendTransaction = () => {
    return fetch(`${BASE_URL}send-transaction`, {})
        .then((res) => res)
        .catch(() => 'Failed to request "send transaction"');
};
const signTransaction = () => {
    return fetch(`${BASE_URL}sign-transaction`, {})
        .then((res) => res)
        .catch(() => 'Failed to request "sign transaction"');
};
(0, _1.addRequest)('sendTransaction', sendTransaction);
(0, _1.addRequest)('signTransaction', signTransaction);
