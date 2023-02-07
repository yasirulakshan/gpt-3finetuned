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
});

app.get("/models", async (req, res) => {
  const response = await openai.listModels();
  let models = [];
  for (let model of response.data.data) {
    if (model.owned_by == "user-amrjmmpu6vbzwbgwsct1txmz") {
      models.push(model.id);
    }
  }
  res.json({ modelNameList: models });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
