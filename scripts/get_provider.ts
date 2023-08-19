// import hardhat from "hardhat";

// // export function getMyProvider() {
// //     let config: any = {
// //         // baseUrl: "https://alpha4.starknet.io"
// //         baseUrl: "http://127.0.0.1:5050/"
// //     };
// //     console.log("Generating provider with config", config);
// //     const provider = new Provider({ sequencer: config });
// //     return provider;
// // }

// export function getMyProvider(network: string) {
//   if (!network) {
//     network = hardhat.network.name;
//   }
//   const networkName = network;
//   const networkConfig = hardhat.config.networks[networkName];
//   if (!networkConfig.url) {
//     throw new Error(`network ${networkName} does not have a url`);
//   }
//   const config: any = {
//     baseUrl: networkConfig.url,
//   };
//   console.log("Generating provider with config", config);
//   const provider = new Provider({ sequencer: config });
//   return provider;
// }
// export function getMyRPCProvider(network: string) {
//   if (!network) {
//     network = hardhat.network.name;
//   }
//   const networkName = network;
//   const networkConfig = hardhat.config.networks[networkName];
//   if (!networkConfig.rpcUrl) {
//     throw new Error(`network ${networkName} does not have a rpcUrl`);
//   }
//   console.log("Generating rpc provider with config", networkConfig.rpcUrl);
//   const rpcprovider = new RpcProvider({
//     nodeUrl: networkConfig.rpcUrl,
//   });
//   return rpcprovider;
// }
