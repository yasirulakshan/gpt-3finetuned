// A express server to handle the requests

const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { sendText } = req.body;
  console.log(req.body);
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
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
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
