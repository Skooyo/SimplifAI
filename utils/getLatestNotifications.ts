import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";

const jarvisChannelAdr = "0xFD008e19B64E4786e6F4D0C16f161f67554B0Bd7"

const getLatestNotifications = async (signer: any) => {
  const userReadOnly = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  });
  
  const chat = await userReadOnly.chat.history(jarvisChannelAdr, {
    limit: 5
  });
  // console.log("Chat", chat);
  // for (let i = 0; i < chat.length; i++) {
  //   if (chat[i].fromDID == `eip155:${jarvisChannelAdr}`) {
  //     console.log("Content:", chat[i].messageContent);    
  //     const date = new Date(chat[i].timestamp);
  //     console.log("Timestamp:", date.toString());
  //     console.log("====================================");
  //   }
  // }
  return chat;
}

export default getLatestNotifications