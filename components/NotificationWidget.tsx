import getLatestNotifications from "@/utils/getLatestNotifications";
import { useState } from "react";
import { useWalletClient } from "wagmi";
import NotificationCard from "./NotificationCard";

const NotificationWidget = ({
  connectedWallet,
  loadNotifs,
}: {
  connectedWallet: string;
  loadNotifs?: boolean;
}) => {
  const { data: signer } = useWalletClient();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);

  const fetchNotifications = async () => {
    if (signer) {
      const response = await getLatestNotifications(signer);
      setNotifications(response || []);
    } else {
      console.log("No signer found");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full flex-col flex jutify-center items-center p-4">
        {(notifications || loadNotifs) &&
          !loading &&
          notifications.map((notification, index) => (
            <div key={index} className="w-full mt-2 mb-2">
              <NotificationCard notification={notification} />
            </div>
          ))}
        <button
          onClick={fetchNotifications}
          className="px-3 py-2 flex items-center justify-center bg-gray-600 rounded-xl"
        >
          Fetch Notifications
        </button>
      </div>
    </>
  );
};

export default NotificationWidget;
