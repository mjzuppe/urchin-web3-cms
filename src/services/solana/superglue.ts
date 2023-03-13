export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// TODO MJZ: Add retry logic and error catching