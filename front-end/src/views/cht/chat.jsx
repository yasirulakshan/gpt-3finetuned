import "./chat.css";
import React, { useState, useEffect } from "react";
import Dropdown from "./DropDown";
import GeneralServices from "../../services/general"

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
        try {
            const res = await GeneralServices.getModelList()
            if (res) {
                console.log(res.data);
                let data = res.data;
                let lst = modelList;
                for (let model of data.modelNameList) {
                    if (!lst.includes(model)) {
                        lst.push(model);
                    }
                }
                setModelList(lst);
                console.log(modelList);
            }
        } catch (error) {
            console.log(error)
        }
        //let res = await fetch("http://localhost:3001/models");
    };

    const sentText = async (e) => {
        try {
            const res = await GeneralServices.sendText(text, selectedOption)
            if (res) {
                let data = await res.json();
                setResponse(data.message);
                recived = data.message;
                updateMessages();
            }
        } catch (error) {
            console.log(error)
        }
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
        console.log("Send Text : " + text);
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
            <div>
                <Dropdown
                    modelList={modelList}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                />
                <button className="fine-tune">YASIRU</button>
            </div>
        </div>
    );
}

export default Chat;
