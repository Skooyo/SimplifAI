import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
// Ethers or Viem, both are supported
import { ethers } from 'ethers';

// // To call this function, provide the message as a parameter
// // e.g. npx ts-node sendMes.ts 0xFD008e19B64E4786e6F4D0C16f161f67554B0Bd7 "I am in your walls"
// const receiverAdr: string = process.argv[2];
// const message: string = process.argv[3];
// console.log("Sending message:", message, "to", receiverAdr);

interface SendMessageParams {
  receiverAdr: string;
  message: string;
}

async function sendMessage({ receiverAdr, message }: SendMessageParams) {
  const SIMPLIFAI_CHANNEL_PRIVATE_KEY = process.env.SIMPLIFAI_CHANNEL_PRIVATE_KEY;
  if (!SIMPLIFAI_CHANNEL_PRIVATE_KEY) {
    throw new Error("SIMPLIFAI_CHANNEL_PRIVATE_KEY environment variable is not defined");
  }
  const senderPrivate: string = SIMPLIFAI_CHANNEL_PRIVATE_KEY;
  const signer = new ethers.Wallet(senderPrivate);
  // Initialize wallet user
  // 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
  const sender = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  });

  // Send a message to receiver address
  const sendResponse = await sender.chat.send(receiverAdr, {
    type: 'Text',
    content: message,
  });
  console.log("sendResponse: ", sendResponse);

  // Send notification, provided channelAdmin has a channel
  const notifyResponse = await sender.channel.send(
    [receiverAdr],
    {
      notification: {
        title: "Your AI Trading Assistant",
        body: "You've got a new message",
      },
      config: {
        silent: false,
        hidden: false,
      }
    },
  );
  console.log("notifyResponse: ", notifyResponse);
}

export default sendMessage;