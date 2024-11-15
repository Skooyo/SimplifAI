import { CONSTANTS, PushAPI } from "@pushprotocol/restapi";

const jarvisChannelAdr = "0xFD008e19B64E4786e6F4D0C16f161f67554B0Bd7"

const checkSubscription = async (address: string) => {
  const userReadOnly = await PushAPI.initialize(null, {
    env: CONSTANTS.ENV.STAGING,
    account: address,
  });
  const userSubscriptions = await userReadOnly.notification.subscriptions();
  return userSubscriptions.some((sub: { channel: string; }) => sub.channel === jarvisChannelAdr)

}

export default checkSubscription