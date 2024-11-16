import checkSubscription from "@/utils/checkSubscription";
import { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import Button from "./landing-components/Button";

const ToggleNotification = ({
  connectedWallet,
}: {
  connectedWallet: string;
}) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: signer } = useWalletClient();

  const handleCheckSubscription = async () => {
    // console.log("inside handle checking subscription");
    // console.log(connectedWallet);
    if (connectedWallet) {
      // console.log("user with wallet checking subscription status");
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
    if ("status" in OptInResponse && OptInResponse.status === 204) {
      setIsSubscribed(true);
    }
  };

  const handleOptOut = async () => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    const OptOutResponse = await user.notification.unsubscribe(
      `eip155:11155111:0x0F5b198b1D400b1386bDe13ec72D7D2e5278fE87`
    );
    console.log("OptOutResponse", OptOutResponse);
    if ("status" in OptOutResponse && OptOutResponse.status === 204) {
      setIsSubscribed(false);
    }
  };

  const handleNotificationToggle = async () => {
    if (isSubscribed) {
      await handleOptOut();
    } else {
      await handleOptIn();
    }
  };

  useEffect(() => {
    // runs during rendering
    if (connectedWallet) {
      handleCheckSubscription();
    }
  }, []);

  return (
    <>
      {loading && (
        <div className="hover:cursor-none scale-125">
          <Button
          onClick={() => {}}
          >
            Checking Subscription Status...</Button>
        </div>
      )}
      {!loading && (
        <div className="scale-125">
          <Button onClick={handleNotificationToggle}>
            {isSubscribed ? "Disable Push Notifications" : "Enable Push Notifications"}
          </Button>
        </div>
      )}
    </>
  );
};

export default ToggleNotification;
