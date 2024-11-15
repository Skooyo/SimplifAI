"use client";

import useDesktopSTT from "@/utils/useDesktopSTT";
import { useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import parseTranscript from "@/utils/parseTranscript";


const DesktopRecordButton = () => {
  const { recording, startRecording, stopRecording, transcript, setTranscript } = useDesktopSTT();

  const handleClick = () => {
    if (!recording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleSubmit = () => {
    const prompt = transcript
    setTranscript("");
    
    const analyseTranscript = async () => {
      console.log("Finished recording:", prompt);
      console.log("Analyzing transcript...");
      const response = await parseTranscript(prompt);
      console.log("Response:", response);
      // do whatever you want with the response
    }
    if (prompt && prompt.length > 0) {
      analyseTranscript();
    } else {
      console.log("No prompt to analyse");
    }
  }

  return (
    <div className={`w-full md:w-full h-fit items-center justify-center flex flex-col p-4 gap-4 text-white`}>
      <div className="w-1/2 h-full flex flex-col items-center justify-center gap-4">
        <Input
          type="text"
          placeholder="Enter your prompt here"
          value={transcript}
          className="bg-gray-500 rounded-xl"
          onChange={(e) => setTranscript(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 py-2 px-4 rounded-full text-white font-bold">
          Submit
        </button>
      </div>
      {/* <p className="h-1/2 flex items-center overflow-y-auto mb-8 text-white">{transcript}</p> */}
      <button
        onClick={handleClick}
        className={`w-fit h-fit py-2 px-4 rounded-full ${
          recording ? "bg-green-500 hover:bg-green-700" : "bg-blue-500 hover:bg-blue-700"
        } text-white font-bold flex gap-2 justify-center items-center`}
      >
        <FaMicrophone />
        <h1>{recording ? "Desktop Recording" : "Desktop Record"}</h1>
      </button>
    </div>
  );
};

export default DesktopRecordButton;
