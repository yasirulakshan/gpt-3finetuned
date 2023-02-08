// A express server to handle the requests

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const fs = require("fs");

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { sendText, model } = req.body;
  console.log(req.body);
  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: sendText,
      temperature: 0.7,
      max_tokens: 20,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data);
    if (response.data.choices) {
      res.json({ message: response.data.choices[0].text });
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/models", async (req, res) => {
  try {
    const response = await openai.listModels();
    let models = [];
    for (let model of response.data.data) {
      if (model.owned_by == "user-amrjmmpu6vbzwbgwsct1txmz") {
        models.push(model.id);
      }
    }
    res.json({ modelNameList: models });
  } catch (err) {
    console.log("Model Getting Error");
    console.log(err);
  }
});

// app.post("/upload", async (req, res) => {
//   const { file } = req.body;
//   try {
//     const response = await openai.createFile(
//       fs.createReadStream(file.)
//     )

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
