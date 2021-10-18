import { API_URL } from "./constants";

export const getData = async (type) => {
  const data = await fetch(`${API_URL}/${type}.json`);

  return data.json();
};
