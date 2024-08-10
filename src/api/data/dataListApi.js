import { instanceAxios, configHeadersToken } from "../instanceAxios";
const main = "data_lists";
// Pays
export const getPays = async () => {
  try {
    const response = await instanceAxios.get(
      `${main}/pays`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};


//Villes
export const getVilles = async () => {
  try {
    const response = await instanceAxios.get(
      `${main}/villes`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
