"use client";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";
import ToggleNotification from "@/components/ToggleNotification";
import { useWalletClient } from "wagmi";

export default function Home() {
  const { primaryWallet } = useDynamicContext();
  const [walletAddress, setWalletAddress] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (primaryWallet && !walletAddress) {
      setConnected(true);
      setWalletAddress(primaryWallet.address);
    }
  }, [primaryWallet]);

  return (
    <>
      <div className="w-full h-screen flex-col flex items-center gap-4">
        {connected && (
          <div className="w-full h-fit p-4 flex items-center justify-center">
            <ToggleNotification connectedWallet={walletAddress} />
          </div>
        )}
      </div>
    </>
  );
}
