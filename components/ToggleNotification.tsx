import checkSubscription from "@/utils/checkSubscription";
import { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
// import sendMessage from "@/utils/sendMes";

const ToggleNotification = ({
  connectedWallet,
}: {
  connectedWallet: string;
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const {data:signer} = useWalletClient();

  const handleCheckSubscription = async () => {
    console.log("inside handle checking subscription");
    console.log(connectedWallet);
    if (connectedWallet) {
      console.log("user with wallet checking subscription status");
      const hasChannel = await checkSubscription(connectedWallet);
      setIsSubscribed(hasChannel);
      setLoading(false);
    }
  };

  const handleOptIn = async () => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    const OptInResponse = await user.notification.subscribe(
      `eip155:11155111:0x0F5b198b1D400b1386bDe13ec72D7D2e5278fE87`
    );
    console.log("OptInResponse", OptInResponse);
    if ('status' in OptInResponse && OptInResponse.status === 204) {
      setIsSubscribed(true);
    }
  }

  const handleOptOut = async () => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    const OptOutResponse = await user.notification.unsubscribe(
      `eip155:11155111:0x0F5b198b1D400b1386bDe13ec72D7D2e5278fE87`
    );
    console.log("OptOutResponse", OptOutResponse);
    if ('status' in OptOutResponse && OptOutResponse.status === 204) {
      setIsSubscribed(false);
    }
  }

  const handleNotificationToggle = async () => {
    // await sendMessageToUser();
    if (isSubscribed) {
      await handleOptOut();
    } else {
      await handleOptIn();
    } 
  }

  // const sendMessageToUser = async () => {
  //   sendMessage({receiverAdr: connectedWallet, message: "Sending message through a callable function"});
  // }

  useEffect(() => { // runs during rendering
    if(connectedWallet) {
      handleCheckSubscription();
    }
  }, []);

  return (
    <>
      {loading && <p>Checking Subscription Status...</p>}
      {!loading && <button
      className="px-3 py-2 flex items-center justify-center bg-gray-600 rounded-xl" 
      onClick={handleNotificationToggle}
      >
        {isSubscribed ? "Disable Notifications" : "Enable Notifications"}
        </button>
        }
    </>
  );
};

export default ToggleNotification;
