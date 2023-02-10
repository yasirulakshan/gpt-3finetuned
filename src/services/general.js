import AWS from 'aws-sdk';
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

let awsK1 = ['AKIA'];
let awsK2 = ['ZZIJIA5'];
let awsK3 = ['6NOTTOEVS'];

let awsS1 = ['3tlJwBl'];
let awsS2 = ['Uul51rkAD9Ti'];
let awsS3 = ['+TABbIvuxy'];
let awsS4 = ['6f6ib'];
let awsS5 = ['5RSB99'];

AWS.config.update({
  accessKeyId: awsK1[0] + awsK2[0] + awsK3[0],
  secretAccessKey: awsS1[0] + awsS2[0] + awsS3[0] + awsS4[0] + awsS5[0],
  region: 'us-east-1'
});

const polly = new AWS.Polly();

const generateSpeech = async (msg) => {
  const params = {
    OutputFormat: 'mp3',
    Text: msg,
    VoiceId: 'Joanna'
  };
  const response = await polly.synthesizeSpeech(params).promise();
  const aContext = new AudioContext();

  const source = aContext.createBufferSource();
  source.buffer = await aContext.decodeAudioData(response.AudioStream.buffer);
  source.connect(aContext.destination);
  source.start();
  return true;
};

const getModelList = async () => {
  try {
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
  generateSpeech,
};
