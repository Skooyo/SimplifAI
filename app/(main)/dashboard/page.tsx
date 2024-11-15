"use client";

import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";
import { set } from "react-hook-form";

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
        Wallet Connected!
      </div>
    ) : (
      <div className="flex text-xl font-semibold w-full justify-center items-center">
        <p>Please connect your wallet to use our features.</p>
      </div>
    )}
  </>
    );
}
