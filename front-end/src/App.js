import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [response, setResponse] = useState("");
  let text = "";
  let recived = "";
  let messegesList = messages;

  const sentText = async (e) => {
    let res = await fetch("http://localhost:3001/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sendText: text }),
    });

    let data = await res.json();
    setResponse(data.message);
    recived = data.message;
    await updateMessages();
  };

  const makeSendText = async (e) => {
    text = "";
    for (let message of messages) {
      if (message.user === "you") {
        text += "Q:" + message.message + "\n";
      } else {
        text += "A:" + message.message + "\n";
      }
    }
    text += "Q:" + inputValue + "\n";
    console.log("Send Text : " + text);
    await sentText();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    messegesList.push({ user: "you", message: inputValue });
    setMessages(messegesList);
    setInputValue("");
    await makeSendText();
  };

  const updateMessages = async (e) => {
    let refineAnswer = [];
    if (recived.includes("A:")) {
      refineAnswer = recived.split("A:");
    } else {
      refineAnswer.push(recived);
    }
    console.log("Refine Answer : " + refineAnswer);

    messegesList.push({ user: "chatbot", message: refineAnswer });
    setMessages(messegesList);
    console.log("Response : " + recived);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send </button>
      </form>
    </div>
  );
}

export default App;
