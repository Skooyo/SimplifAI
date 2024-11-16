import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";

// const jarvisChannelAdr = "0xFD008e19B64E4786e6F4D0C16f161f67554B0Bd7"
const simplifaiChannelAdr = "0x0F5b198b1D400b1386bDe13ec72D7D2e5278fE87"

const checkSubscription = async (address: string) => {
  const userReadOnly = await PushAPI.initialize(null, {
    env: CONSTANTS.ENV.STAGING,
    account: address,
  });
  const userSubscriptions = await userReadOnly.notification.subscriptions();
  return userSubscriptions.some((sub: { channel: string; }) => sub.channel === process.env.NEXT_PUBLIC_SIMPLIFAI_CHANNEL_ADDRESS);

}

export default checkSubscription