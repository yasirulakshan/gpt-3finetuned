import axois from "axios";
import config from "../config";

const API_URL = config.Domain_Name;

const getModelList = async () => {
  return axois({
    method: "GET",
    url: API_URL + "/models",
  });
};

const sendText = async (text, model) => {
  return axois({
    method: "POST",
    url: API_URL + "/",
    data: {
      sendText: text,
      model: model,
    },
  });
};

export default {
  getModelList,
  sendText,
};
