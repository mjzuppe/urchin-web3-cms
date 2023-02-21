const Playa = require('./dist').default();

const playa = Playa({});

console.log(playa.v1.getVersion());
playa.v1.updateVersion();
console.log(playa.v1.getVersion());
