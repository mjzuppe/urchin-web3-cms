type Requests = {
  [name: string]: Function;
};

const requests: Requests = {};

const addRequest = (name: string, request: Function) => {
  if (requests[name]) throw new Error('Request name has been already used!');
  
  requests[name] = request;
};

const getRequest = (name: string) => {
  if (!requests[name]) throw new Error('Request name not found!');

  return requests[name];
};

export { addRequest, getRequest };
