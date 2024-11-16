import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { ethers } from 'ethers';

interface SendMessageParams {
    message: string;
    receiverAdr: string;
}

const sendMessage = async({message, receiverAdr} : SendMessageParams) => {
    
    const SIMPLIFAI_CHANNEL_PRIVATE_KEY = process.env.NEXT_PUBLIC_SIMPLIFAI_CHANNEL_PRIVATE_KEY;
    if (!SIMPLIFAI_CHANNEL_PRIVATE_KEY) {
      throw new Error("SIMPLIFAI_CHANNEL_PRIVATE_KEY environment variable is not defined");
    }
    const senderPrivate: string = SIMPLIFAI_CHANNEL_PRIVATE_KEY;
    const signer = new ethers.Wallet(senderPrivate);

    const sender = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
  
    const sendResponse = await sender.chat.send(receiverAdr, {
      type: 'Text',
      content: message,
    });
  
    console.log("sendResponse: ", sendResponse);
  
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
    console.log('testFunction');
}

export default sendMessage;