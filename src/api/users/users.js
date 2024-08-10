import {
  instanceAxios,
  configHeadersFormDataToken,
  configHeadersToken,
} from "../instanceAxios";

//Connexion de l'utilisateur
export const loginUser = async (userInfo) => {
  try {
    return await instanceAxios.post("users/auth/login", userInfo);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données:",
      error?.message
    );
    throw new Error(error?.response?.data?.message);
  }
};

// Deconnexion de l'utilisateur
export const logoutUser = async () => {
  try {
    return await instanceAxios.post(
      "users/auth/logout",
      {},
      configHeadersToken()
    );
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données:",
      error?.message
    );
    throw new Error(error?.response?.data?.message);
  }
};

// Deconnexion de l'utilisateur
export const SignupUser = async (body) => {
  try {
    const response = await instanceAxios.post("users/auth/signup_test", body);
    console.log("response ::",response)
  } catch (error) {
    console.log("reeri ::", error);
    throw new Error(error?.response?.data?.message || error.message );
  }
};

// recuperation d'un utilisateur
export const getLoginInfos = async (id) => {
  try {
    const response = await instanceAxios.get(
      `detailadimn/`,
      configHeadersToken()
    );
    return response?.data?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// recuperation de la liste des utilisateurs
export const getUtilisateurs = async (page) => {
  try {
    const response = await instanceAxios.get(
      `users/?page=${page}`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// recuperation d'un utilisateur
export const getUtilisateur = async (id) => {
  try {
    const response = await instanceAxios.get(
      `users/${id}/`,
      configHeadersToken()
    );
    return response?.data || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// ajouter un utilisateur
export const addUtilisateur = async (body) => {
  try {
    const response = await instanceAxios.post(
      "users",
      body,
      configHeadersToken()
    );
    return response;
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};
// mettre a jour un utilisateurs
export const updateUtilisateur = async (id, body) => {
  try {
    const response = await instanceAxios.patch(
      `users/${id}/`,
      body,
      configHeadersToken()
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};

// Supprimer un utilisateurs
export const deleteUtilisateur = async (id) => {
  try {
    const response = await instanceAxios.delete(
      `users/${id}/`,
      configHeadersFormDataToken()
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};
