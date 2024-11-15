"use client";

import DesktopRecordButton from "@/components/DesktopRecordButton";
import MobileRecordButton from "@/components/MobileRecordButton";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const { primaryWallet } = useDynamicContext();
  // const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (primaryWallet) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [primaryWallet]);

  return (
    <>
    {connected ? (
      <div className="w-full h-screen flex-col flex items-center gap-4">
      <div className="md:hidden w-full h-50">
        <MobileRecordButton />
      </div>
      <div className="hidden md:block w-full h-50">
        <DesktopRecordButton />
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
