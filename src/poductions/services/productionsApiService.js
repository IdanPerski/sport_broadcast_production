import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";

export const getFromDatabase = async (getData, errorCatch) => {
  try {
    const { data } = await getData(); // call
    return data;
  } catch (error) {
    console.log(errorCatch);
    return Promise.reject(error.message);
  }
};
/* -----test-------- */
export const getTest = () => {
  console.log("!!!!getTest!!!!!!!!!");
  return getFromDatabase(
    () => {
      return axios.get(`${apiUrl}/addProduction`);
    }, // wrap axios.get in a function
    "getTest error",
  );
};
export const getFakeData = () => {
  return getFromDatabase(
    () => axios.get(`${apiUrl}/addProduction`),
    "getFakeData error",
  );
};

export const createProduction = (production) => {
  return getFromDatabase(
    () => axios.post(`${apiUrl}/addProduction`, production),
    "set production error",
  );
};
