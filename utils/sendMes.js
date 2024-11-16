// import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
// // Ethers or Viem, both are supported
// import { ethers } from 'ethers';

// // To call this function, provide the message as a parameter
// // e.g. node sendMes.js 0xc17aeA1c1D9dE8aF1cE61bafCF83914c69F38C10 "I am in your walls"
// const receiverAdr = process.argv[2];
// const message = process.argv[3];
// console.log("Sending message:", message, "to", receiverAdr);

// const senderPrivate = "secret"

// const signer = new ethers.Wallet(senderPrivate);

// // Initialize wallet user
// // 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
// const sender = await PushAPI.initialize(signer, {
//   env: CONSTANTS.ENV.STAGING,
// });

// // Send a message to receiver address
// const sendResponse = await sender.chat.send(receiverAdr, {
//   type: 'Text',
//   content: message,
// });
// console.log("sendResponse: ", sendResponse);


// // Send notification, provided channelAdmin has a channel
// const notifyResponse = await sender.channel.send(
//   [receiverAdr], 
//   {
//       notification: {
//       title: "SimplifAI Notification",
//       body: "You've received a new message",
//       silent: false,
//       hidden: false,
//       },
//   },
// );
// console.log("notifyResponse: ", notifyResponse);
