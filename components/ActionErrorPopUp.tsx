import React from "react";
import Modal from "react-modal";
import { Styles } from "react-modal";
import { useState } from "react";
import processArguments from "@/utils/processArguments";
import { FiAlertTriangle } from "react-icons/fi";
import { SlQuestion } from "react-icons/sl";
import Button from "./landing-components/Button";
import RedButton from "./landing-components/RedButton";
// import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
// import SyntaxHighlighter from 'react-syntax-highlighter';

type ActionConfirmationPopUpProps = {
  message: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ActionConfirmationPopUp = ({
  message,
  isOpen,
  setIsOpen,
}: ActionConfirmationPopUpProps) => {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      height: "auto",
      width: "auto",
      minWidth: "330px",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#112233",
      border: "none",
      borderRadius: "10px", // Add this line for rounded border
      padding: "0px",
      // boxShadow: "0 0 10px 2px rgba(46, 211, 183, 0.5)",
    },
  };

  const handleClosePopUp = () => {
    setIsOpen(false);
  };

  return (
    <div className="gap-4 flex-col ">
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles as Styles}
      >
        <div className="flex flex-col h-full w-full transform transition hover:shadow-lg backdrop-blur-sm card-gradient p-5">
          <div className="flex flex-col justify-center items-center w-full p-4 text-wrap">
            <FiAlertTriangle size={60} color={"#f87171"} />
            <h1 className="text-4xl text-red-400 font-extrabold pb-8">Error</h1>
            <h1 className="text-2xl font-semibold text-gray-300">
              {message ? message : "Unknown Error Occured"}
            </h1>
            <h1 className="text-center text-lg text-gray-400">
              Please Try Again
            </h1>
          </div>
          <div className="flex w-full justify-around items-center p-4 mt-4">
            <RedButton onClick={handleClosePopUp}>
              <h1 className="text-xl">Close</h1>
            </RedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ActionConfirmationPopUp;
