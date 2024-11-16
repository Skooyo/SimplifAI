import getLatestNotifications from "@/utils/getLatestNotifications";
import { useState } from "react";
import { useWalletClient } from "wagmi";
import NotificationCard from "./NotificationCard";
import { IoIosNotificationsOutline } from "react-icons/io";

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
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    if (signer) {
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
        <div className="absolute top-16 w-[500px] -right-16">
          {notifications &&
            showNotifications &&
            !loading &&
            notifications.map((notification, index) => (
              <div key={index} className="w-full mt-2 mb-2">
                <NotificationCard notification={notification} />
              </div>
            ))}
        </div>
        <div onClick={fetchNotifications}>
          <IoIosNotificationsOutline size={30} />
        </div>
      </div>
    </div>
  );
};

export default NotificationWidget;
