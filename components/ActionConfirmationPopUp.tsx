import React from 'react';
import Modal from 'react-modal';
import { Styles } from 'react-modal';
import { useState } from "react";
import processArguments from "@/utils/processArguments";

type ActionConfirmationPopUpProps = {
  response: any,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAcceptAction: React.Dispatch<React.SetStateAction<boolean>>;
  setProcessedArguments: React.Dispatch<React.SetStateAction<any>>;
}

const ActionConfirmationPopUp = ({response, isOpen, setIsOpen, setAcceptAction, setProcessedArguments}: ActionConfirmationPopUpProps) => {
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
      maxWidth: '1200px',
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
          hasToolCall ? (
            <div className="flex flex-col h-full w-full transform transition hover:shadow-lg">
              <div className="flex justify-center items-center w-full h-14 bg-blue-500 mx-5">
                <h1 className="text-3xl">Action Confirmation</h1>
              </div>
              <div className="flex w-full h-full bg-blue-800 p-3">
                  <h1 className="">Action:</h1>
                  <h1 className="">{JSON.stringify(processArguments(response.tool_calls[0]), null, 2)}</h1>
              </div>
              <div className="flex w-full justify-around items-center">
                <div className="flex justify-center items-center w-20 h-8 bg-red-500 rounded-full" onClick={handleClosePopUp}>
                  <h1>Reject</h1>
                </div>
                <div className="flex justify-center items-center w-20 h-8 bg-green-600 rounded-full" onClick={handleAcceptAction}>
                  <h1>Accept</h1>
                </div>
              </div>
    
            </div>
          ) : (
            <div className="flex flex-col h-full w-full transform transition hover:shadow-lg">
              <div className="flex justify-center items-center w-full h-14 bg-blue-500 mx-5 text-wrap">
                <h1 className="text-xl ">Error: Function Call not triggered</h1>
              </div>
              <div className="flex w-full h-full bg-blue-800 p-3">
                  <h1 className="">Issue:</h1>
                  <h1 className="">{response.content}</h1>
              </div>
              <div className="flex w-full justify-around items-center p-3">
                <div className="flex justify-center items-center w-20 h-8 bg-red-500 rounded-full" onClick={handleClosePopUp}>
                  <h1>Close</h1>
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