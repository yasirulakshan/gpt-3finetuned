import React, { useEffect, useState } from "react";
import "./fineTune.css";
import TextField from '@mui/material/TextField';
import { Container } from "@mui/system";
import { Button } from "@mui/material";
import Dropdown from "../cht/DropDown";
import GeneralServices from "../../services/general"
import finetune from "../../services/finetune";

function FineTune() {
    const [modelList, setModelList] = useState(["davinci"]);
    const [selectedOption, setSelectedOption] = useState("davinci");
    const [isLoaded, setIsLoaded] = useState(false);
    const [inputText, setInputText] = useState("");
    const [qanda, setQanda] = useState("");
    const [isQandAGenerated, setIsQandAGenerated] = useState(true);
    const [isTrained, setIsTrained] = useState(false);

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
        console.log(lst)
        setModelList(lst);
        setIsLoaded(true);
    };

    const makeQandA = async (e) => {
        setIsQandAGenerated(false);
        const sendText = "Can you make question and answer set from belove text in format Q and A?\n\n" + inputText;
        setQanda(sendText);
        const qa = await finetune.makeQuestion(sendText)
        setQanda(qa);
        setIsQandAGenerated(true);
    }

    const train = async (e) => {
        setIsTrained(true);
        const train = await finetune.train(qanda, selectedOption)
        console.log(train)
        if (train.data.message) {
            alert(train.data.message)
        }
        setIsTrained(false);
    }


    return (
        <Container>
            <h1>fine tune</h1>
            <h2>Enter Text</h2>
            <TextField
                id="outlined-multiline-flexible"
                label="Enter Text"
                multiline
                maxRows={8}
                style={{ width: "100%" }}
                onChange={(e) => setInputText(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={makeQandA}
                style={{ marginTop: "10px", width: "100%" }}
                disabled={!isQandAGenerated}
            >
                Make Q and A
            </Button>
            <h2>Q & A</h2>
            <h5>If you want you can refine</h5>
            <TextField
                id="outlined-multiline-flexible"
                label="Enter Text"
                multiline
                maxRows={8}
                style={{ width: "100%" }}
                value={qanda}
                onChange={(e) => setQanda(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={train}
                style={{ marginTop: "10px", width: "100%" }}
                disabled={isTrained}>
                Submit
            </Button>
            {isLoaded && <Dropdown
                modelList={modelList}
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
            />}

        </Container>
    )
}

export default FineTune