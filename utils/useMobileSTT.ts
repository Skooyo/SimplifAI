"use client";

import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const useMobileSTT = () => {
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef<null | any>(null);
  const [transcript, setTranscript] = useState("");
  
  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecording(false);
    }
  };

  const startRecording = () => {
    setRecording(true);
    setTranscript("");
    // Initialize new SpeechRecognition instance
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event: any) => {
      let speech = event.results[event.results.length - 1][0].transcript;
      setTranscript(speech);
    };

    recognitionRef.current.onsoundend = (event: any) => {
      console.log("sound end", event);
      stopRecording();
    }

    // Start the speech recognition
    recognitionRef.current.start();
  };

  // Cleanup effect when the component unmounts
  useEffect(() => {
    return () => {
      // Stop the speech recognition if it's active
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return { recording, startRecording, stopRecording, transcript, setTranscript };
};

export default useMobileSTT;