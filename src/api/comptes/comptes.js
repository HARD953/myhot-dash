import {  instanceAxios,configHeadersFormDataToken, configHeadersToken } from "../instanceAxios";




// recuperation de la liste des utilisateurs
export const getComptes = async()=>{
    try {
        const response = await instanceAxios.get(
          `users`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// recuperation d'un utilisateur
export const getCompte = async(id)=>{
    try {
        const response = await instanceAxios.get(
          `users/${id}/`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// ajouter un utilisateur
export const addCompte = async(body)=>{
    try {
        const response = await instanceAxios.post("users/", body);
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour un utilisateurs
export const updateCompte = async(id,body)=>{
    try {
        const response = await instanceAxios.put(`users/${id}`, body);
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deleteCompte = async(id)=>{
    try {
        const response = await instanceAxios.delete(
          `users/${id}/`,
          configHeadersFormDataToken()
        );
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// recuperation la liste des utilisateurs par type
export const getListUserByType = async (type) => {
  try {
    if(!!type){
      const response = await instanceAxios.get(
        `users/type/${type}/`,
        configHeadersToken()
      );
      return response?.data || [];

    }else{
      return []
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    throw new Error(error?.response?.data?.message);
  }
};



;
