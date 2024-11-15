"use client";

import useMobileSTT from "@/utils/useMobileSTT";
import { useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { Input } from "@/components/ui/input";



const MobileRecordButton = () => {
  const { recording, startRecording, stopRecording, transcript, setTranscript } = useMobileSTT();

  const handleClick = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <div className={`w-full md:w-1/3 ${recording || transcript.length > 0 ? "h-1/3" : "h-fit"} items-center justify-center flex flex-col p-4 gap-4`}>
      <div className="w-1/2 h-full flex items-center justify-center">
        <Input
          type="text"
          placeholder="Enter your prompt here"
          value={transcript}
          className="bg-gray-500 rounded-xl"
          onChange={(e) => setTranscript(e.target.value)}
        />
      </div>
      <button
        onClick={handleClick}
        className={`w-fit h-fit py-2 px-4 rounded-full ${
          recording ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold flex gap-2 justify-center items-center`}
      >
        <FaMicrophone />
        <h1>{recording ? "Mobile Recording" : "Mobile Record"}</h1>
      </button>
    </div>
  );
};

export default MobileRecordButton;
