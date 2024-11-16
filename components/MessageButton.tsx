import checkSubscription from "@/utils/checkSubscription";
import { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import sendMessage from "@/utils/sendMes";

type SendMessageParams = {
  receiverAdr: string;
  message: string;
}

const MessageButton = ({
  connectedWallet,
}: {
  connectedWallet: string;
}) => {
  const [loading, setLoading] = useState(true);

  // const sendMessage = async ({ receiverAdr, message }: SendMessageParams) => {
  //   const SIMPLIFAI_CHANNEL_PRIVATE_KEY = process.env.NEXT_PUBLIC_SIMPLIFAI_CHANNEL_PRIVATE_KEY;
  //   if (!SIMPLIFAI_CHANNEL_PRIVATE_KEY) {
  //     throw new Error("SIMPLIFAI_CHANNEL_PRIVATE_KEY environment variable is not defined");
  //   }
  //   const senderPrivate: string = SIMPLIFAI_CHANNEL_PRIVATE_KEY;
  //   const signer = new ethers.Wallet(senderPrivate);
  
  //   const sender = await PushAPI.initialize(signer, {
  //     env: CONSTANTS.ENV.STAGING,
  //   });
  
  //   const sendResponse = await sender.chat.send(receiverAdr, {
  //     type: 'Text',
  //     content: message,
  //   });
  
  //   console.log("sendResponse: ", sendResponse);
  
  //   const notifyResponse = await sender.channel.send(
  //     [receiverAdr],
  //     {
  //       notification: {
  //         title: "Your AI Trading Assistant",
  //         body: "You've got a new message",
  //       },
  //       config: {
  //         silent: false,
  //         hidden: false,
  //       }
  //     },
  //   );
  
  //   console.log("notifyResponse: ", notifyResponse);
  // };


  const handleMessageSend = async () => {
    await sendMessage({
      receiverAdr: connectedWallet,
      message: "I bought bitcoin for you!",
    });
    console.log("message and notification sent")
  }

  useEffect(() => { // runs during rendering
    if(connectedWallet) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <p>Checking Subscription Status...</p>}
      {!loading && <button
      className="px-3 py-2 flex items-center justify-center bg-gray-600 rounded-xl" 
      onClick={handleMessageSend}
      >
        Send a test message
        </button>
        }
    </>
  );
};

export default MessageButton;
