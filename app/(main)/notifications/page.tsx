"use client";

import NotificationWidget from "@/components/NotificationWidget";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import React, { useEffect, useState } from "react";
import { useWalletClient } from "wagmi";

const Notifications = () => {
  const { primaryWallet } = useDynamicContext();
  const [walletAddress, setWalletAddress] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (primaryWallet && !walletAddress) {
      setConnected(true);
      setWalletAddress(primaryWallet.address);
    }
  }, [primaryWallet]);

  const { data: signer } = useWalletClient();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center -mt-16">
      <h1 className="h5">Notifications</h1>
      <NotificationWidget
        connectedWallet={walletAddress}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
      />
    </div>
  );
};

export default Notifications;
