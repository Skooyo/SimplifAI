"use client";

import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useWalletClient } from "wagmi";
import getLatestNotifications from "@/utils/getLatestNotifications";
import NotificationCard from "@/components/NotificationCard";
import OptInButton from "@/components/OptInButton";

const NotificationList = () => {
  const { primaryWallet } = useDynamicContext();
  const { data: signer } = useWalletClient();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    setLoading(true);
    if (signer) {
      const response = await getLatestNotifications(signer);
      setNotifications(response);
    } else {
      console.log("No signer found");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center mb-32">
        <div className="w-11/12 backdrop-saturate-200 bg-blue-700 rounded-3xl">
          <div className="flex justify-center items-center w-full h-16 border-b-2">
            <p className="text-2xl m-5">Notifications</p>

            <div className="absolute right-0 mr-3">
              <OptInButton />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            {notifications && !loading ? (
              notifications.map((notification, index) => (
                <div key={index} className="w-11/12  mt-2 mb-2 ">
                  <NotificationCard notification={notification} />
                </div>
              ))
            ) : (
              <div
                className="w-1/2 h-10 flex justify-center items-center bg-blue-500 rounded-full m-5 hover:cursor-pointer"
                onClick={fetchNotifications}
              >
                <p>Fetch Notifications</p>
              </div>
            )}
          </div>
          <div>
            {notifications.length > 0 && (
              <button className="w-full h-10 bg-blue-400 rounded-b-3xl">
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationList;
