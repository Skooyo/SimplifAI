"use client";

import DesktopRecordButton from "@/components/DesktopRecordButton";
import MobileRecordButton from "@/components/MobileRecordButton";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";
import ActionConfirmationPopUp from "@/components/ActionConfirmationPopUp";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const { primaryWallet } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const [parsedResponse, setParsedResponse] = useState<any>({});
  const [connectedWallet, setConnectedWallet] = useState<any>();
  const [showNotification, setShowNotification] = useState(false);

  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [acceptAction, setAcceptAction] = useState(false);
  const [processedArguments, setProcessedArguments] = useState<any>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (primaryWallet) {
      setConnected(true);
      setConnectedWallet(primaryWallet);
    }
  }, [primaryWallet]);

  // useEffect(() => {
  //   if (Object.keys(parsedResponse).length > 0) {
  //     setIsOpen(true);
  //   }
  // }, [parsedResponse, setIsOpen]);

  useEffect(() => {
    if (acceptAction) {
      console.log("Accepted action");
      const MARIOHEREISTHEJSONOBJ = processedArguments;
      // Mario you can take it from here
    }
  }, [acceptAction]);

  return (
    <>
      {isLoggedIn ? (
        <div className="w-full h-screen flex-col flex items-center gap-4">
          <div className="md:w-1/4">
            <div className="md:hidden w-full h-50">
              <MobileRecordButton />
            </div>
            <div className="hidden w-full h-full md:flex justify-center items-center">
              <DesktopRecordButton setParsedResponse={setParsedResponse} setIsOpen={setIsOpen} />
            </div>
            <div>
              {Object.keys(processedArguments).length > 0 && (
                <p>{JSON.stringify(processedArguments, null, 2)}</p>
              )}
            </div>

            <ActionConfirmationPopUp
              response={parsedResponse}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setAcceptAction={setAcceptAction}
              setProcessedArguments={setProcessedArguments}
              setParsedResponse={setParsedResponse}
            />
          </div>
        </div>
      ) : (
        <div className="flex text-xl mt-36 font-semibold w-full justify-center items-center">
          <p>Please connect your wallet to use our features.</p>
        </div>
      )}
    </>
  );
}
