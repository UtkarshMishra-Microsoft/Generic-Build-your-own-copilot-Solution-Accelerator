import React, { useState } from "react";
import {
  newChat,
  stopGenerating,
  onCloseModal,
  onViewSource,
  disabledButton,
} from "../../helpers/Utils";

const Chat = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNewChat = () => {
    newChat();
  };

  const handleStopGenerating = () => {
    stopGenerating();
    setIsGenerating(false);
  };

  const handleCloseModal = () => {
    onCloseModal();
  };

  const handleViewSource = () => {
    onViewSource("https://example.com");
  };

  const handleDisabledButton = () => {
    const status = disabledButton(isGenerating);
    console.log(status);
  };

  return (
    <div>
      <h1>Chat Interface</h1>
      <button onClick={handleNewChat}>New Chat</button>
      <button onClick={handleStopGenerating}>Stop Generating</button>
      <button onClick={handleCloseModal}>Close Modal</button>
      <button onClick={handleViewSource}>View Source</button>
      <button onClick={handleDisabledButton}>
        {isGenerating ? "Disable" : "Enable"} Button
      </button>
    </div>
  );
};

export default Chat;