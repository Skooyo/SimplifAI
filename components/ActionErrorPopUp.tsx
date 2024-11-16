import React from 'react';
import Modal from 'react-modal';
import { Styles } from 'react-modal';
import { useState } from "react";
import processArguments from "@/utils/processArguments";
import { FiAlertTriangle } from "react-icons/fi";
import { SlQuestion } from "react-icons/sl";
// import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
// import SyntaxHighlighter from 'react-syntax-highlighter';


type ActionConfirmationPopUpProps = {
  message: string,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActionConfirmationPopUp = ({message, isOpen, setIsOpen}: ActionConfirmationPopUpProps) => {
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

  return (
    <div className="gap-4 flex-col ">
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles as Styles}
      >  
        <div className="flex flex-col h-full w-full transform transition hover:shadow-lg bg-gray-800 p-5">
            <div className="flex flex-col justify-center items-center w-full p-3 pt-8 text-wrap">
            <FiAlertTriangle size={120} color={"#f87171"} />
            <h1 className="text-3xl text-red-400 font-extrabold pt-4">Error</h1>
            <h1 className="text-xl font-semibold">{message? message : "Unknown Error Occured"}</h1>
            </div>
            <div className="flex w-full h-full p-3">
                <h1 className="text-center text-xl">Please Try Again</h1>
            </div>
            <div className="flex w-full justify-around items-center p-3">
            <div className="flex justify-center items-center w-28 h-10 bg-red-500 rounded-full p-2" onClick={handleClosePopUp}>
                <h1 className="text-2xl" onClick={()=>{setIsOpen(false);}}>Close</h1>
            </div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default ActionConfirmationPopUp;