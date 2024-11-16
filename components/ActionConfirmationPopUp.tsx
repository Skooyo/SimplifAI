import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { Styles } from 'react-modal';
import { useState } from "react";
import processArguments from "@/utils/processArguments";
import { FiAlertTriangle } from "react-icons/fi";
import { SlQuestion } from "react-icons/sl";
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import TransferCard from '@/components/confirmation-components/Transfer';


type ActionConfirmationPopUpProps = {
  response: any,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAcceptAction: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessedArguments: React.Dispatch<React.SetStateAction<any>>;
  txData: any;
  isExecuting: boolean;
}

const ActionConfirmationPopUp = ({response, isOpen, setIsOpen, setAcceptAction, setProcessedArguments, txData, isExecuting}: ActionConfirmationPopUpProps) => {
  const hasToolCall = 'tool_calls' in response;
  const [isTransfer, setIsTransfer] = useState<boolean>(false);
  const [isSwap, setIsSwap] = useState<boolean>(false);
  const [type, setType] = useState<string>("");

  const [txCard, setTxCard] = useState<any>(null);
  useEffect(() => {
    try{
      if(!hasToolCall){return;}
      const args = processArguments(response.tool_calls[0]);
      if(args.function === "transfer_tokens"){
        console.log("TxData:");
        console.log(txData);
        if(txData.receiverName && txData.receiverWalletAddress && txData.transferToken && txData.transferAmount){
          console.log("Is Transfer")
          setIsTransfer(true);
          return;
        }
      }
      if(args.function === "swap_tokens"){
        console.log("Tx Data");
        console.log(txData);
        if(txData.tokenToBuy, txData.tokenToSell, txData.specifiedAmount){
          setIsSwap(true);
        }
      }
      else{
        alert("Unknown Function")
      }
    }catch(error){
      console.log(error);
    }
  }, [isOpen]);

  useEffect(()=>{
    console.log("Printing the txData");
    console.log(txData);
  }, [txData])

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      height: "600px",
      width: "300px",
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "#112233",
      //border: "2px solid #42bded",
      borderRadius: "10px", // Add this line for rounded border
      padding: "10px",
      boxShadow: '0 0 10px 5px rgba(46, 211, 183, 0.5)',
    },
  };

  const handleClosePopUp = () => {
    setIsOpen(false);
  }

  const handleAcceptAction = () => {
    console.log("Handle Accept")
    setAcceptAction(true);
    let args = processArguments(response.tool_calls[0]);
    setProcessedArguments(args);
  }
  //receiverName, receiverWalletAddress, transferToken, transferAmount

  return (
    <div className="gap-4 flex-col ">
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles as Styles}
      >
        {
          hasToolCall ? (
            <div className="flex flex-col h-full w-full transform transition hover:shadow-lg">
              <div className="flex flex-col justify-center text-center items-center w-full h-14 py-3">
                <SlQuestion size={120} />
                <h1 className="text-2xl font-semibold bg-v2-text-gradient bg-clip-text text-transparent">Confirm Transaction</h1>
              </div>
              <div className="flex flex-col w-full h-full p-3">
                    <h1 className="text-xl">Please ensure the following fields are accurate before proceeding:</h1>
                    <div className="flex w-full h-full overflow-auto border-[#94a3b8] border mt-3 mb-6">
                      <SyntaxHighlighter 
                        language="json" 
                        style={darcula} 
                        customStyle={{
                        width: "100%", 
                        maxHeight: "100%", 
                        overflow: "auto", 
                        whiteSpace: "pre-wrap",
                        fontSize: "1em"
                        }}
                        >
                        {JSON.stringify(processArguments(response.tool_calls[0]), null, 2)}
                      </SyntaxHighlighter>
                    </div>
              </div>
              {isTransfer? <TransferCard receiverName={txData.receiverName} receiverWalletAddress={txData.receiverWalletAddress} transferToken={txData.transferToken} transferAmount={txData.transferAmount}/> : ""}
              {isSwap? "Swapping": ""}
              <div className="flex w-full justify-around items-center">
                <div className="flex justify-center items-center w-20 h-8 bg-red-500 rounded-full" onClick={handleClosePopUp}>
                  <h1>Reject</h1>
                </div>
                <div className={`flex justify-center items-center w-20 h-8 ${isExecuting ? "bg-green-700" : "bg-green-600"} rounded-full`} onClick={isExecuting ? () => {} : handleAcceptAction} >
                  <h1>{isExecuting? "Loading":"Accept"}</h1>
                </div>
              </div>
    
            </div>
          ) : (
            <div className="flex flex-col h-full w-full transform transition hover:shadow-lg bg-gray-800 p-5">
              <div className="flex flex-col justify-center items-center w-full p-3 pt-8 text-wrap">
                <FiAlertTriangle size={120} color={"#f87171"} />
                <h1 className="text-3xl text-red-400 font-extrabold pt-4">Error</h1>
                <h1 className="text-xl font-semibold">Prompt Not Recognized</h1>
              </div>
              <div className="flex w-full h-full p-3">
                  <h1 className="text-center text-xl">{/** response.content*/}Please Try Again</h1>
              </div>
              <div className="flex w-full justify-around items-center p-3">
                <div className="flex justify-center items-center w-28 h-10 bg-red-500 rounded-full p-2" onClick={handleClosePopUp}>
                  <h1 className="text-2xl">Close</h1>
                </div>
              </div>

            </div>
          )
        }
      </Modal>
    </div>
  );
};

export default ActionConfirmationPopUp;