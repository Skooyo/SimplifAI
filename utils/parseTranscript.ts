const parseTranscript = async (transcript: string) => {
    const response = await fetch("/api/chatquery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatQuery: transcript,
      }),
    });

    const data = await response.json();
    return data;
};

export default parseTranscript;