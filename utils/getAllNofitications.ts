import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";

const getAllNotifications = async (address: string) => {
  const user = await PushAPI.initialize(null, {
    env: CONSTANTS.ENV.STAGING,
    account: address,
  });
  
  if(!process.env.NEXT_PUBLIC_SIMPLIFAI_CHANNEL_ADDRESS) {
    console.log("No channel address found");
    return;
  }

  const notifications = await user.channel.notifications(process.env.NEXT_PUBLIC_SIMPLIFAI_CHANNEL_ADDRESS);

  return notifications;
}

export default getAllNotifications