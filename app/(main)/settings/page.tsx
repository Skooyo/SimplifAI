"use client"

import ToggleNotification from "@/components/ToggleNotification";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import AIConfig from "@/components/AIConfig";


const mockConfig = {
  tradeMin: 100,
  tradeMax: 3200,
  orderType: "BUY",
  quantity: 0.0001,
  transactionCount: 3,
  lastTimeStampSinceTransaction: new Date()
}

const Settings = () => {
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
    <div className="h-full w-full pb-8 mb-16 flex">
      <div className="w-full h-screen flex-col flex items-center pb-8 mb-16">
        {connected && (
          <div className="w-full h-full p-4 md:flex flex-col gap-8 items-center hidden">
            <AIConfig config={mockConfig} />
            <AIConfig config={mockConfig} />
            <AIConfig config={mockConfig} />
            <ToggleNotification connectedWallet={walletAddress} />
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default Settings;