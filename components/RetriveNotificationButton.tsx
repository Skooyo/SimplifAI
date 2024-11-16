import { useEffect, useState } from "react";
import getAllNotifications from "@/utils/getAllNofitications";

const RetriveNotificationButton = ({
  connectedWallet,
}: {
  connectedWallet: string;
}) => {
  const [loading, setLoading] = useState(true);

  const handleGetAllNotifications = async () => {
    const notifications = await getAllNotifications(connectedWallet);
    console.log("notifications", notifications);
  }

  useEffect(() => { // runs during rendering
    if(connectedWallet) {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <p>Checking Subscription Status...</p>}
      {!loading && <button
      className="px-3 py-2 flex items-center justify-center bg-gray-600 rounded-xl" 
      onClick={handleGetAllNotifications}
      >
        Fetch all notifications
        </button>
        }
    </>
  );
};

export default RetriveNotificationButton;
