// A express server to handle the requests
require("dotenv").config();

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

// app.post("/", async (req, res) => {
//   const { sendText, model } = req.body;
//   console.log(req.body);
//   try {
//     const response = await openai.createCompletion({
//       model: model,
//       prompt: sendText,
//       temperature: 0.7,
//       max_tokens: 20,
//       top_p: 1,
//       frequency_penalty: 0,
//       presence_penalty: 0,
//     });
//     console.log(response.data);
//     if (response.data.choices) {
//       res.json({ message: response.data.choices[0].text });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get("/models", async (req, res) => {
//   try {
//     const response = await openai.listModels();
//     let models = [];
//     for (let model of response.data.data) {
//       if (model.owned_by == "user-amrjmmpu6vbzwbgwsct1txmz") {
//         models.push(model.id);
//       }
//     }
//     res.json({ modelNameList: models });
//   } catch (err) {
//     console.log("Model Getting Error");
//     console.log(err);
//   }
// });

app.post("/writeDatatoFile", async (req, res) => {
  const filePath = "trainData.jsonl";
  const { data, baseModel } = req.body;
  fs.writeFile(
    filePath,
    data.map((d) => JSON.stringify(d)).join("\n"),
    function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log(`Data written to ${filePath}`);
      }
    }
  );
  const trainedResponseData = await trainModel(baseModel);
  if (trainedResponseData.status == "pending") {
    res.json({ message: "Model is training" });
  } else {
    res.json({ message: "Error Occured" });
  }
});

const trainModel = async (baseModel) => {
  const response = await openai.createFile(
    fs.createReadStream("trainData.jsonl"),
    "fine-tune"
  );
  const fileId = response.data.id;
  const trainedResponse = await openai.createFineTune({
    training_file: fileId,
    model: baseModel,
  });
  console.log(trainedResponse.data);
  return trainedResponse.data;
};

// app.post("/upload", async (req, res) => {
//   const { file } = req.body;
//   try {
//     const response = await openai.createFile(
//       fs.createReadStream(file.)
//     )

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
