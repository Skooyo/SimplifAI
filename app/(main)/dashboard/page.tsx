"use client";

import DesktopRecordButton from "@/components/DesktopRecordButton";
import MobileRecordButton from "@/components/MobileRecordButton";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";
import ActionConfirmationPopUp from "@/components/ActionConfirmationPopUp";
import ActionErrorPopUp from "@/components/ActionErrorPopUp";
import { getContactByOwner } from "@/lib/db_actions/contact-actions";
import { useAccount, useChainId, useReadContract } from 'wagmi';
import { config } from "@/utils/config";
import processArguments from "@/utils/processArguments";
import { set } from "mongoose";
import {USDC, WETH} from "@/utils/defaultToken";
import { ETH_CHAIN_ID } from "@pushprotocol/restapi/src/lib/config";
import { tokenList} from "@/utils/tokenList";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const { primaryWallet } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();
  const [parsedResponse, setParsedResponse] = useState<any>({});
  const [connectedWallet, setConnectedWallet] = useState<any>();
  const [showNotification, setShowNotification] = useState(false);
  const [isProcessing, setIsProcessing]= useState(false);

  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [acceptAction, setAcceptAction] = useState(false);
  const [processedArguments, setProcessedArguments] = useState<any>({});

  // User states
  const [user, setUser] = useState<any>();
  const account = useAccount({config});
  const chainId = useChainId();

  // Transaction states
  const [tokenInformation, setTokenInformation] = useState<any>({});
  const [tokenToBuy, setTokenToBuy] = useState<any>({});
  const [tokenToSell, setTokenToSell] = useState<any>({});
  const [amount, setAmount] = useState(0);
  const [transferedUser, setTransferedUser] = useState("");
  const [transferedName, setTransferedName] = useState("");

  useEffect(() => {
    if (primaryWallet) {
      setConnected(true);
      setConnectedWallet(primaryWallet);
    }
  }, [primaryWallet]);

  useEffect(() => {
    if (Object.keys(parsedResponse).length > 0) {
      openConfirmation(parsedResponse);
    }
  }, [parsedResponse]);

  async function initializeError(message: string){
    console.log("Opening Error Pop Up")
    setErrorMessage(message);
    setIsErrorOpen(true);
  }

  async function openConfirmation(parsedResponse:any){
    console.log("Processing Confirmation");
    const hasToolCall = 'tool_calls' in parsedResponse;
    if(!hasToolCall){
      initializeError("Invalid Prompt");return;
    }
    if(!account.address){
      initializeError("You Are Not Logged In");return;
    }
    const user = await getContactByOwner(account.address as string);
    if(!user){
      initializeError("Your User Account Was Not Found");return;
    }
    setUser(user);
    console.log(user);

    const args = processArguments(parsedResponse.tool_calls[0]);
    setProcessedArguments(args);

    try{
      // Check is Function Processing
      if (args.function === "transfer_tokens") {
        checkTransfer(args, user);
      } else if (args.function === "swap_tokens") {
        checkSwap(args);
      } else if (args.function === "settingAI") {
        alert("Updating AI Configuration");
      } else {
        initializeError("Invalid Prompt");
        return;
      }
    }catch(error){
      console.log(error);
      initializeError("Unknown Error Occured");
      return;
    }
  }

  useEffect(() => {
    if (acceptAction) {
      console.log("Accepted action");
      const args = processedArguments;
      executeTx(args);
    }
  }, [acceptAction]);

  async function checkTransfer(args:any, user:any){
    // Check Arguments
    const { specifiedToken, specifiedAmount, transferTo } = args.arguments as any;
    if(!specifiedToken || !specifiedAmount || !transferTo){
      initializeError("Invalid Prompt"); return;
    }
    // Search User Address in the database
    user.contacts.forEach((item:any) => {console.log(item);console.log(item.name);});
    const transferedUser = user.contacts.find((item:any) => item.name.toLowerCase() === transferTo.toLowerCase());
    if(!transferedUser){
      initializeError("User Not Found");return;
    }
    setTransferedUser(transferedUser);
    setTransferedName(transferTo);
    setAmount(specifiedAmount);
    // Search Information of the Transfered Token
    // Search on tokenList for the token information
    if (specifiedToken === USDC.symbol) {
      setTokenInformation(USDC);
    }else if (specifiedToken === "ETH"){
      setTokenInformation(WETH);
    }else{
      initializeError("Token Not Found");return;
    }
    // Open Confirmation
    setIsOpen(true);
  }

  async function checkSwap(args:any){
    // Check Arguments
    const { tokenToBuy, tokenToSell, specifiedAmount, specifiedToken } = args.arguments as any;
    if(!tokenToBuy || !tokenToSell || !specifiedAmount || !specifiedToken){
      initializeError("Invalid Prompt");return;
    }
    // Search Information of Token1 and Token2
    // Specified Token with the amount
    if(specifiedToken === USDC.symbol){ setTokenInformation(USDC);}
    else if(specifiedToken === "ETH"){setTokenInformation(WETH);}
    setAmount(specifiedAmount);
    // Token to Buy and Token to Sell
    if(tokenToBuy === USDC.symbol){setTokenToBuy(USDC);}
    else if (tokenToBuy === "ETH"){setTokenToBuy(WETH);}
    if(tokenToSell === USDC.symbol){setTokenToSell(USDC);}
    else if (tokenToSell === "ETH"){setTokenToSell(WETH);}

    // Final Check
    if (tokenToBuy === tokenToSell){
      initializeError("Invalid Swap");return;
    }
    if(!tokenToBuy === specifiedToken && !tokenToSell === specifiedToken){
      initializeError("Invalid Swap");return;
    }
    setIsOpen(true);
  }

  async function executeTx(args:any){
    try {
      setErrorMessage("");
      alert("Executing Transaction");
    } catch (error) {
      alert("Error Happened");
      console.log(error);
    }
    setIsOpen(false);
  }

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

          <ActionErrorPopUp message={errorMessage} isOpen={isErrorOpen} setIsOpen={setIsErrorOpen} />
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
