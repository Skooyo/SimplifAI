import React from 'react';
import Modal from 'react-modal';
import { Styles } from 'react-modal';
import { useState } from "react";
import processArguments from "@/utils/processArguments";
import { FiAlertTriangle } from "react-icons/fi";
import { SlQuestion } from "react-icons/sl";
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Rings, Audio, BallTriangle, Bars, Circles, Grid, Hearts, Oval, Puff, SpinningCircles, TailSpin, ThreeDots } from 'react-loading-icons';

type ActionConfirmationPopUpProps = {
  response: any,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAcceptAction: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessedArguments: React.Dispatch<React.SetStateAction<any>>;
  setParsedResponse: React.Dispatch<React.SetStateAction<any>>;
}

const ActionConfirmationPopUp = ({response, isOpen, setIsOpen, setAcceptAction, setProcessedArguments, setParsedResponse}: ActionConfirmationPopUpProps) => {
  const hasToolCall = 'tool_calls' in response;

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      width: "auto",
      maxWidth: '90%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "#3b82f6",
      border: "1px solid #94a3b8",
      borderRadius: "10px", // Add this line for rounded border
      padding: "0px",
      // boxShadow: '0 0 10px 5px rgba(128, 128, 128, 0.5)',
    },
  };

  const handleClosePopUp = () => {
    setParsedResponse({});
    setProcessedArguments({});
    setIsOpen(false);
  }

  const handleAcceptAction = () => {
    setAcceptAction(true);
    let args = processArguments(response.tool_calls[0]);
    setProcessedArguments(args);
    setIsOpen(false);
  }

  return (
    <div className="gap-4 flex-col">
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles as Styles}
      >
        {
          Object.keys(response).length > 0 ? 
            hasToolCall ? (
              <div className="flex flex-col h-full w-full transform transition hover:shadow-lg bg-gray-800 p-5">
                <div className="flex flex-col justify-center items-center w-full  p-3 text-wrap">
                  <SlQuestion size={120} />
                  <h1 className="text-3xl font-bold mt-3">Action</h1>
                  <h1 className="text-3xl font-bold">Confirmation</h1>
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
                <div className="flex w-full justify-around items-center">
                  <div className="flex justify-center items-center w-28 h-10 bg-red-500 rounded-full" onClick={handleClosePopUp}>
                    <h1 className="text-2xl">Reject</h1>
                  </div>
                  <div className="flex justify-center items-center w-28 h-10 bg-green-500 rounded-full" onClick={handleAcceptAction}>
                    <h1 className="text-2xl">Accept</h1>
                  </div>
                </div>
      
              </div>
            ) : (
              <div className="flex flex-col h-full w-full transform transition hover:shadow-lg bg-gray-800 p-5">
                <div className="flex flex-col justify-center items-center w-full  p-3 text-wrap">
                  <FiAlertTriangle size={120} color={"#f87171"} />
                  <h1 className="text-3xl text-red-400 font-extrabold">Error</h1>
                  <h1 className="text-2xl ">Function Call not triggered</h1>
                </div>
                <div className="flex w-full h-full p-3">
                    <h1 className="text-center text-xl">{response.content}</h1>
                </div>
                <div className="flex w-full justify-around items-center p-3">
                  <div className="flex justify-center items-center w-28 h-10 bg-red-500 rounded-full" onClick={handleClosePopUp}>
                    <h1 className="text-2xl">Close</h1>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full w-full transform transition hover:shadow-lg bg-gray-800 p-5">
                <div className="flex flex-col justify-center items-center w-full  p-3 text-wrap">
                  <BallTriangle />
                  <h1 className="text-3xl font-extrabold mt-5">Processing...</h1>
                </div>
                <div className="flex w-full h-full p-3">
                    <h1 className="text-center text-xl">Please wait a moment as we analyse your prompt</h1>
                </div>
              </div>
            )
        }
      </Modal>
    </div>
  );
};

export default ActionConfirmationPopUp;