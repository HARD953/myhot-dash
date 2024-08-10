import {  instanceAxios,configHeadersFormDataToken, configHeadersToken } from "../instanceAxios";




// recuperation de la liste des utilisateurs
export const getClients = async()=>{
    try {
        const response = await instanceAxios.get(
          `clients`,
          configHeadersToken()
        );
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}

// recuperation d'un utilisateur
export const getClient = async(id)=>{
    try {
        const response = await instanceAxios.get(`clients/${id}/`, configHeadersToken())
        return response?.data || []
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// ajouter un utilisateur
export const addClient = async(body)=>{
    try {
        const response = await instanceAxios.post("clients",body)
        return response
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
}

// mettre a jour un utilisateurs
export const updateClient = async(id,body)=>{
    try {
        const response = await instanceAxios.put(`clients/${id}`,body)
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}


// Supprimer un utilisateurs
export const deleteClient = async(id)=>{
    try {
        const response = await instanceAxios.delete(`clients/${id}/`, configHeadersFormDataToken())
        return response
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        throw new Error(error?.response?.data?.message);
    }
}
