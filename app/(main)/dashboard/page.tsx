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

  useEffect(() => {
    if (primaryWallet) {
      setConnected(true);
      setConnectedWallet(primaryWallet);
    }
  }, [primaryWallet]);

  useEffect(() => {
    if (Object.keys(parsedResponse).length > 0) {
      setIsOpen(true);
    }
  }, [parsedResponse]);

  useEffect(() => {
    if (acceptAction) {
      console.log("Accepted action");
      const MARIOHEREISTHEJSONOBJ = processedArguments;
      // Mario you can take it from here
    }
  }, [acceptAction]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="w-full h-screen flex-col flex items-center gap-4 -mt-8">
          <div className="md:w-1/4">
            <div className="md:hidden w-screen h-50">
              <MobileRecordButton setParsedResponse={setParsedResponse} />
            </div>
            <div className="hidden w-full h-full md:flex justify-center items-center">
              <DesktopRecordButton setParsedResponse={setParsedResponse} />
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
            />
          </div>
        </div>
      ) : (
        <div className="flex text-xl mt-24 font-semibold w-full justify-center items-center">
          <p>Please connect your wallet to use our features.</p>
        </div>
      )}
    </>
  );
}
