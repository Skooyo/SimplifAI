"use client";

import useMobileSTT from "@/utils/useMobileSTT";
import { useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { RiSendPlaneFill } from "react-icons/ri";
import parseTranscript from "@/utils/parseTranscript";

interface MobileRecordButtonProps {
  setParsedResponse: (response: any) => void;
}

const MobileRecordButton = ({ setParsedResponse }: MobileRecordButtonProps) => {
  const {
    recording,
    startRecording,
    stopRecording,
    transcript,
    setTranscript,
  } = useMobileSTT();

  const handleClick = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleSubmit = () => {
    const prompt = transcript;
    setTranscript("");

    const analyseTranscript = async () => {
      console.log("Finished recording:", prompt);
      console.log("Analyzing transcript...");
      const response = await parseTranscript(prompt);
      console.log("Response:", response);
      setParsedResponse(response);
    };
    if (prompt && prompt.length > 0) {
      analyseTranscript();
    } else {
      console.log("No prompt to analyse");
    }
  };

  return (
    <div
      className={`mx-10 h-[50vh] -mt-16 items-center flex flex-col p-4 gap-8 text-white`}
    >
      <div className="w-full card-gradient rounded-xl h-1/4 flex items-center justify-center gap-4 overflow-hidden">
        <div className="w-full h-full p-4">
          <textarea
            placeholder="Enter prompt or press record and speak into the microphone"
            value={transcript}
            className="bg-transparent rounded-xl w-full h-full resize-none outline-none overflow-hidden placeholder-[#6e6e6e] text-[#a3a3a3]"
            onChange={(e) => setTranscript(e.target.value)}
            maxLength={300} // Optional: limit the number of characters
          />
        </div>
        <button
          onClick={handleSubmit}
          className="border border-s4/25 bg-s1/5 hover:border-s4 transition-all duration-300 p-3 mr-4 rounded-full text-white font-bold"
        >
          <RiSendPlaneFill size={24} />
        </button>
      </div>
      <button
        onClick={handleClick}
        className={`mb-5 mt-16 w-1/2 h-fit rounded-full aspect-square size-10 transition-all duration-500 ${
          recording ? "" : "border-2 border-s4/25 bg-s1/5 hover:border-s4"
        } text-white font-bold flex gap-2 justify-center items-center`}
      >
        {recording ? (
          <div className="circle pulse from-[rgba(199,242,132,1))] to-[rgba(0,190,240,1)] bg-v2-text-gradient rounded-full aspect-square size-10 w-full h-full flex justify-center items-center transition-all duration-500">
            <FaMicrophone size={36} />
          </div>
        ) : (
          <FaMicrophone size={36} />
        )}
      </button>
    </div>
  );
};

export default MobileRecordButton;
