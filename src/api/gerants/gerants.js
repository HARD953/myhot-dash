import {  instanceAxios,configHeadersFormDataToken, configHeadersToken } from "../instanceAxios";




// recuperation de la liste des utilisateurs
export const getGerants = async()=>{
    try {
        const response = await instanceAxios.get(
          `gerants`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// recuperation d'un utilisateur
export const getGerant = async(id)=>{
    try {
        const response = await instanceAxios.get(`gerants/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// ajouter un utilisateur
export const addGerant = async(body)=>{
    try {
        const response = await instanceAxios.post("gerants",body)
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour un utilisateurs
export const updateGerant = async(id,body)=>{
    try {
        const response = await instanceAxios.put(`gerants/${id}`,body)
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deleteGerant = async(id)=>{
    try {
        const response = await instanceAxios.delete(`gerants/${id}/`, configHeadersFormDataToken())
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}
