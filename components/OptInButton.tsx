"use client";

import { useState, useEffect } from "react";
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import { useWalletClient, useAccountEffect, useAccount } from 'wagmi';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import checkSubscription from "@/utils/checkSubscription";
import { IoMdNotifications, IoMdNotificationsOff } from "react-icons/io";
//import dotenv from "dotenv";

// Load environment variables from .env file
//dotenv.config();

const OptInButton = () => {
  const SIMPLIFAI_CHANNEL_ADDRESS = process.env.NEXT_PUBLIC_SIMPLIFAI_CHANNEL_ADDRESS;
  const {data:signer} = useWalletClient();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const account = useAccount();
  const { primaryWallet } = useDynamicContext();

  const handleCheckSubscription = async () => {
    console.log("Checking for subscription status")
    console.log("Wallet:", primaryWallet)
    if (primaryWallet) {
      const hasChannel = await checkSubscription(primaryWallet.address);
      setIsSubscribed(hasChannel);
    }
  }

  
  if (!SIMPLIFAI_CHANNEL_ADDRESS) {
    throw new Error("SIMPLIFAI_CHANNEL_ADDRESS environment variable is not defined");
  }


  // useEffect(()=>{
  //   console.log("i am in opt-button")
  //   console.log(primaryWallet, "this is my primary wallet")
  //   if(primaryWallet.address && signer){
  //     console.log(primaryWallet.signer)
  //     console.log("Checking for subscription status")
  //     handleCheckSubscription();
  //   }
  // }, [])

  useAccountEffect({
    onConnect(data) {
      console.log('Wallet Connected!')
      setSignedIn(true);
      handleCheckSubscription();
    },
    onDisconnect() {
      setSignedIn(false);
      console.log('Wallet Disconnected!')
    },
  })


  const handleOptIn = async () => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    const OptInResponse = await user.notification.subscribe(
      `eip155:11155111:${SIMPLIFAI_CHANNEL_ADDRESS}`
    );
    console.log("OptInResponse", OptInResponse);
    if ('status' in OptInResponse &&OptInResponse.status === 204) {
      setIsSubscribed(true);
    }
  }

  const handleOptOut = async () => {
    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    const OptOutResponse = await user.notification.unsubscribe(
      `eip155:11155111:${SIMPLIFAI_CHANNEL_ADDRESS}`
    );
    console.log("OptOutResponse", OptOutResponse);
    if ('status' in OptOutResponse && OptOutResponse.status === 204) {
      setIsSubscribed(false);
    }
  }

  return (
    <div>
        <div className="flex justify-center items-center w-24 h-10 bg-blue-400 hover:cursor-pointer hover:bg-blue-500 rounded-full">
          {isSubscribed ? (
            <div className="w-full h-full flex justify-center items-center">
              <IoMdNotifications size={20} />
              <button onClick={handleOptOut} className="text-white text-sm ml-2">Opt Out</button>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <IoMdNotificationsOff size={20}  />
              <button onClick={handleOptIn} className="text-white text-sm ml-2">Opt In</button>
            </div>
          )}
        </div>
    </div>
  )
}

export default OptInButton;