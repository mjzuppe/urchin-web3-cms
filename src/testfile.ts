import createPlaya from "./index";
const playa = createPlaya();
console.log("PLaya::", playa.taxonomy().create({label: "test label1"}));
console.log("PLaya::", playa.taxonomy().create({label: "test label2"}));
console.log("Queued", playa.getQueue());
console.log("Run", playa.run());
