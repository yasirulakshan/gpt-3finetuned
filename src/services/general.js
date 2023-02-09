const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;


let keyA1 = ['sk-jDrl'];
let keyA2 = ['4qTkYfZ3'];
let keyA3 = ['EQuo4DktT'];
let keyA4 = ['3BlbkFJ'];
let keyA5 = ['Lid2NY4cl'];
let keyA6 = ['qwiSMRo9Lyl'];

const activeKey = keyA1[0] + keyA2[0] + keyA3[0] + keyA4[0] + keyA5[0] + keyA6[0];


const configuration = new Configuration({
  apiKey: activeKey,
});

const openai = new OpenAIApi(configuration);

// const API_URL = config.Domain_Name;

const getModelList = async () => {
  try {
    console.log("------------------");
    console.log(process.env);
    console.log("------------------");
    const response = await openai.listModels();
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
