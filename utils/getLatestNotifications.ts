import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";

// const jarvisChannelAdr = "0xFD008e19B64E4786e6F4D0C16f161f67554B0Bd7"

const getLatestNotifications = async (signer: any) => {
  const userReadOnly = await PushAPI.initialize(signer, {
    env: CONSTANTS.ENV.STAGING,
  });
  
  if(!process.env.NEXT_PUBLIC_SIMPLIFAI_CHANNEL_ADDRESS) {
    console.log("No channel address found");
    return;
  }

  const chat = await userReadOnly.chat.history(process.env.NEXT_PUBLIC_SIMPLIFAI_CHANNEL_ADDRESS, {
    limit: 5
  });

  return chat;
}

export default getLatestNotifications