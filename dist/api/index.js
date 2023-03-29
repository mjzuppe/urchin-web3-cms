"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequest = exports.addRequest = void 0;
const requests = {};
const addRequest = (name, request) => {
    if (requests[name])
        throw new Error('Request name has been already used!');
    requests[name] = request;
};
exports.addRequest = addRequest;
const getRequest = (name) => {
    if (!requests[name])
        throw new Error('Request name not found!');
    return requests[name];
};
exports.getRequest = getRequest;
