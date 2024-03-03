import axios from 'axios';

export const getData = async (url, data) => {
  const res = await axios.get(url, data);
  return res;
};

export const patchData = async (url, data) => {
  const res = await axios.put(url, data);
  return res;
};
export const postData = async (url, data) => {
  const res = await axios.post(url, data);
  return res;
};

export const deleteData = async (url) => {
  const res = await axios.delete(url);
  return res;
};
