import getLatestNotifications from "@/utils/getLatestNotifications";
import { useState } from "react";
import { useWalletClient } from "wagmi";
import NotificationCard from "./NotificationCard";
import { IoIosNotificationsOutline } from "react-icons/io";
import Button from "./landing-components/Button";

const NotificationWidget = ({
  connectedWallet,
  showNotifications,
  setShowNotifications,
}: {
  connectedWallet: string;
  showNotifications?: boolean;
  setShowNotifications?: any;
}) => {
  const { data: signer } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    if (signer) {
      setLoading(true);
      const response = await getLatestNotifications(signer);
      setNotifications(response || []);
      console.log("fetched");
      setShowNotifications(true);
    } else {
      console.log("No signer found");
    }
    setLoading(false);
    console.log("outside");
  };

  return (
    <div className="">
      <div className="w-full flex-col flex jutify-center items-center p-4 relative">
        <div className="md:absolute md:top-16 md:w-[500px] md:-right-16 max-md:mb-48">
          {notifications &&
            showNotifications &&
            !loading &&
            notifications.map((notification, index) => (
              <div key={index} className="w-full mt-2 mb-2">
                <NotificationCard notification={notification} />
              </div>
            ))}
        </div>
        <div
          onClick={fetchNotifications}
          className={`${loading ? "animate-pulse" : ""} hidden md:block`}
        >
          <IoIosNotificationsOutline size={30} />
        </div>
        <div
          onClick={fetchNotifications}
          className={`${
            loading ? "animate-pulse" : ""
          } block md:hidden scale-125`}
        >
          <Button>Show Notifications</Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationWidget;
