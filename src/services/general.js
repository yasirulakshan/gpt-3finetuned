import config from "../config";
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(configuration);

// const API_URL = config.Domain_Name;

const getModelList = async () => {
  try {
    const response = await openai.listModels();
    console.log(process.env.API_KEY);
    let models = [];
    
    for (let model of response.data.data) {

      if (model.owned_by == "user-amrjmmpu6vbzwbgwsct1txmz") {
        models.push(model.id);
      }
    }
    return models;
  } catch (error) {
    console.log(error);
  }
};

const sendText = async (text, model) => {
  try {
    const response = await openai.createCompletion({
      model: model,
      prompt: text,
      temperature: 0.7,
      max_tokens: 20,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    if (response.data.choices) {
      return response.data.choices[0].text;
    }
  } catch (error) {
    console.log(error);
  }
};

// const getModelList = async () => {
//   return axois({
//     method: "GET",
//     url: API_URL + "/models",
//   });
// };

// const sendText = async (text, model) => {
//   return axois({
//     method: "POST",
//     url: API_URL + "/",
//     data: {
//       sendText: text,
//       model: model,
//     },
//   });
// };

export default {
  getModelList,
  sendText,
};
