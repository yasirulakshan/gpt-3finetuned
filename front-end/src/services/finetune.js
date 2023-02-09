import axios from "axios";
import config from "../config";
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const configuration = new Configuration({
  apiKey: config.OpenAI_API_Key,
});

const openai = new OpenAIApi(configuration);

const makeQuestion = async (text) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response.data);
    if (response.data.choices) {
      return response.data.choices[0].text;
    }
  } catch (error) {
    console.log(error);
  }
};

const convertToJSONLFormat = (text) => {
  text = text.trim();
  const arr = [];
  const qandacombined = text.split("Q:");
  for (let qanda of qandacombined) {
    if (qanda.length > 0) {
      const qandaarr = qanda.split("A:");
      arr.push({ prompt: qandaarr[0].trim(), completion: qandaarr[1].trim() });
    }
  }
  console.log(arr);
  return arr;
};

const train = async (text, baseModel) => {
  //   const data = [
  //     {
  //       prompt: "trousers and pants are acceptable for work?",
  //       completion:
  //         " Jeans and office pants are acceptable. Track bottoms, shorts, three quarter pants, and form-fitting pants like those for biking are not appropriate for work.",
  //     },
  //     {
  //       prompt: "skirts and dresses are appropriate for work?",
  //       completion:
  //         " Casual dresses and skirts that are split at or below the knee are acceptable. Short, tight skirts that ride halfway up the thigh, mini-skirts, sun dresses, beach dresses, and spaghetti-strap dresses are not appropriate for the office.",
  //     },
  //     {
  //       prompt: "shirts, tops, and blouses are appropriate for work?",
  //       completion:
  //         " Casual shirts, dress shirts, and tops are acceptable attire for work. Inappropriate attire includes tank tops, midriff tops, halter-tops, tops with bare shoulders, and shirts with offensive words, terms, logos, pictures, cartoons or slogans.",
  //     },
  //     {
  //       prompt: "shoes and footwear are appropriate for work?",
  //       completion:
  //         " Conservative athletic or walking shoes, loafers, clogs, sneakers, flats, and dress heels are acceptable for work. Flashy athletic shoes, flip-flops, and slippers are not acceptable.",
  //     },
  //   ];

  const data = convertToJSONLFormat(text);
  return axios({
    method: "POST",
    url: config.Domain_Name + "/writeDatatoFile",
    data: { data: data, baseModel: baseModel },
  });
};

export default { makeQuestion, train };
