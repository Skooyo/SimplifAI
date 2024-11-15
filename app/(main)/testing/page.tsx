"use client";

import DesktopRecordButton from "@/components/DesktopRecordButton";
import MobileRecordButton from "@/components/MobileRecordButton";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";
import NotificationList from "@/components/NotificationList";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const { primaryWallet } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const [connectedWallet, setConnectedWallet] = useState<any>();
  const [showNotification, setShowNotification] = useState(false);

  // Modal states
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (primaryWallet) {
      setConnected(true);
      setConnectedWallet(primaryWallet);
    }
  }, [primaryWallet]);



  const handleOpenModal = () => {
    setIsOpen(true);
  }

  return (
    <>
      {isLoggedIn ? (
        <div className="w-full h-screen flex-col flex items-center gap-4">
          <div className="w-full h-50">
            <NotificationList />
          </div>
        </div>
      ) : (
        <div className="flex text-xl font-semibold w-full justify-center items-center">
          <p>Please connect your wallet to use our features.</p>
        </div>
      )}
    </>
  );
}
