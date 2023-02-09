import "./chat.css";
import React, { useState, useEffect } from "react";
import Dropdown from "./DropDown";
import GeneralServices from "../../services/general"
import { Link } from "react-router-dom/dist";

function Chat() {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState("");
    const [selectedOption, setSelectedOption] = useState("text-davinci-003");
    const [modelList, setModelList] = useState(["text-davinci-003"]);

    let text = "";
    let recived = "";
    let messegesList = messages;

    useEffect(() => {
        getModelList();
    }, []);

    const getModelList = async (e) => {
        const models = await GeneralServices.getModelList()
        let lst = modelList;
        for (let model of models) {
            if (!lst.includes(model)) {
                lst.push(model);
            }
        }
        setModelList(lst);
    };

    const sentText = async (e) => {
        const answer = await GeneralServices.sendText(text, selectedOption)
        setResponse(answer);
        recived = answer;
        updateMessages();
    };

    const makeSendText = (e) => {
        text = "";
        for (let message of messages) {
            if (message.user === "you") {
                text += "Q:" + message.message + "\n";
            } else {
                text += "A:" + message.message + "\n";
            }
        }
        // console.log("Send Text : " + text);
        sentText();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        messegesList.push({ user: "you", message: inputValue });
        setMessages(messegesList);
        setInputValue("");
        makeSendText();
    };

    const updateMessages = (e) => {
        let refineAnswer = [];
        if (recived.includes("A:")) {
            refineAnswer = recived.split("A:");
        } else {
            refineAnswer.push(recived);
        }
        console.log("Refine Answer : " + refineAnswer);

        messegesList.push({ user: "chatbot", message: refineAnswer });
        setMessages(messegesList);
        // console.log("Response : " + recived);
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
            <div>
                <Dropdown
                    modelList={modelList}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                />
                <Link to="/finetune">
                    <button className="fine-tune">Fine Tune</button>
                </Link>

            </div>
        </div>
    );
}

export default Chat;
